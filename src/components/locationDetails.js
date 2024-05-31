import { useState, useEffect } from "react";
import { GetStates, GetCities } from "../apiServices";
import { useSelector, useDispatch } from "react-redux";
import {
  singleSelectionActions,
  formValidationActions,
} from "../redux-store/store";

import style from "../asserts/common.module.css";
import { translate } from "../utility";
const LocationDetails = () => {
  const Dispatch = useDispatch();
  const [stateDetails, setStateDetails] = useState([]);
  const [citiesDetails, setCitiesDetails] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    city: null,
    state: null,
  });

  useEffect(() => {
    GetStates().then((data) => {
      setStateDetails(data.results);
    });
  }, []);

  const Lang = useSelector((state) => state.formDetailsRd.candidateLanguage);

  function handleStateInput(e, state_id, state_val) {
    // to find cities using state id

    setCitiesDetails([]);
    GetCities(state_id).then((data) => {
      setCitiesDetails(data.results);
    });
    setSelectedLocation((prev) => ({ ...prev, state: state_val }));
  }

  function resetLocation() {
    // to reset location details
    setSelectedLocation({
      city: null,
      state: null,
    });
  }

  function handleCityInput(event, city_id, city_val) {
    // to set all location details in redux store
    setSelectedLocation((prev) => ({ ...prev, city: city_val }));
    Dispatch(singleSelectionActions.showCurLocation(false));
    Dispatch(
      singleSelectionActions.setLocation({
        city: city_val,
        state: selectedLocation.state,
      })
    );
    // to set value to store
    Dispatch(
      formValidationActions.setBasicDetails({
        key: "currentLocation",
        value: `${city_val}, ${selectedLocation.state}`,
      })
    );
    // to set error
    Dispatch(
      formValidationActions.validateBasicDetails({
        key: "currentLocation",
        error: false,
      })
    );
  }

  return (
    <>
      <div>
        <div>
          <h6>{translate.state[Lang]}</h6>

          <div>
            {selectedLocation.state != null && (
              <div>
                <span className={`${style.chips_wrp}`}>
                  <input
                    type="radio"
                    name="stateList"
                    id={`selected_state_${selectedLocation.state}`}
                    value={selectedLocation.state}
                    checked
                  />
                  <label
                    className="row d-inline-block"
                    htmlFor={`selected_state_${selectedLocation.state}`}
                  >
                    <span className="col-9">{selectedLocation.state}</span>

                    <span className="col-3">
                      <button
                        onClick={() => {
                          resetLocation();
                        }}
                        className="btn-close"
                      ></button>
                    </span>
                  </label>
                </span>
              </div>
            )}
          </div>
          <div
            className={`${style["scrollbar-primary"]}  `}
            style={{ maxHeight: "60vh" }}
          >
            <div className={`${style["force-overflow"]}`}>
              {stateDetails.length > 0 && selectedLocation.state == null && (
                <>
                  {stateDetails.map((el, index) => {
                    return (
                      <span key={el.id} className={`${style.chips_wrp}`}>
                        <input
                          onClick={(e) => {
                            handleStateInput(e, el.id, el.state);
                          }}
                          type="radio"
                          name="stateList"
                          id={`state_${index}`}
                          value={el.state}
                        />
                        <label htmlFor={`state_${index}`}>{el.state}</label>
                      </span>
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <div>
            {selectedLocation.state != null && (
              <>
                <h6>{translate.city[Lang]}</h6>
                <div
                  className={`${style["scrollbar-primary"]}  `}
                  style={{ maxHeight: "60vh" }}
                >
                  <div className={`${style["force-overflow"]}`}>
                    {citiesDetails.length > 0 && (
                      <>
                        {citiesDetails.map((el, index) => {
                          return (
                            <span key={el.id} className={`${style.chips_wrp}`}>
                              <input
                                onClick={(e) => {
                                  handleCityInput(e, el.id, el.city);
                                }}
                                type="radio"
                                name="cityList"
                                id={`city_${index}`}
                                value={el.city}
                              />
                              <label htmlFor={`city_${index}`}>{el.city}</label>
                            </span>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationDetails;
