import * as actions from "./actions";
import mutations from "./mutations";

export const initialState = {};

export default {
  actions,
  mutations,
  state: _.clone(initialState)
};
