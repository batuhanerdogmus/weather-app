import React from "react";
import arrow from "./images/arrow.svg";
import heart from "./images/heart.svg";

const CurrentWeather = ({
  weather,
  days,
  temp,
  currentDateTime,
  tempCelcius,
  tempFahrenheit,
}) => {
  return (
    <div className="current-weather text-center text-sm-left">
      <div className="mb-4">
        <h3 className="d-inline-block">
          {weather.location.name}, {weather.location.region},{""}
          {weather.location.country}
        </h3>
        <div className="heart d-inline-block float-right">
          <img src={heart} alt="heart" />
        </div>
        <h4>
          {days[currentDateTime]}, {weather.location.localtime}
        </h4>
      </div>
      <div className=" row">
        <div className="current-temp col-12 col-sm-7 mb-4">
          <img
            src={weather.current.condition.icon}
            title={weather.current.condition.text}
            alt="WEATHER ICON"
          />
          <h2 className="font-weight-bold mr-4 ml-5 d-inline">
            {temp === "fahrenheit"
              ? weather.current.temp_f + "°F"
              : weather.current.temp_c + "°C"}
          </h2>
          <div className="tempbutton d-inline">
            <span onClick={tempCelcius}>°C</span>
            <div></div>
            <span onClick={tempFahrenheit}>°F</span>
          </div>
          <h4 className="mt-3">{weather.current.condition.text}</h4>
        </div>
        <div className=" col-12 col-sm-5 ">
          <div className=" font-weight-bold text-left d-inline-block">
            <p> Humidity: {weather.current.humidity}%</p>
            <p>
              Wind:
              {temp === "fahrenheit"
                ? " " + weather.current.vis_miles + " mph"
                : " " + weather.current.vis_km + " kmph"}
              <img
                src={arrow}
                alt="arrow"
                title={weather.current.wind_dir}
                style={{
                  transform: `rotate(${weather.current.wind_degree}deg)`,
                }}
              />
            </p>
            <p>
              Feels like:
              {temp === "fahrenheit"
                ? " " + weather.current.feelslike_f + "°F"
                : " " + weather.current.feelslike_c + "°C"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
