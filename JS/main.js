// ========================================
// WEATHER API APPLICATION - MAIN JAVASCRIPT FILE
// ========================================
// This file handles fetching weather data from WeatherAPI.com
// and displaying it dynamically on the webpage

// ========================================
// GLOBAL VARIABLES
// ========================================
// These variables store data that multiple functions need to access

let allLocations = [];  // Stores the weather data from the API
let searchInput = document.getElementById("search");  // Gets the search input field from HTML

// ========================================
// ASYNC FUNCTION: getLocation()
// ========================================
// This function fetches weather data from the API
// 'async' means it can wait for data without freezing the page
// Parameters:
//   - location: city name entered by user (example: "Cairo", "London")

async function getLocation(location) {
  // try-catch block handles errors gracefully
  try {
    // 'await' pauses here until the API responds
    // fetch() sends a request to the weather API
    // Template literal (`) lets us insert the location variable into the URL
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=5ecdc9621d124315ae0170629241712&q=${location}&days=3`
    );
    
    // Convert the API response from JSON format to JavaScript object
    let mydata = await response.json();
    
    // Store the data in our global variable so other functions can use it
    allLocations = mydata;
    
    // Call the display() function to show the weather on the page
    display();
    
  } catch (error) {
    // If something goes wrong (no internet, wrong city name, etc.)
    // Log the error to the browser console for debugging
    console.error('Error fetching weather data:', error);
    
    // Optional: Show user-friendly error message
    alert('Could not find weather data. Please check the city name and try again.');
  }
}

// ========================================
// INITIAL PAGE LOAD
// ========================================
// When the page first loads, automatically get weather for Cairo
getLocation("Cairo");

// ========================================
// FUNCTION: search()
// ========================================
// This function is called when user clicks the search button
// It validates the input and fetches new weather data

function search() {
  // Check if user actually typed something (not just spaces)
  // .trim() removes extra spaces from beginning and end
  if (searchInput.value.trim()) {
    // If input is valid, fetch weather for that location
    getLocation(searchInput.value);
  } else {
    // If input is empty, show a warning
    alert('Please enter a city name');
  }
}

// ========================================
// EVENT LISTENER: Enter Key Press
// ========================================
// Allows users to press 'Enter' key instead of clicking the button

searchInput.addEventListener('keypress', function(event) {
  // Check if the key pressed was 'Enter'
  if (event.key === 'Enter') {
    // If yes, trigger the search function
    search();
  }
});

// ========================================
// FUNCTION: display()
// ========================================
// This function takes the weather data and creates HTML to show it on the page

function display() {
  // ========================================
  // STEP 1: Get current date and format it
  // ========================================
  let CurrentDate = new Date();  // Creates a new Date object with current date/time
  
  // ========================================
  // STEP 2: Extract data from API response
  // ========================================
  // Using dot notation to access nested properties in the API response
  
  let locationName = allLocations.location.name;  // City name (e.g., "Cairo")
  let currentTemp = allLocations.current.temp_c;  // Temperature in Celsius
  let currentCondtionText = allLocations.current.condition.text;  // Weather description (e.g., "Sunny")
  let currentCondtionIcon = allLocations.current.condition.icon;  // Icon URL
  let humidity = allLocations.current.humidity;  // Humidity percentage
  let windSpeed = allLocations.current.wind_kph;  // Wind speed in km/h
  let windDirection = allLocations.current.wind_dir;  // Wind direction (e.g., "NW")

  // ========================================
  // STEP 3: Build HTML for TODAY's weather card
  // ========================================
  // Using template literals (`) to create HTML string
  // ${variable} inserts JavaScript variables into the HTML
  
  let content = `
    <div class="col-md-6 col-lg-4">
      <!-- Bootstrap classes: col-md-6 = 50% width on tablets, col-lg-4 = 33% on desktop -->
      <div class="card shadow-lg h-100">
        <!-- h-100 makes all cards same height -->
        
        <!-- CARD HEADER: Shows day and date -->
        <div class="card-header-modern d-flex justify-content-between">
          <!-- toLocaleString gets day name (Monday, Tuesday, etc.) -->
          <span>${CurrentDate.toLocaleString('default', {weekday:'long'})}</span>
          
          <!-- Shows date and month (e.g., "23 December") -->
          <span>${CurrentDate.getDate()} ${CurrentDate.toLocaleString('default', {month:'long'})}</span>
        </div>
        
        <!-- CARD BODY: Main weather information -->
        <div class="card-body text-center">
          <!-- Location name -->
          <h5 class="fw-bold mb-3">${locationName}</h5>
          
          <!-- Large temperature display -->
          <div class="temp-value mb-2">${currentTemp}°C</div>
          
          <!-- Weather icon from API -->
          <!-- 'https:' is added because API returns URL starting with '//' -->
          <img src="https:${currentCondtionIcon}" alt="${currentCondtionText}" class="weather-icon-large mb-3">
          
          <!-- Weather condition text (Sunny, Cloudy, etc.) -->
          <p class="text-primary fw-bold">${currentCondtionText}</p>
          
          <!-- Horizontal line separator -->
          <hr>
          
          <!-- Additional weather details in 3 columns -->
          <div class="d-flex justify-content-around mt-3">
            <!-- Humidity -->
            <div>
              <i class="fa-solid fa-droplet text-primary"></i>
              <small class="d-block">${humidity}%</small>
            </div>
            
            <!-- Wind Speed -->
            <div>
              <i class="fa-solid fa-wind text-primary"></i>
              <small class="d-block">${windSpeed} km/h</small>
            </div>
            
            <!-- Wind Direction -->
            <div>
              <i class="fa-solid fa-compass text-primary"></i>
              <small class="d-block">${windDirection}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // ========================================
  // STEP 4: Build HTML for FORECAST cards (next 2 days)
  // ========================================
  // forEach loops through each day in the forecast array
  // Parameters: day = current forecast object, index = position number (0, 1, 2)
  
  allLocations.forecast.forecastday.forEach((day, index) => {
    // Skip the first day (index 0) because we already showed today above
    if (index > 0) {
      // Convert date string to readable day name
      const dayName = new Date(day.date).toLocaleString('default', {weekday: 'long'});
      
      // Alternate header colors: first forecast card gets different color
      const headerClass = index === 1 ? 'alt-bg' : '';
      
      // Add forecast card HTML to our content string
      // += means "add to the end of existing content"
      content += `
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-lg h-100">
            <!-- Day name header -->
            <div class="card-header-modern ${headerClass} text-center">
              <span>${dayName}</span>
            </div>
            
            <!-- Forecast information -->
            <div class="card-body text-center">
              <!-- Weather icon -->
              <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" class="weather-icon-medium mb-3">
              
              <!-- Maximum temperature (larger text) -->
              <h4 class="fw-bold">${day.day.maxtemp_c}°C</h4>
              
              <!-- Minimum temperature (smaller, gray text) -->
              <p class="text-muted">${day.day.mintemp_c}°C</p>
              
              <!-- Weather condition -->
              <p class="text-primary fw-bold">${day.day.condition.text}</p>
            </div>
          </div>
        </div>
      `;
    }
  });

  // ========================================
  // STEP 5: Insert HTML into the webpage
  // ========================================
  // Find the element with id="card-content" and replace its contents
  // .innerHTML replaces everything inside that element with our new HTML
  document.getElementById('card-content').innerHTML = content;
}

// ========================================
// HOW IT ALL WORKS TOGETHER:
// ========================================
// 1. Page loads → getLocation("Cairo") runs automatically
// 2. getLocation() fetches data from API → stores in allLocations
// 3. display() reads allLocations → creates HTML cards → shows on page
// 4. User types city name → clicks button or presses Enter
// 5. search() validates input → calls getLocation() with new city
// 6. Process repeats from step 2

// ========================================
// API RESPONSE STRUCTURE (for reference):
// ========================================
// allLocations = {
//   location: { name: "Cairo", country: "Egypt", ... },
//   current: { temp_c: 27, condition: { text: "Sunny", icon: "//..." }, humidity: 54, ... },
//   forecast: {
//     forecastday: [
//       { date: "2025-12-23", day: { maxtemp_c: 28, mintemp_c: 18, ... } },
//       { date: "2025-12-24", day: { maxtemp_c: 29, mintemp_c: 19, ... } },
//       { date: "2025-12-25", day: { maxtemp_c: 27, mintemp_c: 17, ... } }
//     ]
//   }
// }