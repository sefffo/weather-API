//https://api.weatherapi.com/v1/current.json?key=5ecdc9621d124315ae0170629241712&q=cairo
//https://api.weatherapi.com/v1/forecast.json?key=5ecdc9621d124315ae0170629241712&q=cairo&days=3

let allLocations = [];
let searchInput = document.getElementById("search");
let seachButton = document.getElementById("Find");

async function getLocation(location) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=5ecdc9621d124315ae0170629241712&q=${location}&days=3`
  );
  let mydata = await response.json();
  allLocations = mydata;

  display();
//   console.log(mydata);
}
getLocation("Cairo");

function search()
{

    getLocation(searchInput.value);
  

}

function display() {
    let CurrentDate = new Date();
    let locationName = allLocations.location.name;
    let currentTemp = allLocations.current.temp_c;
    let currentCondtionText = allLocations.current.condition.text;
    let currentCondtionIcon = allLocations.current.condition.icon;
    let currentDate = allLocations.forecast.forecastday.date;
    


    let content = "";
     content += `

        <div class="card card1">
        <div class="card-header main-head d-flex justify-content-between">
          <span>${CurrentDate.toLocaleString('default' , {weekday:'long'})}</span>
          <span>${CurrentDate.getDate()} ${CurrentDate.toLocaleString('default' , {month:'long'})}</span>

        </div>
        <div class="card-body">
          <h5 class="card-title tex fw-bold">${locationName}</h5>
          <div class="num text-white fw-bolder">
            ${currentTemp}
            <sup>o</sup>
            c
          </div>
          <div class="forcast-icon">

            <img src="https:${currentCondtionIcon}" alt="${currentCondtionText}">

            <span  class=" d-block text-primary">${currentCondtionText}</span>
          </div>

          <div class="cardfoot d-flex py-3">
            <img src="./Images/icon-umberella.png" alt="">  <span class="mx-3 tex">20%</span>

            <img src="./Images/icon-wind.png" alt="">   <span class="mx-3 tex">18km/h</span>
            <img src="./Images/icon-compass.png" alt="">   <span class="mx-3 tex">east</span>
          </div>
        </div>
      </div>
    



    `;


    allLocations.forecast.forecastday.forEach((day,index) => {

        if(index>0)
        {

            
        if(index==1){
            content+=`


        <div class="card">
            <div class="card-header sec-head d-flex justify-content-center">
                <span>${new Date(day.date).toLocaleString('default' , {weekday : 'long'})}</span>
            </div>
                <div class="card-body diff d-flex justify-content-center align-items-center flex-column">

            <div class="forcast-icon">
                <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            </div>

            <div class="num2 text-white fs-3 fw-bold">
                ${day.day.maxtemp_c}
                <sup>o</sup>
                C
            </div>
            <div class="small-num tex">
                <span>
                ${day.day.mintemp_c}
              
                <sup>o</sup>
                 C
                </span>
            </div>
            <div class="condition">
                <span class="text-primary">${day.day.condition.text}</span>
            </div>
          
          
            </div>
        </div>
                
                
    `


        }


        else if(index==2)
        {

            content+=
            `
                <div class="card">
                    <div class="card-header main-head d-flex justify-content-center">
                        <span>${new Date(day.date).toLocaleString('default',{weekday:'long'})}</span>
                    </div>
                <div class="card-body  d-flex justify-content-center align-items-center flex-column">

                    <div class="forcast-icon">
                        <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
                </div>

                <div class="num2 text-white fs-3 fw-bold">
                    ${day.day.maxtemp_c}
                    <sup>o</sup>
                    c
                </div>
                <div class="small-num tex">
                    <span>

                    ${day.day.mintemp_c}
                    <sup>o</sup>
                    </span>
                </div>
                <div class="condition">
                <span class="text-primary">${day.day.condition.text}</span>
                </div>
            
            
                </div>

            </div>

            
        `
        }





        }
        
    });


    document.getElementById('card-content').innerHTML=content;
}


