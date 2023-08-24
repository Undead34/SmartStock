import { v4 as uuid } from "uuid"
import moment from "moment"

export function filterData(data, filter, searchFields = ["equipment_name", "code"]) {
  if (Array.isArray(filter)) {
    return data.filter((item) => filter.includes(item.equipment_type.toLowerCase()));
  } else if (typeof filter === "string") {
    const results = [];
    const searchTerm = filter.toLowerCase();

    for (const item of data) {
      for (const field of searchFields) {
        const fieldValue = item[field].toLowerCase();
        if (fieldValue.includes(searchTerm)) {
          results.push(item);
          break;
        }
      }
    }

    return results;
  } else {
    return [];
  }
}

export function generateProductCode() {
  return uuid().split("-").join("").slice(0, 8).toUpperCase();
}

export function parseUserDate(input) {
  const formats = ["DD-MM-YYYY", "DD/MM/YYYY", "YYYY-MM-DD"];
  let parsedDate = null;

  for (const format of formats) {
    const date = moment(input, format, true);
    if (date.isValid()) {
      parsedDate = date.toDate();
      break;
    }
  }

  return parsedDate;
}
