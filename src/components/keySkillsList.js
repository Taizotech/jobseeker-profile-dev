import { GetkeySkills } from "../apiServices";
import style from "../asserts/common.module.css";
import { useSate, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  multiSelectionActions,
  formValidationActions,
} from "../redux-store/store";
import { translate } from "../utility";
const KeySkillsData = () => {
  const keySkillsValues = useSelector(
    (state) => state.multiSelectionRd.keySkills
  );

  const Lang = useSelector((state) => state.formDetailsRd.candidateLanguage);

  const Dispatch = useDispatch();
  const [keySkillsDetails, setKeySkillsDetails] = useState({});
  const [selectedKeySkills, setSelectedKeySkills] = useState(keySkillsValues);

  // const selectedKeySkills = useRef([]);

  useEffect(() => {
    GetkeySkills().then((data) => {
      setKeySkillsDetails(data.results);
    });
  }, []);

  function handleInput(e) {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      if (selectedKeySkills.length < 5) {
        setSelectedKeySkills([...selectedKeySkills, checkboxValue]);
      } else {
        e.preventDefault();
        e.target.checked = false;
      }
    } else {
      setSelectedKeySkills(
        selectedKeySkills.filter((value) => value !== checkboxValue)
      );
    }
  }

  function handleKeySkills() {
    // console.log(selectedKeySkills);
    Dispatch(multiSelectionActions.setKeyskills(selectedKeySkills));
    Dispatch(multiSelectionActions.showKeySkills(false));
    Dispatch(
      formValidationActions.setOtherDetails({
        key: "keySkills",
        value: selectedKeySkills,
      })
    );
  }

  // console.log(keySkillsDetails);

  return (
    <>
      <div>
        <div
          className={`${style["scrollbar-primary"]}  `}
          style={{ maxHeight: "70vh" }}
        >
          <div className={`${style["force-overflow"]}`}>
            {keySkillsDetails.length > 0 && (
              <>
                {keySkillsDetails.map((el, index) => {
                  return (
                    <span key={el.id} className={`${style.chips_wrp}`}>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        type="checkbox"
                        name="keyskillList"
                        id={`keySkill_${index}`}
                        value={el.skill}
                        checked={selectedKeySkills.includes(el.skill)}
                      />
                      <label htmlFor={`keySkill_${index}`}>{el.skill}</label>
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

export default KeySkillsData;
