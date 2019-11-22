import * as actions from "./actions";
import mutations from "./mutations";

export const initialState = {
  layouts: {},
  interfaces: {},
  pages: {}
};

export default {
  state: _.clone(initialState),
  actions,
  mutations
};
