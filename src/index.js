async function getTemperature(cityName) {
  try {
    const loader = createLoader();
    document.body.appendChild(loader);
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=6f575ea2e74047a88c924220231604&q=${cityName}`,
      { mode: "cors" }
    );
    const place = await response.json();
    const data = {
      name: place.location.name,
      temp: place.current["temp_c"],
      airCondition: place.current.condition.text,
      feelslike: place.current["feelslike_c"],
      wind: place.current["wind_kph"],
      humidity: place.current.humidity,
    };
    return data;
  } catch (err) {
    console.log(err);
    const loaderElement = document.querySelector(".spinner");
    document.body.removeChild(loaderElement);
  }
}

function dom(data) {
  document.getElementById("state").innerHTML = data.airCondition;
  document.getElementById("place").innerHTML =  data.name;
  document.getElementById("temperature").innerHTML =  data.temp;
  document.getElementById("feel").innerHTML = data.feelslike;
  document.getElementById("wind").innerHTML =  data.wind;
  document.getElementById("humidity").innerHTML =  data.humidity;
  const loaderElement = document.querySelector(".spinner");
  document.body.removeChild(loaderElement);
}

function createLoader() {
  const loader = document.createElement("div");
  loader.classList.add("spinner");
  loader.innerHTML = `<div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>`;
  return loader;
}

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const cityName = document.getElementById("search-input").value;
  const currentData = await getTemperature(cityName);
  dom(currentData);
  document.getElementById("search-input").value = "";
});


