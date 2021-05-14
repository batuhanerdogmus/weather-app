import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

function Autocomplete({ address, setAddress, setCoordinates }) {
  const handlerSelect = async (value) => {
    const results = await geocodeByAddress(value);
    ////// Can be use for search with city name
    // setCity(results[0].formatted_address);

    // use for fetch with coordinates
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handlerSelect}
      googleCallbackName="MyCallBack"
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="suggestion-container1">
          <input
            {...getInputProps({
              placeholder: "Type City Name To Find Wearher Forcast...",
            })}
          />
          <div className="suggestion-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const style = suggestion.active
                ? {
                    backgroundColor: "#383838",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "1.5em",
                    cursor: "pointer",
                  }
                : {
                    backgroundColor: "transparent",
                    fontSize: "1.5em",
                    fontWeight: "600",
                    cursor: "pointer",
                  };
              return (
                <div
                  className="suggestion-container2"
                  {...getSuggestionItemProps(suggestion, {
                    style,
                  })}
                >
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default Autocomplete;
