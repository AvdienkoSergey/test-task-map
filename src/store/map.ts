interface IPlacemark {
  id: number;
  latitude: number;
  longitude: number;
}

interface IMapState {
  map: {
    instance: ymaps.Map | null;
    placemarkers: IPlacemark[];
    mode: boolean;
  };
}

import {
  createPlacemark,
  addToMap,
  moveToCoordinates,
} from "@/services/yandex-map-api";

// {
//   id: 0,
//   latitude: 25.121212,
//   longitude: 25.54248,
// },

// addListenerForMap(
//   { commit }: { commit: (name: string) => void },
//   coordinates: number[]
// ) {
//   return new Promise((resolve, reject) => {
//     const [latitude, longitude] = coordinates;
//     if (![latitude, longitude].every((l: number) => l > 0)) {
//       reject(false);
//     }
//     setTimeout(() => {
//       commit("addListenerForMap");
//       resolve(true);
//     }, 1000);
//   });
// },
// addListenerForMap(state: IMapState, placemark: IPlacemark) {
//   state.map.placemarkers.push();
// },

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
      mode: false,
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
      state.map.mode = true;
    },
    removeListenerForMap(state: IMapState) {
      state.map.mode = false;
    },
    showOnMap(state: IMapState, placemark: IPlacemark) {
      if (!state.map.instance) return;
      const map = state.map.instance;
      moveToCoordinates(map, [placemark.latitude, placemark.longitude]).then(
        () => addToMap(map, createPlacemark(placemark))
      );
    },
  },
  actions: {
    addListenerForMap({ commit }: { commit: (name: string) => void }) {
      return Promise.resolve(commit("addListenerForMap"));
    },
    removeEventListener({ commit }: { commit: (name: string) => void }) {
      return Promise.resolve(commit("removeListenerForMap"));
    },
  },
};
