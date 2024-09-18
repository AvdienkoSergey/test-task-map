import { getPLacemarkersList, savePlaceMark } from "@/services/backend-api";
import { ActionContext } from "vuex";
import { WorldMap } from "@/entities/Map";

interface IPlacemark {
  id: number;
  latitude: number;
  longitude: number;
}

interface IMapState {
  placemarkers: IPlacemark[];
  currentPlacemark: IPlacemark | null;
}

interface YandexMapClickEvent {
  get: (key: string) => [number, number] | undefined;
}

interface LeafletClickEvent {
  latlng: {
    lat: number;
    lng: number;
  };
}

export const mapModule = {
  state: () => ({
    placemarkers: [],
    currentPlacemark: null,
  }),
  getters: {
    placemarkers(state: IMapState) {
      return state.placemarkers;
    },
    currentPlacemark(state: IMapState) {
      return state.currentPlacemark;
    },
  },
  mutations: {
    addPlacemark(state: IMapState, placemark: IPlacemark) {
      if (
        state.placemarkers.find((_placemark: IPlacemark) => {
          placemark.latitude === _placemark.latitude &&
            placemark.longitude === _placemark.longitude;
        })
      ) {
        return;
      }
      state.placemarkers.push(placemark);
    },
    clearPlacemarkersList(state: IMapState) {
      state.placemarkers = [];
    },
    setCurrentPlacemark(state: IMapState, placemark: IPlacemark) {
      state.currentPlacemark = placemark;
    },
    findAndSetCurrentPlacemarker(state: IMapState, id: number) {
      const placemark = state.placemarkers.find((p: IPlacemark) => p.id === id);
      placemark
        ? (state.currentPlacemark = placemark)
        : (state.currentPlacemark = null);
    },
  },
  actions: {
    turnOnTheOperatingMode({
      dispatch,
      commit,
    }: ActionContext<IMapState, unknown>) {
      commit("startEdit");
      function onMapClick(event: YandexMapClickEvent | LeafletClickEvent) {
        try {
          let latitude: number;
          let longitude: number;
          if ("get" in event) {
            const coordinates = event.get("coords");
            if (!coordinates) throw new Error("Not gound coordinates");
            latitude = coordinates[0];
            longitude = coordinates[1];
          } else {
            latitude = event.latlng.lat;
            longitude = event.latlng.lng;
          }
          dispatch("savePlaceMark", {
            id: Date.now(),
            latitude,
            longitude,
          });
        } catch (error) {
          dispatch("displayError", "$vuetify.notification.errorAddPlacemarker");
        }
      }
      WorldMap.createTrackingEvent(onMapClick);
      WorldMap.enableEventTracking();
    },
    turnOnTheViewingMode({ commit }: ActionContext<IMapState, unknown>) {
      commit("stopEdit");
      WorldMap.disableEventTracking();
    },
    downloadPlaceMarkers({ commit }: ActionContext<IMapState, unknown>) {
      commit("startLoading");
      getPLacemarkersList()
        .then((placemarkers: IPlacemark[]) => {
          commit("clearPlacemarkersList");
          placemarkers.forEach((placemark: IPlacemark) => {
            commit("addPlacemark", placemark);
            WorldMap.putOneObject(placemark);
          });
          return;
        })
        .finally(() => {
          commit("stopLoading");
          commit("stopDownload");
        });
    },
    savePlaceMark(
      { dispatch, commit }: ActionContext<IMapState, unknown>,
      placemark: IPlacemark
    ) {
      commit("startLoading");
      commit("addPlacemark", placemark);
      WorldMap.putOneObject(placemark);
      savePlaceMark(placemark)
        .catch(() =>
          dispatch("displayError", "$vuetify.notification.errorAddPlacemarker")
        )
        .finally(() => commit("stopLoading"));
    },
    showPlacemarker(
      { commit }: ActionContext<IMapState, unknown>,
      placemark: IPlacemark
    ) {
      commit("startLoading");
      commit("setCurrentPlacemark", placemark);
      const { latitude, longitude } = placemark;
      WorldMap.moveAroundTheMap([latitude, longitude]).finally(() =>
        commit("stopLoading")
      );
      return placemark;
    },
    restoreHistoryActions(
      { state, commit }: ActionContext<IMapState, unknown>,
      id: string
    ) {
      Promise.resolve(commit("findAndSetCurrentPlacemarker", Number(id)))
        .then(() => commit("startLoading"))
        .then(() => {
          if (state.currentPlacemark) {
            const { latitude, longitude } = state.currentPlacemark;
            WorldMap.moveAroundTheMap([latitude, longitude]);
          }
        })
        .finally(() => commit("stopLoading"));
    },
  },
};
