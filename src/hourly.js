import React from "react";
import Carousel from "nuka-carousel";

const Hourly = ({ weather, temp, showDay }) => {
  var settings = {
    dots: true,
    slidesToShow: window.screen.width < 576 ? 3 : 8,
    slidesToScroll: window.screen.width < 576 ? 3 : 8,
    infinite: false,
    speed: 750,
    easing: "easeSinInOut",
    event: {
      passive: false,
    },
    defaultControlsConfig: {
      nextButtonStyle: { display: "none" },
      prevButtonStyle: { display: "none" },
      pagingDotsStyle: {
        fill: "#cfd9df",
        display: "flex",
        position: "relative",
        margin: "10px 5px",
      },
    },
  };

  return (
    <div className="hourly row mt-4">
      {weather.forecast.forecastday.map((data) => {
        let forecastDay = data.date;
        let inputStyle = {
          display: "none",
        };
        return (
          <div
            key={data.date_epoch}
            className={data.date + " row w-100"}
            style={showDay !== forecastDay ? inputStyle : {}}
          >
            <div className="container p-0 ">
              <Carousel {...settings}>
                {data.hour.map((hour) => {
                  if (
                    weather.location.localtime_epoch <=
                    hour.time_epoch + 3600
                  ) {
                    return (
                      <div key={hour.time_epoch} className="mr-3 ">
                        <img
                          src={hour.condition.icon}
                          title={hour.condition.text}
                          alt="icon"
                        />
                        <h4>{hour.time.split(" ")[1]}</h4>
                        <p>
                          {temp === "fahrenheit"
                            ? hour.temp_f + "°F"
                            : hour.temp_c + "°C"}
                        </p>
                        <p>
                          {temp === "fahrenheit"
                            ? "Feels Like: " + hour.feelslike_f + "°F"
                            : "Feels Like: " + hour.feelslike_c + "°C"}
                        </p>
                      </div>
                    );
                  }
                })}
              </Carousel>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Hourly;
