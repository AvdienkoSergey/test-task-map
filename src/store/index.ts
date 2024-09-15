import { createStore } from "vuex";
import { mapModule } from "@/store/map";
import { notificationModule } from "@/store/notificaton";

export default createStore({
  state: {
    loading: false,
    downloaded: false,
    edit: false,
  },
  getters: {
    isLoading(state) {
      return state.loading;
    },
    isEditMode(state) {
      return state.edit;
    },
    isDownloaded(state) {
      return state.downloaded;
    },
  },
  mutations: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    startEdit(state) {
      state.edit = true;
    },
    stopEdit(state) {
      state.edit = false;
    },
    stopDownload(state) {
      state.downloaded = true;
    },
  },
  actions: {},
  modules: {
    map: { ...mapModule },
    notification: { ...notificationModule },
  },
});
