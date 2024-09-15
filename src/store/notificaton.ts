import { ActionContext } from "vuex";

interface INotificationModuleState {
  snackbar: {
    visible: boolean;
    message: string;
    color: string;
  };
}

export const notificationModule = {
  state: () => ({
    snackbar: {
      visible: false,
      message: "",
      color: "",
    },
  }),
  getters: {
    snackbar: (state: INotificationModuleState) => {
      return state.snackbar;
    },
  },
  mutations: {
    showSnackbar(
      state: INotificationModuleState,
      { message, color }: { message: string; color: string }
    ) {
      state.snackbar = {
        visible: true,
        message,
        color,
      };
    },
    hideSnackbar(state: INotificationModuleState) {
      state.snackbar.visible = false;
    },
  },
  actions: {
    displaySuccess(
      { commit }: ActionContext<INotificationModuleState, unknown>,
      message: string
    ) {
      commit("showSnackbar", { message, color: "green-accent-1" });
    },
    displayError(
      { commit }: ActionContext<INotificationModuleState, unknown>,
      message: string
    ) {
      commit("showSnackbar", { message, color: "deep-orange-accent-1" });
    },
  },
};
