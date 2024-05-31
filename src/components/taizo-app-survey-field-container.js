import { useMemo } from "react";
import { Autocomplete, TextField } from "@mui/material";
import styles from "./taizo-app-survey-field-container.module.css";

const TaizoAppSurveyFieldContainer = ({
  hearAboutTaizoApp,
  jobRoleInterest,
  propDisplay,
  propBoxSizing,
  propBoxSizing1,
  propDisplay1,
}) => {
  const howDidYouStyle = useMemo(() => {
    return {
      display: propDisplay,
    };
  }, [propDisplay]);

  const dropdownStyle = useMemo(() => {
    return {
      boxSizing: propBoxSizing,
    };
  }, [propBoxSizing]);

  return <></>;
};

export default TaizoAppSurveyFieldContainer;
