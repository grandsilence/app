import mutations from "./mutations";
import * as actions from "./actions";

export const initialState = {
  values: {},
  primaryKeys: {}
};

export default {
  actions,
  mutations,
  state: _.clone(initialState)
};
