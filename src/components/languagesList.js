import { Getlanguages } from "../apiServices";
import style from "../asserts/common.module.css";
import { useSate, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  multiSelectionActions,
  formValidationActions,
} from "../redux-store/store";
import { set } from "date-fns";
import { translate } from "../utility";
const LanguagesData = () => {
  const languagesValues = useSelector(
    (state) => state.multiSelectionRd.languages
  );

  const Lang = useSelector((state) => state.formDetailsRd.candidateLanguage);

  const Dispatch = useDispatch();
  const [languagesDetails, setLanguagesDetails] = useState({});
  const [selectedLanguages, setSelectedLanguages] = useState(languagesValues);
  const [languageCode, setLanguageCode] = useState([]);

  useEffect(() => {
    Getlanguages().then((data) => {
      setLanguagesDetails(data.results);
    });
  }, []);

  function handleInput(e) {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;
    const dataId = e.target.getAttribute("data-id");

    if (isChecked) {
      if (selectedLanguages.length < 5) {
        setSelectedLanguages([...selectedLanguages, checkboxValue]);
        setLanguageCode([...languageCode, dataId]);
      } else {
        e.preventDefault();
        e.target.checked = false;
      }
    } else {
      setSelectedLanguages(
        selectedLanguages.filter((value) => value !== checkboxValue)
      );
      setLanguageCode(languageCode.filter((value) => value !== dataId));
    }
  }

  function handleLanguages() {
    Dispatch(multiSelectionActions.setLanguages(selectedLanguages));
    Dispatch(multiSelectionActions.showLanguages(false));
    Dispatch(
      formValidationActions.setOtherDetails({
        key: "knownLanguages",
        value: selectedLanguages,
      })
    );
    Dispatch(
      formValidationActions.setOtherDetails({
        key: "languageCode",
        value: languageCode.join(","),
      })
    );
  }

  return (
    <>
      <div>
        <div
          className={`${style["scrollbar-primary"]}  `}
          style={{ maxHeight: "70vh" }}
        >
          <div className={`${style["force-overflow"]}`}>
            {languagesDetails.length > 0 && (
              <>
                {languagesDetails.map((el, index) => {
                  return (
                    <span key={el.id} className={`${style.chips_wrp}`}>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        type="checkbox"
                        name="languageList"
                        id={`language_${el.id}`}
                        data-id={el.id}
                        value={el.languages}
                        checked={selectedLanguages.includes(el.languages)}
                      />
                      <label htmlFor={`language_${el.id}`}>
                        {el.languages}
                      </label>
                    </span>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="d-grid justify-content-end">
        <button
          onClick={() => {
            handleLanguages();
          }}
          className="btn btn-success"
        >
          {translate.confirm[Lang]}
        </button>
      </div>
    </>
  );
};

export default LanguagesData;
