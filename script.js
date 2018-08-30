/*  Exercise 01_11_01

    Whole Spectrum Energy Solutions
    Author: Vincent Sanchez
    Date:   8.28.18

    Filename: script.js
*/

"use strict";

// global variables
var selectedCity = "Tucson, AZ";
var weatherReport; //hold our response data
var httpRequest = false; // have an XHR object to use?
//function to instantiate XHR
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    } catch (requestError) {
        document.querySelector("p.error").innerHTML = "Forcast not supported by your browser."
        document.querySelector("p.error").style.display = "block"
        return false;
    }
    return httpRequest;
}

//function to process responce data
function fillWeather() {
    //check responce state for 4 (done) and status 200
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        weatherReport = JSON.parse(httpRequest.responseText);
    }
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dateValue = new Date(weatherReport.daily.data[0].time);
    var dayOfWeek = dateValue.getDay();
    var rows = document.querySelectorAll("section.week table tbody tr");
    document.querySelector("section.week table caption").innerHTML = selectedCity;
}
//get weather called on load or button click to select city for default city 
//or button click to selected city
function getWeather(evt) {
    var latitude;
    var longitude;
    if (evt.type !== "load") {
        if (evt.target) {
            selectedCity = evt.target.innerHTML;
        } else if (evt.srcElement) {
            selectedCity = evt.srcElement.innerHTML;
        }
    }
    if (selectedCity === "Tucson, AZ") {
        latitude = 37.7577;
        longitude = -122.4376;
    } else if (selectedCity === "Chicago, IL") {
        latitude = 41.8337329;
        longitude = -87.7321555;
    } else if (selectedCity === "Montreal, QC") {
        latitude = 45.5601062;
        longitude = -73.7120832;
    }
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    //clear any open request
    httpRequest.abort();
    //target the request to a resource
    httpRequest.open("get", "solar.php?" + "lat=" + latitude + "&lng=" + longitude, true);
    //(solar.php is the proxy to get the data from the other server, which in the case is the weather)

    //send request to server
    httpRequest.send(null);
    httpRequest.onreadystatechange = fillWeather;
}

//retrive location cities form the page
var locations = document.querySelectorAll("section ul li");
//add click event listers to li cities
for (var i = 0; i < locations.length; i++) {
    if (locations[i].addEventListener) {
        locations[i].addEventListener("click", getWeather, false);
    } else if (locations[i].attachEvent) {
        locations[i].attachEvent("onclick", getWeather);
    }
}

//event listener on load called getWeather()
if (window.addEventListener) {
    window.addEventListener("load", getWeather, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", getWeather);
}