import { v4 as uuid } from "uuid";
import moment from "moment";

export function filterData(
  data,
  filter,
  searchFields = ["equipment_name", "code"]
) {
  if (typeof filter === "string") {
    // Si filter es una cadena de texto, realizar la búsqueda por esa cadena
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
    const filterData = data.filter((item) => {
      const indexOfUnassigned = filter.indexOf("unassigned_equipment");
      const indexOfAssigned = filter.indexOf("assigned_equipment");
      let apply = true;

      if (indexOfUnassigned !== -1 && indexOfAssigned !== -1) {
        if (indexOfUnassigned < indexOfAssigned) {
          apply = !item.customer_name;
        } else {
          apply = item.customer_name;
        }
      } else if (indexOfUnassigned !== -1) {
        apply = !item.customer_name;
      } else if (indexOfAssigned !== -1) {
        apply = item.customer_name;
      }

      if (filter.includes("unassigned_equipment") && filter.length === 1) {
        return !item.customer_name;
      } else if (filter.includes("assigned_equipment") && filter.length === 1) {
        return item.customer_name;
      } else {
        return apply && filter.includes(item.equipment_type.toLowerCase());
      }
    });
    return filterData;
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

export function calculateRemainingDays(arrivalDate) {
  const parsedEntryDate = new Date();
  const parsedArrivalDate = parseUserDate(arrivalDate);
  const timeDiff = parsedArrivalDate - parsedEntryDate;
  const remainingDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return String(remainingDays > 0 ? remainingDays : 0);
}

export function dateToString(date) {
  return date.toLocaleDateString("es-VE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
