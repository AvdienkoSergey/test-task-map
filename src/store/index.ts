import { createStore } from "vuex";
import { mapModule } from "@/store/map";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    map: { ...mapModule },
  },
});
