//https://api.weatherapi.com/v1/current.json?key=5ecdc9621d124315ae0170629241712&q=cairo
//https://api.weatherapi.com/v1/forecast.json?key=5ecdc9621d124315ae0170629241712&q=cairo&days=3

let allLocations = [];
let searchInput = document.getElementById("search");
let seachButton = document.getElementById("Find");

async function getLocation(location) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=5ecdc9621d124315ae0170629241712&q=${location}&days=3`
    );
    let mydata = await response.json();
    allLocations = mydata;
    display();
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

getLocation("Cairo");

function search() {
  if (searchInput.value.trim()) {
    getLocation(searchInput.value);
  }
}

// Allow search on Enter key
searchInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    search();
  }
});

function display() {
  let CurrentDate = new Date();
  let locationName = allLocations.location.name;
  let currentTemp = allLocations.current.temp_c;
  let currentCondtionText = allLocations.current.condition.text;
  let currentCondtionIcon = allLocations.current.condition.icon;
  let humidity = allLocations.current.humidity;
  let windSpeed = allLocations.current.wind_kph;
  let windDirection = allLocations.current.wind_dir;

  let content = "";
  content += `
    <div class="weather-card main-card">
      <div class="card-header-modern">
        <span class="day-name">${CurrentDate.toLocaleString('default', {weekday:'long'})}</span>
        <span class="date-info">${CurrentDate.getDate()} ${CurrentDate.toLocaleString('default', {month:'long'})}</span>
      </div>
      <div class="card-body-modern">
        <h5 class="location-name">${locationName}</h5>
        <div class="temp-display">
          <span class="temp-value">${currentTemp}</span>
          <span class="temp-unit">°C</span>
        </div>
        <div class="weather-icon-section">
          <img src="https:${currentCondtionIcon}" alt="${currentCondtionText}" class="weather-icon-large">
          <span class="condition-text">${currentCondtionText}</span>
        </div>
        <div class="weather-details">
          <div class="detail-item">
            <i class="fa-solid fa-droplet"></i>
            <span>${humidity}%</span>
          </div>
          <div class="detail-item">
            <i class="fa-solid fa-wind"></i>
            <span>${windSpeed} km/h</span>
          </div>
          <div class="detail-item">
            <i class="fa-solid fa-compass"></i>
            <span>${windDirection}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  allLocations.forecast.forecastday.forEach((day, index) => {
    if (index > 0) {
      const dayName = new Date(day.date).toLocaleString('default', {weekday: 'long'});
      const cardClass = index === 1 ? 'secondary-card' : 'tertiary-card';
      
      content += `
        <div class="weather-card ${cardClass}">
          <div class="card-header-modern ${index === 1 ? 'alt-bg' : ''}">
            <span class="day-name">${dayName}</span>
          </div>
          <div class="card-body-modern centered">
            <div class="weather-icon-section">
              <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" class="weather-icon-medium">
            </div>
            <div class="temp-display-small">
              <span class="temp-max">${day.day.maxtemp_c}°C</span>
              <span class="temp-min">${day.day.mintemp_c}°C</span>
            </div>
            <div class="condition-text-small">${day.day.condition.text}</div>
          </div>
        </div>
      `;
    }
  });

  document.getElementById('card-content').innerHTML = content;
}