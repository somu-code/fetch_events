export async function fetchEvents(url, dateString) {
  const fetchedDataArray = [];
  const finalArray = [];

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
    fetchedDataArray.forEach(item => {
      if (item.formattedDate === dateString) {
        finalArray.push(item);
      }
    })
  }

  return finalArray;
}
