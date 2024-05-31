import {
  GetAssignToAreas,
  GetPreferredCities,
  GetkeySkills,
} from "../apiServices";
import style from "../asserts/common.module.css";
import { useSate, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  formValidationActions,
  multiSelectionActions,
} from "../redux-store/store";
import { translate } from "../utility";

const PreferredLocation = () => {
  const preferredLocationValues = useSelector(
    (state) => state.multiSelectionRd.preferredLocation
  );

  const [preferredCities, setPreferredCities] = useState([]);
  const [preferredAreas, setPreferredAreas] = useState([]);

  const Lang = useSelector((state) => state.formDetailsRd.candidateLanguage);

  const Dispatch = useDispatch();

  // const [selectedLocations, setSelectedLocations] = useState(
  //   preferredLocationValues
  // );

  const [selectedLocation, setSelectedLocation] = useState({
    city: "",
    area: "",
    showArea: false,
    showError: false,
  });

  // const selectedLocations = useRef([]);

  useEffect(() => {
    GetPreferredCities().then((res) => {
      console.log(res.data, "cities");
      setPreferredCities(res.data);
    });
  }, []);

  function showAreas(id) {
    GetAssignToAreas(id).then((res) => {
      setPreferredAreas([...res]);
    });
  }

  function handleInput(e, id) {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedLocation((prev) => ({
        ...prev,
        city: checkboxValue,
        showArea: true,
      }));
    } else {
      setSelectedLocation((prev) => ({
        ...prev,
        city: "",
        showArea: false,
      }));
    }
    showAreas(id);
    // if (isChecked) {
    //   setSelectedLocations([...selectedLocations, checkboxValue]);
    // } else {
    //   setSelectedLocations(
    //     selectedLocations.filter((value) => value !== checkboxValue)
    //   );
    // }
  }

  function handleAreaInput(e) {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedLocation((prev) => ({ ...prev, area: checkboxValue }));
    } else {
      setSelectedLocation((prev) => ({ ...prev, area: "" }));
    }
  }

  useEffect(() => {
    setSelectedLocation((prev) => ({ ...prev, showError: false }));
  }, [selectedLocation.city, selectedLocation.area]);

  function handleKeySkills() {
    if (selectedLocation.city != "" && selectedLocation.area != "") {
      // Dispatch(multiSelectionActions.setPreferredLocation(selectedLocations));
      Dispatch(multiSelectionActions.showPreferredLocation(false));
      Dispatch(
        formValidationActions.setWorkDetails({
          key: "preferredLocations",
          value: selectedLocation,
        })
      );
      setSelectedLocation((prev) => ({ ...prev, showError: false }));
    } else {
      setSelectedLocation((prev) => ({ ...prev, showError: true }));
    }
  }

  return (
    <>
      <div>
        <h6>City</h6>
        <div
          className={`${style["scrollbar-primary"]}  `}
          style={{ maxHeight: "70vh" }}
        >
          <div className={`${style["force-overflow"]}`}>
            {preferredCities.map((el) => (
              <>
                <span key={el.id} className={`${style.chips_wrp}`}>
                  <input
                    checked={selectedLocation.city == el.city}
                    onChange={(e) => {
                      handleInput(e, el.id);
                    }}
                    value={el.city}
                    type="radio"
                    id={`pref_loc_${el.city}`}
                    name="preferred_location_city"
                  />
                  <label htmlFor={`pref_loc_${el.city}`}> {el.city}</label>
                </span>
              </>
            ))}
            <div></div>
          </div>
        </div>
        <div>
          {selectedLocation.showArea && (
            <>
              <h6>Area</h6>
              <div
                className={`${style["scrollbar-primary"]}  `}
                style={{ maxHeight: "70vh" }}
              >
                <div className={`${style["force-overflow"]}`}>
                  {preferredAreas.map((el) => (
                    <>
                      <span key={el.id} className={`${style.chips_wrp}`}>
                        <input
                          checked={selectedLocation.area == el.areas}
                          onChange={(e) => {
                            handleAreaInput(e);
                          }}
                          value={el.areas}
                          type="radio"
                          id={`pref_loc_area${el.areas}`}
                          name="preferred_location_area"
                        />
                        <label htmlFor={`pref_loc_area${el.areas}`}>
                          {" "}
                          {el.areas}
                        </label>
                      </span>
                    </>
                  ))}
                  <div></div>
                </div>
              </div>
            </>
          )}
        </div>
        <div>
          {selectedLocation.showError && (
            <p className="text-danger">
              Please enter the city and area you would like to work in
            </p>
          )}
        </div>
      </div>
      <div className="d-grid justify-content-end">
        <button
          onClick={() => {
            handleKeySkills();
          }}
          className="btn btn-success"
        >
          {translate.confirm[Lang]}
        </button>
      </div>
    </>
  );
};

export default PreferredLocation;
