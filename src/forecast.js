import React, { useEffect } from "react";

const Forecast = ({ weather, days, temp, setShowDay, showDay }) => {
  const dateToday = weather.forecast.forecastday[0].date;

  useEffect(() => {
    setShowDay(dateToday);
  }, [setShowDay, dateToday]);

  let dayStyle = {
    backgroundColor: "#181818",
    cursor: "pointer",
  };
  return (
    <div className="forecast row mt-4">
      {weather.forecast.forecastday.map((data) => {
        const currentDate = new Date(weather ? data.date : "").getDay();

        return (
          <div
            key={data.date_epoch}
            className="p-3 text-center "
            style={showDay === data.date ? dayStyle : { cursor: "pointer" }}
            onClick={() => {
              setShowDay(data.date);
            }}
          >
            <img
              src={data.day.condition.icon}
              title={data.day.condition.text}
              alt="icon"
            />
            <h4>{days[currentDate].slice(0, 3)}</h4>
            <div>
              <span>
                {temp === "fahrenheit"
                  ? data.day.maxtemp_f + "°F  "
                  : data.day.maxtemp_c + "°C  "}
              </span>
              <span>
                {temp === "fahrenheit"
                  ? data.day.mintemp_f + "°F  "
                  : data.day.mintemp_c + "°C  "}
              </span>
            </div>
            <p>{data.astro.sunrise}</p>
            <p>{data.astro.sunset}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Forecast;
