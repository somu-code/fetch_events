export function convertToUTC(dateTime) {
  let [date, time] = dateTime.split(", ");
  if (!date.endsWith("2024")) {
    date = date + " 2024";
  }
  let newDateTime = date + " " + time;
  const localDate = new Date(newDateTime);
  return new Date(localDate.toUTCString());
}

// console.log(convertToUTC("Nov 11, 7:30 PM"));
