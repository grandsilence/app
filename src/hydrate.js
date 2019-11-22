import axios from "axios";
import store from "./store/";
import { loadLanguageAsync } from "./lang/";
import { STORE_HYDRATED, HYDRATING_FAILED } from "./store/mutation-types";
import startIdleTracking from "./idle";
import { version } from "../package.json";

export default function hydrateStore() {
  return (
    Promise.all([
      store.dispatch("getProjects"),
      store.dispatch("getCurrentUser"),
      store.dispatch("getCollections"),
      store.dispatch("getSettings"),
      store.dispatch("getAllExtensions"),
      store.dispatch("getBookmarks"),
      store.dispatch("getUsers"),
      store.dispatch("getRelations"),
      store.dispatch("getServerInfo")
    ])
      // Getting permissions relies on the current user and collection info
      // that's why it's being called after the others are done
      .then(() => store.dispatch("getPermissions"))
      .then(() => {
        const defaultLocale = store.getters.currentProject?.data?.default_locale;
        const userLocale = store.state.currentUser.locale;

        if (userLocale) {
          loadLanguageAsync(userLocale);
        } else {
          loadLanguageAsync(defaultLocale);
        }
      })
      .then(() => {
        startIdleTracking(store);
      })
      .then(() => {
        const isAdmin = store.state.currentUser.admin;
        const telemetryAllowed = store.getters.currentProject?.data?.telemetry !== false;

        if (telemetryAllowed && isAdmin && navigator.onLine) {
          axios
            .post("https://telemetry.directus.io/count", {
              type: "app",
              url: window.location.origin,
              version
            })
            .catch(() => {});
        }
      })
      .then(() => {
        store.commit(STORE_HYDRATED, new Date());
      })
      .catch(error => {
        store.commit(HYDRATING_FAILED, error);
        console.error(error); // eslint-disable-line no-console
      })
  );
}
