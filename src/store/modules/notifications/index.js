import mutations from "./mutations";

export const initialState = {
  queue: []
};

export default {
  state: _.clone(initialState),
  mutations
};
