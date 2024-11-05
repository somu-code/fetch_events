function toIsoFormat(dateString) {
  let date = new Date(dateString);
  let isoDate = date.toISOString();
  return isoDate;
}

const func = toIsoFormat("17 Nov 2024 19:00");
console.log(func);
