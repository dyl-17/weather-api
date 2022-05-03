let button = document.querySelector("#searchBtn");
let userInput = document.querySelector("#userInput");
let city = document.querySelector("#city");
let temperature = document.querySelector("#temp");
let wind = document.querySelector("#wind");
let humidity = document.querySelector("#humidity");
let date = $("#date");
// let icon = document.querySelector("#icon");
let dailyTemp = document.querySelector("#dailyTemp");
let dailyWind = document.querySelector("#dailyWind");
let dailyHum = document.querySelector("#dailyHum");
let searchHistory = document.querySelector("#searchHistory")
let searchArray = []


// function currentWeather(location) {
//     // let latitude = location.lat
//     let { lat } = location;
//     let { lon } = location;
//     fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=29d573046879585c4de1a0d88b882525&units=imperial`)
//     .then(headers => headers.json())
//     .then(response => {
//         console.log(response);
// //         temperature = response.main.temp;
// //         wind = response.wind.speed
// //         humidity = response.main.humidity
// //         display();
//     })

// }

// function displayTime() {
//     let rightNow = moment().add(1, 'days').calendar().format("M D, YY");
//     date;
//     display();
//   }setInterval(displayTime)



// alert(new_date);

function fiveDay(location) {
    let { lat } = location;
    let { lon } = location;
    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=29d573046879585c4de1a0d88b882525&units=imperial`)
    .then(headers => headers.json())
    .then(response => {
        console.log(response);
        temperature = response.current.temp;
        wind = response.current.wind_speed;
        humidity = response.current.humidity;
        uv = response.current.uvi
        
        // }
        for (let i = 0; i < 5; i++){
            // today = document.createElement('h2')
            icon = document.createElement('img');
            icon.setAttribute('style', 'width: 100px; height: 100px')
            dailyTemp = document.createElement('p');
            dailyWind = document.createElement('p');
            dailyHum = document.createElement('p');
            icon.src = "http://openweathermap.org/img/w/"+response.daily[i].weather[0].icon+".png"
            dailyTemp.textContent = response.daily[i].temp.day + " °F"
            dailyWind.textContent = "Wind "+response.daily[i].wind_speed + " mph"
            dailyHum.textContent = "Humidity "+response.daily[i].humidity
            // use dt for date and unix to make it readable
            dayCards.append(icon);
            dayCards.append(dailyTemp);
            dayCards.append(dailyWind);
            dayCards.append(dailyHum);  
            // make the value a button to color easier
            display()
        }
    })
}

let indicatorUv = function(uv) {
    let indexUV = parseFloat(uv);
    let uvColor;                       
    if (indexUV < 2){
        uvColor = "bg-success";           
    } else if (indexUV < 7){
        uvColor = "bg-warning";
    } else {
        uvColor = "bg-danger";   
    }
    return uvColor;
};

function geoLocation(userSearch) {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+userSearch+"&limit=5&appid=29d573046879585c4de1a0d88b882525")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // currentWeather(data[0]);
        fiveDay(data[0]);
        city = data[0].name;
        // console.log(data[0]);
        display();
    })
   
    
}
let today = moment();
    $("today").text(today.format("MM D, YY"));

function display () {
    document.querySelector("#city").innerText = city;
    $("#today").text(today.format("M/D/YY"));
    document.querySelector("#temp").innerText = temperature + " °F";
    document.querySelector("#wind").innerText = "Wind " + wind + " mph";
    document.querySelector("#humidity").innerText = "Humidity " + humidity + " %";
    document.querySelector("#uv").innerText = "UV Index " + uv;
    
    
}

let indicatorUv = function(uv) {
    let indexUV = parseFloat(uv);
    let uvColor;                       
    if (indexUV < 2){
        uvColor = "bg-good";           
    } else if (indexUV < 7){
        uvColor = "bg-warning";
    } else {
        uvColor = "bg-danger";   
    }
    return uvColor;
};


function formSubmit(event) {
    event.preventDefault();
    userSearch = userInput.value;
    geoLocation(userSearch);
    userInput.value = "";
    searchArray.push(userSearch)
    localStorage.setItem("citySearched", JSON.stringify(searchArray))
    historyArray()
}

function historyArray(){
    console.log("working")
    searchHistory.innerHTML = ""
    console.log(searchHistory)
    let local = JSON.parse(localStorage.getItem("citySearched"))
    for (let i = 0; i < local.length; i++){
        let recentEl = document.createElement("p")
        recentEl.textContent = local[i]
        searchHistory.append(recentEl)
        
    }

}


button.addEventListener("click", formSubmit);