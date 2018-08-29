<?php
$WeatherSource = "https://api.forecast.io/forecast/06d8ccc4b39b948ec1c19fc7f47738aa/" . $_GET["lat"] . "," . $_GET["lng"];
header("Content-Type: application/json");
header("Cache-Control: no-cache");
readfile($WeatherSource);
?>