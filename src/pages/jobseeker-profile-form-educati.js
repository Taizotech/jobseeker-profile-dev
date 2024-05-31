import { useCallback, useState, useEffect } from "react";

import TaizoAppSurveyFieldContainer from "../components/taizo-app-survey-field-container";
import SkillsContainer from "../components/skills-container";
import { useNavigate } from "react-router-dom";
import styles from "./jobseeker-profile-form-educati.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Autocomplete, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { GetDepartments } from "../apiServices";
import YearPicker from "../components/yearPicker";
import { useSelector, useDispatch } from "react-redux";
import StudentsNotAllowed from "../components/students-not-allowed";
import PortalPopup from "../components/portal-popup";
import ScrollDialog from "../components/popupModals/keySkills";

import {
  UpdateEducationDetails,
  GetProfileStage,
  GetRegStatus,
} from "../apiServices";

import {
  formValidationActions,
  singleSelectionActions,
} from "../redux-store/store";
import { translate } from "../utility";
const JobseekerProfileFormEducati = () => {
  let noError;
  const Dispatch = useDispatch();
  const eductiondetails = useSelector(
    (state) => state.formDetailsRd.educationDetails
  );

  const showBack = useSelector((state) => state.candidateDetailsRd.showBack);

  const candidateNumber = useSelector(
    (state) => state.formDetailsRd.candidateNumber.val
  );

  const Lang = useSelector((state) => state.formDetailsRd.candidateLanguage);

  const [departmentList, setDepartmentList] = useState([]);

  const navigate = useNavigate();

  const onBackClick = useCallback(() => {
    navigate(`/jobseeker-profileformbasic-details?MN=${candidateNumber}`);
  }, [navigate]);

  // // user validation
  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const candidateNumber = params.get("MN");

  //   if (candidateNumber != null) {
  //     Dispatch(formValidationActions.setCandidateNumber(candidateNumber));

  //     // to get candidate reg status
  //     GetRegStatus(candidateNumber).then((data) => {
  //       if (!data.registered) {
  //         // navigate("/unauthorizedUser");
  //         return false;
  //       }
  //       // to get profile details
  //       // GetProfileStage(candidateNumber);
  //     });
  //   } else {
  //     // navigate("/unauthorizedUser");
  //   }

  // console.log(candidateNumber); // Output the value of the "id" parameter
  // }, []);
  // // end of user validation

  const onFormSubmitButtonClick = (e) => {
    e.preventDefault();
    eductionDetailsValidation();

    if (noError != 0) {
      return false;
    }

    UpdateEducationDetails(eductiondetails, candidateNumber);
    if (eductiondetails.areYouStudent.val == "Yes") {
      navigate("/noStudents");
      return false;
    }

    navigate(`/jobseeker-profileformwork-details?MN=${candidateNumber}`);
  };

  function eductionDetailsValidation() {
    // form validation
    noError = 0;

    if (
      eductiondetails.eduQualification.val == "" ||
      eductiondetails.eduQualification.val == null
    ) {
      noError++;
      Dispatch(
        formValidationActions.validateEducationDetails({
          key: "eduQualification",
          error: true,
        })
      );
    } else {
      Dispatch(
        formValidationActions.validateEducationDetails({
          key: "eduQualification",
          error: false,
        })
      );
    }

    if (eductiondetails.department.show) {
      if (
        eductiondetails.department.val == "" ||
        eductiondetails.department.val == null
      ) {
        noError++;
        Dispatch(
          formValidationActions.validateEducationDetails({
            key: "department",
            error: true,
          })
        );
      } else {
        Dispatch(
          formValidationActions.validateEducationDetails({
            key: "department",
            error: false,
          })
        );
      }
    }

    if (eductiondetails.completionYear.show) {
      if (
        (eductiondetails.completionYear.val == "" ||
          eductiondetails.completionYear.val) == null
      ) {
        noError++;
        Dispatch(
          formValidationActions.validateEducationDetails({
            key: "completionYear",
            error: true,
          })
        );
      } else {
        Dispatch(
          formValidationActions.validateEducationDetails({
            key: "completionYear",
            error: false,
          })
        );
      }
    }

    if (eductiondetails.areYouStudent.show) {
      if (
        eductiondetails.areYouStudent.val == "" ||
        eductiondetails.areYouStudent.val == null
      ) {
        noError++;
        Dispatch(
          formValidationActions.validateEducationDetails({
            key: "areYouStudent",
            error: true,
          })
        );
      } else {
        Dispatch(
          formValidationActions.validateEducationDetails({
            key: "areYouStudent",
            error: false,
          })
        );
      }
    }

    if (eductiondetails.doYouHaveArrears.show) {
      if (
        eductiondetails.doYouHaveArrears.val == "" ||
        eductiondetails.doYouHaveArrears.val == null
      ) {
        noError++;
        Dispatch(
          formValidationActions.validateEducationDetails({
            key: "doYouHaveArrears",
            error: true,
          })
        );
      } else {
        Dispatch(
          formValidationActions.validateEducationDetails({
            key: "doYouHaveArrears",
            error: false,
          })
        );
      }
    }
  }

  function handleEducationInput(e, value) {
    handleGetDepartment(value);
  }

  function handleGetDepartment(value) {
    let end_url;

    // to reset all fields
    resetAllFields();

    switch (value) {
      case "Diploma":
        end_url = "diplomaCourses";
        break;
      case "ITI":
        end_url = "ITICourses";
        break;
      case "UG":
        end_url = "UGCourses";
        break;
      case "PG":
        end_url = "PGCourses";
        break;
      default:
        end_url = null;
        break;
    }

    if (end_url != null) {
      GetDepartments(end_url).then((data) => {
        // console.log(data.results);

        setDepartmentList(data.results);

        Dispatch(
          // to show hide details
          formValidationActions.setEducationDetails({
            key: "departmentOptions",
            value: data.results,
          })
        );

        // console.log(eductiondetails.departmentOptions.val);

        Dispatch(
          // to show hide details
          formValidationActions.showEducationDetails({
            education: true,
            department: true,
            year: true,
            student: false,
            arreas: false,
          })
        );
      });
    } else {
      Dispatch(
        formValidationActions.showEducationDetails({
          // to show hide details
          education: true,
          department: false,
          year: false,
          student: false,
          arreas: false,
        })
      );
    }
  }

  // to handle are you student radio button
  function handleStudentRadio(e) {
    // console.log(e);

    let name = e.target.name;
    let value = e.target.value;
    // console.log(name, value);
    Dispatch(
      formValidationActions.setEducationDetails({ key: name, value: value })
    );
    if (value == "no") {
      Dispatch(
        formValidationActions.showEducationDetails({
          // to show hide details
          education: true,
          department: true,
          year: true,
          student: true,
          arreas: true,
        })
      );
    } else {
      Dispatch(
        formValidationActions.showEducationDetails({
          // to show hide details
          education: true,
          department: true,
          year: true,
          student: true,
          arreas: false,
        })
      );
    }
  }

  function handleArrearsRadio(e) {
    let name = e.target.name;
    let value = e.target.value;
    // let showErr = e.target.value != "" && e.target.value != null;
    Dispatch(
      formValidationActions.setEducationDetails({ key: name, value: value })
    );
  }

  function handleUserInput(name, val) {
    // to store values in redux

    // console.log(name);

    // console.log(val);

    Dispatch(
      // to show hide details
      formValidationActions.setEducationDetails({
        key: name,
        value: val,
      })
    );
  }

  function resetAllFields() {
    Dispatch(
      formValidationActions.setEducationDetails({
        key: "department",
        value: "",
      })
    );

    Dispatch(
      formValidationActions.setEducationDetails({
        key: "completionYear",
        value: null,
      })
    );

    Dispatch(
      formValidationActions.setEducationDetails({
        key: "doYouHaveArrears",
        value: "",
      })
    );

    Dispatch(
      formValidationActions.setEducationDetails({
        key: "areYouStudent",
        value: "",
      })
    );
  }

  return (
    <div className={styles.jobseekerProfileFormEducati}>
      <header className={styles.topHeader}>
        <div className={styles.topContainer}>
          <img
            className={styles.headerLogoIcon}
            alt=""
            src="/header-logo.svg"
          />
        </div>
      </header>
      <div className={styles.bodySection}>
        <div className={styles.heading}>
          <div className={styles.createYourBioData}>
            {" "}
            {translate.CreateYourBioData[Lang]}
          </div>
          <div className={styles.pleaseFillOut}>
            {translate.PleaseFillOutYourBioData[Lang]}
          </div>
        </div>
        <form className={styles.educationDetailsContainer}>
          <div className={styles.formFields}>
            <div className={styles.formFieldsSection}>
              <div className={styles.formHeading}>
                <div className={styles.educationDetails}>
                  {translate.EducationDetails[Lang]}
                </div>
                <div className={styles.formHeadingInner}>
                  <div className={styles.frameChild} />
                </div>
              </div>
              <div className={styles.educationalQualificationDegr}>
                <Autocomplete
                  disablePortal
                  name="eduQualification"
                  options={[
                    "Below 10th",
                    "10th Pass and Above",
                    "Diploma",
                    "ITI",
                    "UG",
                    "PG",
                  ]}
                  onChange={(e, value) => {
                    handleEducationInput(e, value);
                    handleUserInput("eduQualification", value);
                  }}
                  value={eductiondetails.eduQualification.val}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="experienceYear"
                      color="primary"
                      label={translate.educationQualfication[Lang]}
                      variant="outlined"
                      placeholder="e.g., Diploma"
                      error={eductiondetails.eduQualification.err}
                      helperText=""
                      fullWidth
                    />
                  )}
                  size="medium"
                  fullWidth
                />

                {eductiondetails.department.show > 0 && (
                  <Autocomplete
                    disablePortal
                    options={eductiondetails.departmentOptions.val.map((el) => {
                      return el.courses;
                    })}
                    name="department"
                    onChange={(e, val) => {
                      handleUserInput("department", val);
                    }}
                    value={eductiondetails.department.val}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="department"
                        color="primary"
                        label={translate.department[Lang]}
                        variant="outlined"
                        placeholder="e.g., Diploma "
                        error={eductiondetails.department.err}
                        helperText=""
                        fullWidth
                      />
                    )}
                    size="medium"
                    fullWidth
                  />
                )}
              </div>
              {/* completion year component */}
              {eductiondetails.completionYear.show && <YearPicker />}
              {/* completion year component */}

              <div className={styles.radioButtonSection}>
                {eductiondetails.areYouStudent.show && (
                  <div className={styles.areYouAStudentRadioGroup}>
                    <div className={styles.radioGroup}>
                      <FormControl>
                        <FormLabel
                          className={styles.areYouA}
                          error={eductiondetails.areYouStudent.err}
                          id="demo-radio-buttons-group-label"
                        >
                          {translate.areYouStudent[Lang]}
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="areYouStudent"
                          onChange={(val) => {
                            handleStudentRadio(val);
                          }}
                          error={true}
                        >
                          <FormControlLabel
                            value={"Yes"}
                            label={translate.yes[Lang]}
                            labelPlacement="end"
                            control={<Radio />}
                            checked={eductiondetails.areYouStudent.val == "Yes"}
                          />
                          <FormControlLabel
                            value={"No"}
                            label={translate.no[Lang]}
                            labelPlacement="end"
                            control={<Radio />}
                            checked={eductiondetails.areYouStudent.val == "No"}
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                )}
                {eductiondetails.doYouHaveArrears.show && (
                  <div className={styles.areYouAStudentRadioGroup}>
                    <div className={styles.radioOption}>
                      <FormControl>
                        <FormLabel
                          className={styles.areYouA}
                          error={
                            eductiondetails.doYouHaveArrears.val != ""
                              ? false
                              : true
                          }
                          id="demo-radio-buttons-group-label"
                        >
                          {translate.doYouHaveArrears[Lang]}
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="doYouHaveArrears"
                          onChange={(val) => {
                            handleArrearsRadio(val);
                          }}
                        >
                          <FormControlLabel
                            value={"Yes"}
                            label={translate.yes[Lang]}
                            labelPlacement="end"
                            control={<Radio />}
                            checked={
                              eductiondetails.doYouHaveArrears.val == "Yes"
                            }
                          />
                          <FormControlLabel
                            value={"No"}
                            label={translate.no[Lang]}
                            labelPlacement="end"
                            control={<Radio />}
                            checked={
                              eductiondetails.doYouHaveArrears.val == "No"
                            }
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.bottomNextNavBtn}>
              {showBack && (
                <button className={styles.back} onClick={onBackClick}>
                  {translate.back[Lang]}
                </button>
              )}
              <button
                className={styles.formSubmitButton}
                onClick={onFormSubmitButtonClick}
              >
                <div className={styles.submit}>{translate.next[Lang]}</div>
              </button>
            </div>
          </div>
        </form>
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerTexts}>
          <div className={styles.copyrightInformation}>
            Copyright © Taizo Technologies Private Limited
          </div>
        </div>
      </footer>

      {/* Student not allowed modal */}
      {/* <div>
        <PortalPopup overlayColor="rgba(40, 40, 40, 0.8)" placement="Centered">
          <div>
            <StudentsNotAllowed />
          </div>
        </PortalPopup>
      </div> */}
    </div>
  );
};

export default JobseekerProfileFormEducati;
