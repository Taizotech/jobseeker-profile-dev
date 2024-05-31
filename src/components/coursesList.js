import { GetCourses } from "./../apiServices";
import style from "../asserts/common.module.css";
import { useSate, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  multiSelectionActions,
  formValidationActions,
} from "../redux-store/store";

import { da } from "date-fns/locale";
import { translate } from "../utility";
const CoursesData = () => {
  const coursesValues = useSelector((state) => state.multiSelectionRd.courses);
  const Lang = useSelector((state) => state.formDetailsRd.candidateLanguage);
  // const coursesDetails=useSelector((state)=>{state.mu})
  const Dispatch = useDispatch();
  const [coursesDetails, setCoursesDetails] = useState({});
  const [selectedCourses, setSelectedCourses] = useState(coursesValues);

  // const selectedCourses = useRef([]);

  function handleInput(e) {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      if (selectedCourses.length < 3) {
        setSelectedCourses([...selectedCourses, checkboxValue]);
      } else {
        e.preventDefault();
      }
    } else {
      setSelectedCourses(
        selectedCourses.filter((value) => value !== checkboxValue)
      );
      // console.log(selectedCourses.current.length);
    }

    // console.log(selectedCourses.current.length);
  }

  useEffect(() => {
    GetCourses().then((data) => {
      // console.log(data);
      setCoursesDetails(data.results);
    });
  }, []);

  function handlCourses() {
    // console.log(selectedKeySkills.current);
    Dispatch(multiSelectionActions.setCourses(selectedCourses));
    Dispatch(multiSelectionActions.showCourses(false));

    Dispatch(
      formValidationActions.setOtherDetails({
        key: "courses",
        value: selectedCourses,
      })
    );
  }
  return (
    <>
      <div>
        <>
          <div>
            <div
              className={`${style["scrollbar-primary"]}  `}
              style={{ maxHeight: "70vh" }}
            >
              <div className={`${style["force-overflow"]}`}>
                {coursesDetails.length > 0 && (
                  <>
                    {coursesDetails.map((el, index) => {
                      return (
                        <span key={el.id} className={`${style.chips_wrp}`}>
                          <input
                            onChange={(e) => {
                              handleInput(e);
                            }}
                            type="checkbox"
                            name="keyskillList"
                            id={`keySkill_${index}`}
                            value={el.courses}
                            checked={selectedCourses.includes(el.courses)}
                          />
                          <label htmlFor={`keySkill_${index}`}>
                            {el.courses}
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
                handlCourses();
              }}
              className="btn btn-success"
            >
              {translate.confirm[Lang]}
            </button>
          </div>
        </>
      </div>
    </>
  );
};

export default CoursesData;
