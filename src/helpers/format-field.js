import Vue from "../main";

export default function formatField(field, collection) {
  const fieldIsObject = typeof field === "object";
  const fieldIsString = typeof field === "string";
  if (
    (!fieldIsObject && !fieldIsString) ||
    (fieldIsObject && (typeof field.field !== "string" || !field.field.length)) ||
    (fieldIsString && !field.length)
  ) {
    console.error(`fieldLocalize: Invalid value of field: ${JSON.stringify(field)}`);
    return "???";
  }

  const fieldName = fieldIsObject ? field.field : field;
  const fallback = Vue.$helpers.formatTitle(fieldName);

  if (!Vue.$te || !Vue.$t) {
    console.error("Vue translation plugin is undefined");
    return fallback;
  }

  // Collection field specific translation
  const collectionName =
    typeof field.collection === "string" && field.collection.length && !collection
      ? field.collection
      : collection;

  if (collectionName) {
    const collectionField = `fields-${collectionName}-${fieldName}`;
    if (Vue.$te(collectionField)) {
      return Vue.$t(collectionField);
    }
  }

  // Global field name (all collections)
  const globalField = `fields-${fieldName}`;
  if (Vue.$te(globalField)) {
    return Vue.$t(globalField);
  }

  return fallback;
}
