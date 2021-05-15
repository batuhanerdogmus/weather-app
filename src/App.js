import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styling/globalStyling.scss";
import Forecast from "./forecast";
import Hourly from "./hourly";
import CurrentWeather from "./current-weather";
import Autocomplete from "./Autocomplete";
import clear from "./weather-backgrounds/clear-day.jpg";
import cloudy from "./weather-backgrounds/cloudy-day.jpg";
import rain from "./weather-backgrounds/rain.svg";
import snowday from "./weather-backgrounds/snow.svg";
import thunderstorm from "./weather-backgrounds/thunderstorm.jpg";
import tornado from "./weather-backgrounds/tornado.jpg";
import overcast from "./weather-backgrounds/overcast-day.jpg";

function App() {
  const APP_KEY = process.env.REACT_APP_WEATHER_KEY;

  const [weather, setWeather] = useState(null);
  const [temp, setTemp] = useState("celcius");
  const [showDay, setShowDay] = useState("");

  // autoComplete
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const currentDateTime = new Date(
    weather ? weather.location.localtime : ""
  ).getDay();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(function (response) {
        response.json().then((jsonData) => {
          setCoordinates({ lat: jsonData.latitude, lng: jsonData.longitude });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=${coordinates.lat},${coordinates.lng}&days=3`
      )
      .then((data) => {
        setWeather(data.data);
      })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }, [coordinates]);

  const tempFahrenheit = () => {
    setTemp("fahrenheit");
  };
  const tempCelcius = () => {
    setTemp("celcius");
  };

  //  conditional render for bakcground

  function themeType() {
    const data = weather ? weather.current.condition.text.split(" ") : "";

    if (data.includes("cloudy")) {
      return cloudy;
    }
    if (data.includes("Sunny")) {
      return clear;
    }
    if (data.includes("rain")) {
      return rain;
    }
    if (data.includes("Clear")) {
      return clear;
    }
    if (data.includes("Mist")) {
      return "Mist";
    }
    if (data.includes("snow")) {
      return snowday;
    }
    if (data.includes("thunder")) {
      return thunderstorm;
    }
    if (data.includes("Overcast")) {
      return overcast;
    }
    if (data.includes("tornado")) {
      return tornado;
    } else return undefined;
  }

  return (
    <div className="App">
      <div className="d-flex justify-content-center">
        <Autocomplete
          address={address}
          setAddress={setAddress}
          setCoordinates={setCoordinates}
        />
      </div>

      {weather ? (
        <div
          className="container justify-content-center text-light pt-4  weather-container"
          style={{
            backgroundImage: "url(" + `${themeType()}` + ")",
            backgroundSize: "cover",
          }}
        >
          <CurrentWeather
            weather={weather}
            days={days}
            temp={temp}
            currentDateTime={currentDateTime}
            tempCelcius={tempCelcius}
            tempFahrenheit={tempFahrenheit}
          />

          <Hourly weather={weather} temp={temp} showDay={showDay} />

          <Forecast
            weather={weather}
            days={days}
            temp={temp}
            setShowDay={setShowDay}
            showDay={showDay}
          />
        </div>
      ) : (
        "We are fetching the data"
      )}
    </div>
  );
}

export default App;
