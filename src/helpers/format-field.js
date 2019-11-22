import Vue from "../main";

export default function formatField(field, collection) {
  const fallback = Vue.$helpers.formatTitle(field);

  if (!field || typeof field !== "string") {
    console.warn("[formatField]: Expected field to be a string");
    return fallback;
  }

  if (!collection || typeof collection !== "string") {
    console.warn("[formatField]: Expected field to be a string");
    return fallback;
  }

  const i18nKey = `fields-${collection}-${field}`;

  if (Vue.$te(i18nKey)) {
    return Vue.$t(i18nKey);
  }

  return fallback;
}
