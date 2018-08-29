/*  Exercise 01_11_01

    Whole Spectrum Energy Solutions
    Author: Vincent Sanchez
    Date:   8.28.18

    Filename: script.js
*/

"use strict";

// global variables
var selectedCity = "Tucson, AZ";
var weatherReport;
var httpRequest = false; // have an XHR object to use?
//function to instantiate XHR
function getRequestObject() {
    alert("getRequestObject()");
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