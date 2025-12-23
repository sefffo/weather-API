let allLocations = [];
let searchInput = document.getElementById("search");

async function getLocation(location) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=5ecdc9621d124315ae0170629241712&q=${location}&days=3`
    );
    let mydata = await response.json();
    allLocations = mydata;
    display();
  } catch (error) {
    console.error('Error:', error);
  }
}

getLocation("Cairo");

function search() {
  if (searchInput.value.trim()) {
    getLocation(searchInput.value);
  }
}

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

  let content = `
    <div class="col-md-6 col-lg-4">
      <div class="card shadow-lg h-100">
        <div class="card-header-modern d-flex justify-content-between">
          <span>${CurrentDate.toLocaleString('default', {weekday:'long'})}</span>
          <span>${CurrentDate.getDate()} ${CurrentDate.toLocaleString('default', {month:'long'})}</span>
        </div>
        <div class="card-body text-center">
          <h5 class="fw-bold mb-3">${locationName}</h5>
          <div class="temp-value mb-2">${currentTemp}°C</div>
          <img src="https:${currentCondtionIcon}" alt="${currentCondtionText}" class="weather-icon-large mb-3">
          <p class="text-primary fw-bold">${currentCondtionText}</p>
          <hr>
          <div class="d-flex justify-content-around mt-3">
            <div>
              <i class="fa-solid fa-droplet text-primary"></i>
              <small class="d-block">${humidity}%</small>
            </div>
            <div>
              <i class="fa-solid fa-wind text-primary"></i>
              <small class="d-block">${windSpeed} km/h</small>
            </div>
            <div>
              <i class="fa-solid fa-compass text-primary"></i>
              <small class="d-block">${windDirection}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  allLocations.forecast.forecastday.forEach((day, index) => {
    if (index > 0) {
      const dayName = new Date(day.date).toLocaleString('default', {weekday: 'long'});
      const headerClass = index === 1 ? 'alt-bg' : '';
      
      content += `
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-lg h-100">
            <div class="card-header-modern ${headerClass} text-center">
              <span>${dayName}</span>
            </div>
            <div class="card-body text-center">
              <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" class="weather-icon-medium mb-3">
              <h4 class="fw-bold">${day.day.maxtemp_c}°C</h4>
              <p class="text-muted">${day.day.mintemp_c}°C</p>
              <p class="text-primary fw-bold">${day.day.condition.text}</p>
            </div>
          </div>
        </div>
      `;
    }
  });

  document.getElementById('card-content').innerHTML = content;
}