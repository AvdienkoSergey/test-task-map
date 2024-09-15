import { getPLacemarkersList, savePlaceMark } from "@/services/backend-api";
import {
  createPlacemark,
  addToMap,
  moveToCoordinates,
  addClickListener,
  removeClickListener,
  calibrateMap,
} from "@/services/yandex-map-api";
import { ActionContext } from "vuex";
import { clickMap$ } from "@/events/map";
import { Observer } from "@/events/_observer";

interface IPlacemark {
  id: number;
  latitude: number;
  longitude: number;
}

interface IMapState {
  map: {
    instance: ymaps.Map | null;
    placemarkers: IPlacemark[];
  };
}

export const mapModule = {
  state: () => ({
    map: {
      instance: null,
      placemarkers: [
        {
          id: 0,
          latitude: 43.226259,
          longitude: 76.901672,
        },
      ],
    },
  }),
  getters: {
    mapInstance(state: IMapState) {
      return state.map.instance;
    },
    placemarkers(state: IMapState) {
      return state.map.placemarkers;
    },
  },
  mutations: {
    createMapInstance(state: IMapState, instance: ymaps.Map) {
      state.map.instance = instance;
    },
    addListenerForMap(state: IMapState) {
      if (!state.map.instance) return;
      const map = state.map.instance;
      addClickListener(map);
    },
    removeListenerForMap(state: IMapState) {
      if (!state.map.instance) return;
      const map = state.map.instance;
      removeClickListener(map);
    },
    drawPlacemark(state: IMapState, placemark: IPlacemark) {
      if (!state.map.instance) return;
      const map = state.map.instance;
      moveToCoordinates(map, [placemark.latitude, placemark.longitude]).then(
        () => addToMap(map, createPlacemark(placemark))
      );
    },
    addPlacemark(state: IMapState, placemark: IPlacemark) {
      if (
        state.map.placemarkers.find((_placemark: IPlacemark) => {
          placemark.latitude === _placemark.latitude &&
            placemark.longitude === _placemark.longitude;
        })
      ) {
        return;
      }
      state.map.placemarkers.push(placemark);
    },
    calibrateMap(state: IMapState, placemark: IPlacemark) {
      if (!state.map.instance) return;
      const map = state.map.instance;
      calibrateMap(map, placemark);
    },
  },
  actions: {
    addListener({ commit, dispatch }: ActionContext<IMapState, unknown>) {
      commit("startEdit");
      commit("addListenerForMap");
      dispatch("displaySuccess", "$vuetify.notification.addListener");
      function addPlacemark(placemark: IPlacemark | unknown) {
        if (!placemark) {
          return dispatch(
            "displayError",
            "$vuetify.notification.errorAddPlacemarker"
          );
        }
        dispatch("savePlaceMark", placemark);
      }
      clickMap$.subscribe(new Observer(addPlacemark));
    },
    removeListener({ commit }: ActionContext<IMapState, unknown>) {
      commit("stopEdit");
      commit("removeListenerForMap");
    },
    downloadPlaceMarkers({ commit }: ActionContext<IMapState, unknown>) {
      commit("startLoading");
      getPLacemarkersList()
        .then((placemarkers: IPlacemark[]) => {
          placemarkers.forEach((placemark: IPlacemark) => {
            commit("addPlacemark", placemark);
            commit("drawPlacemark", placemark);
          });
          return;
        })
        .finally(() => {
          commit("stopLoading");
          commit("stopDownload");
        });
    },
    savePlaceMark(
      { commit }: ActionContext<IMapState, unknown>,
      placemark: IPlacemark
    ) {
      commit("startLoading");
      savePlaceMark(placemark)
        .then(() => {
          commit("addPlacemark", placemark);
          commit("drawPlacemark", placemark);
        })
        .finally(() => commit("stopLoading"));
    },
    showPlacemarker(
      { commit }: ActionContext<IMapState, unknown>,
      placemark: IPlacemark
    ) {
      commit("calibrateMap", placemark);
    },
  },
};
