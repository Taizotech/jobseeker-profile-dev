import { useMemo } from "react";
import { Autocomplete, TextField } from "@mui/material";
import styles from "./skills-container.module.css";
import { multiSelectionActions } from "../redux-store/store";
import { useSelector, useDispatch } from "react-redux";
import { translate } from "../utility";

const SkillsContainer = ({
  keySkillsText,
  certificationCoursesText,
  type,
  propDisplay,
  propBoxSizing,
  propBoxSizing1,
  propDisplay1,
  HandleOpen,
}) => {
  const otherDetails = useSelector((state) => state.formDetailsRd.otherDetails);
  const showPopup = useSelector((state) => state.showPopup);
  const keySkillsVal = useSelector((state) => state.multiSelectionRd.keySkills);
  const coursesValue = useSelector((state) => state.multiSelectionRd.courses);
  const languageValue = useSelector(
    (state) => state.multiSelectionRd.languages
  );
  const Lang = useSelector((state) => state.formDetailsRd.candidateLanguage);

  const Dispatch = useDispatch();
  let keySkills = keySkillsVal;

  const keySkillsStyle = useMemo(() => {
    return {
      display: propDisplay,
    };
  }, [propDisplay]);

  const keySkillsInputStyle = useMemo(() => {
    return {
      boxSizing: propBoxSizing,
    };
  }, [propBoxSizing]);

  function OpenMultiSelectionPopup(type) {
    switch (type) {
      case "keySkills":
        Dispatch(multiSelectionActions.showKeySkills(true));
        break;

      case "courses":
        Dispatch(multiSelectionActions.showCourses(true));
        break;

      case "languages":
        Dispatch(multiSelectionActions.showLanguages(true));
        break;

      default:
        break;
    }
  }

  return (
    <div
      onClick={() => {
        OpenMultiSelectionPopup(type);
      }}
      className={styles.keySkillsField}
    >
      {/* <div className={styles.keySkills} style={keySkillsStyle}>
        {keySkillsText}
      </div> */}
      {type == "keySkills" && (
        <TextField
          error={otherDetails.keySkills.err}
          value={keySkills.join(", ")}
          name="jobseekerKeskills"
          color="primary"
          label={translate.keySkills[Lang]}
          variant="outlined"
          placeholder={translate.keySkills[Lang]}
          fullWidth
          multiline
          helperText=""
        />
      )}
      {type == "courses" && (
        <TextField
          error={otherDetails.courses.err}
          value={coursesValue.join(", ")}
          name="jobseekerKeskills"
          color="primary"
          label={translate.certificationCourse[Lang]}
          variant="outlined"
          placeholder={translate.certificationCourse[Lang]}
          fullWidth
          multiline
        />
      )}
      {type == "languages" && (
        <TextField
          error={otherDetails.knownLanguages.err}
          value={languageValue.join(", ")}
          name="jobseekerKeskills"
          color="primary"
          label={translate.knownLanguages[Lang]}
          variant="outlined"
          placeholder={translate.knownLanguages[Lang]}
          fullWidth
          multiline
        />
      )}
    </div>
  );
};

export default SkillsContainer;
