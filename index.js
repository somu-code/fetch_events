export async function fetchEvents(url, utcDateString) {
  const fetchedDataArray = [];
  const finalArray = [];
  const date = new Date(utcDateString);
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
  });
  const formattedTime = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  let pageIndexValue = new URL(url).searchParams.get("pageIndex") || 1;

  while (true) {
    try {
      const currentUrl = new URL(url);
      currentUrl.searchParams.set("pageIndex", pageIndexValue);

      const response = await fetch(currentUrl.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      if (!jsonData.items || jsonData.items.length === 0) break;

      jsonData.items.forEach((item) => fetchedDataArray.push(item));
      pageIndexValue++;
    } catch (error) {
      console.error("Fetch error", error);
      break;
    }
  }

  fetchedDataArray.forEach((item) => {
    if (item.formattedDate === formattedDate && item.formattedTime === formattedTime) {
      finalArray.push(item);
    }
  });

  return finalArray;
}

// fetchEvents(
//   "https://www.viagogo.com/Concert-Tickets/International-Traditions/Diljit-Dosanjh-Tickets?gridFilterType=0&homeAwayFilterType=0&sortBy=0&nearbyGridRadius=50&venueIdFilterType=0&eventViewType=0&opponentCategoryId=0&pageIndex=0&method=GetFilteredEvents&categoryId=31617&searchGuid=null&radiusFrom=80467&radiusTo=null&from=1970-01-01T00%3A00%3A00.000Z&to=9999-12-31T23%3A59%3A59.999Z&lat=22.57&lon=88.37&genreId=undefined&eventCountryType=0&fromPrice=undefined&toPrice=undefined",
//   "2024-11-17T13:30:00.000Z"
// );
