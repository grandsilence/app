import {
  SET_COLLECTIONS,
  ADD_COLLECTION,
  DELETE_COLLECTION,
  UPDATE_COLLECTION,
  ADD_FIELD,
  UPDATE_FIELD,
  UPDATE_FIELDS,
  REMOVE_FIELD
} from "../../mutation-types";
import { i18n } from "../../../lang/";
import _ from "lodash";
import api from "../../../api";

export function addField({ commit }, { collection, field }) {
  commit(ADD_FIELD, { collection, field });
}

export function updateField({ commit }, { collection, field }) {
  commit(UPDATE_FIELD, { collection, field });
}

export function updateFields({ commit }, { collection, updates }) {
  commit(UPDATE_FIELDS, { collection, updates });
}

export function removeField({ commit }, { collection, field }) {
  commit(REMOVE_FIELD, { collection, field });
}

export async function getCollections({ commit }) {
  let { data: collections } = await api.getCollections();

  // Add the custom translations for user collections and fields to the i18n messages pool
  _.forEach(collections, collection => {
    if (_.isEmpty(collection.translation) === false) {
      _.forEach(collection.translation, (value, locale) => {
        i18n.mergeLocaleMessage(locale, {
          [`collections-${collection.collection}`]: value
        });
      });
    }

    _.forEach(collection.fields, (fieldInfo, fieldKey) => {
      if (_.isEmpty(fieldInfo.translation) === false) {
        _.forEach(fieldInfo.translation, (translation, locale) => {
          i18n.mergeLocaleMessage(locale, {
            [`fields-${collection.collection}-${fieldKey}`]: translation
          });
        });
      }
    });
  });

  /*
   * directus_settings uses a different format for the values. Instead of
   * field = column, here field = row. This is done to prevent having to create
   * new columns for each new setting that's saved (there's only 1 row).
   *
   * /collections returns the actual database fields for directus_settings.
   * In order for the app to use the correct fields for the settings, we have to
   * fetch the "fields" separate from a dedicated endpoint and augment the collections
   * value with this.
   */

  const { data: settingsFields } = await api.getSettingsFields();

  collections = _.keyBy(collections, "collection");

  collections.directus_settings.fields = _.keyBy(settingsFields, "field");

  commit(SET_COLLECTIONS, collections);
}

export function addCollection({ commit }, collection) {
  if (_.isEmpty(collection.translation) === false) {
    _.forEach(collection.translation, (value, locale) => {
      i18n.mergeLocaleMessage(locale, {
        [`collections-${collection.collection}`]: value
      });
    });
  }

  _.forEach(collection.fields, (fieldInfo, fieldKey) => {
    if (_.isEmpty(fieldInfo.translation) === false) {
      _.forEach(fieldInfo.translation, (translation, locale) => {
        i18n.mergeLocaleMessage(locale, {
          [`fields-${collection.collection}-${fieldKey}`]: translation
        });
      });
    }
  });

  commit(ADD_COLLECTION, collection);
}

export function removeCollection({ commit }, collection) {
  commit(DELETE_COLLECTION, collection);
}

export function updateCollection({ commit }, { collection, edits }) {
  commit(UPDATE_COLLECTION, { collection, edits });
}
