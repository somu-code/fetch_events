export function convertToUTC(dateTime, offSet) {
  let [date, time] = dateTime.split(", ");
  if (!date.endsWith("2024")) {
    date = date + " 2024";
  }
  let newDateTime = date + " " + time;
  const localDate = new Date(newDateTime);
  const utcTime = new Date(localDate.getTime() - offSet);
  return utcTime;
}
