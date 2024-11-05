const fetchedDataArray = [];
let bool = true;
async function fetchEvents(url, utcDateString) {
  const date = new Date(utcDateString);
  const formattedDateTime = date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const dateTimeArray = formattedDateTime.split(", ");

  const urlArray = url.split("pageIndex=");
  let pageIndexValue = Number(urlArray[1].split("")[0]);
  while (bool) {
    try {
      const urlInSideLoop = url.split("pageIndex=");
      const secondPart = urlInSideLoop[1].split("");
      const one = secondPart.slice(1);
      const two = one.join("");
      const newUrlArray = [urlArray[0], `pageIndex=${pageIndexValue}`, two];
      let newUrl = newUrlArray.join("");
      const response = await fetch(newUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      if (!jsonData.items || jsonData.items.length == 0) {
        bool = false;
        break;
      }
      jsonData.items.map((item) => fetchedDataArray.push(item));
      pageIndexValue++;
    } catch (error) {
      console.error("Fetch error", error);
      bool = false;
    }
  }

  console.log(fetchedDataArray.length);

  fetchedDataArray.forEach((item) => {
    if (item.formattedDate === dateTimeArray[0]) {
      if (item.formattedTime === dateTimeArray[1]) {
        console.log(item);
      }
    }
  });
}

const utcDate = "2024-11-11T14:00:00.000Z";

// fetchEvents(
//   "https://www.viagogo.com/Concert-Tickets/Rap-and-Hip-Hop-Music/Don-Toliver-Tickets?gridFilterType=0&homeAwayFilterType=0&sortBy=0&nearbyGridRadius=50&venueIdFilterType=0&eventViewType=0&opponentCategoryId=0&pageIndex=0&method=GetFilteredEvents&categoryId=272755&searchGuid=null&radiusFrom=80467&radiusTo=null&from=1970-01-01T00%3A00%3A00.000Z&to=9999-12-31T23%3A59%3A59.999Z&lat=22.57&lon=88.37&genreId=undefined&eventCountryType=0&fromPrice=undefined&toPrice=undefined",
//   utcDate
// );
fetchEvents(
  "https://www.viagogo.com/Concert-Tickets/International-Traditions/Diljit-Dosanjh-Tickets?gridFilterType=0&homeAwayFilterType=0&sortBy=0&nearbyGridRadius=50&venueIdFilterType=0&eventViewType=0&opponentCategoryId=0&pageIndex=0&method=GetFilteredEvents&categoryId=31617&searchGuid=null&radiusFrom=80467&radiusTo=null&from=1970-01-01T00%3A00%3A00.000Z&to=9999-12-31T23%3A59%3A59.999Z&lat=22.57&lon=88.37&genreId=undefined&eventCountryType=0&fromPrice=undefined&toPrice=undefined",
  "2024-11-17T13:30:00.000Z"
);
