import * as actions from "./actions";
import * as getters from "./getters";
import mutations from "./mutations";

export const initialState = [];

export default {
  actions,
  mutations,
  getters,
  state: _.clone(initialState)
};
