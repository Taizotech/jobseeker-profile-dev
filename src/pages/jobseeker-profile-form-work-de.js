import { useCallback, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import TaizoAppSurveyFieldContainer from "../components/taizo-app-survey-field-container";
import SkillsContainer from "../components/skills-container";
import { useNavigate } from "react-router-dom";
import styles from "./jobseeker-profile-form-work-de.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ScrollDialog from "../components/popupModals/keySkills";
import JobRoleDetails from "../components/jobRoleDetails";
import PreferredLocation from "../components/preferredLocation";
import { translate } from "../utility";

import {
  UpdateWorkDetails,
  GetRegStatus,
  GetProfileStage,
} from "../apiServices";

import { useSelector, useDispatch } from "react-redux";
import {
  singleSelectionActions,
  multiSelectionActions,
  formValidationActions,
} from "../redux-store/store";
import { set } from "date-fns";

const JobseekerProfileFormWorkDe = () => {
  let noError;

  const jobCatogoryPopupDetails = useSelector(
    (state) => state.singleSelectionRd.jobCatogory
  );
  const showPrefLocation = useSelector(
    (state) => state.multiSelectionRd.showPopup
  );
  const workDetails = useSelector((state) => state.formDetailsRd.workDetails);
  const prefLocationValue = useSelector(
    (state) => state.formDetailsRd.workDetails.preferredLocations.val
  );

  useEffect(() => {
    console.log(prefLocationValue, "Heloooo worlddd");
  }, [prefLocationValue]);

  const showBack = useSelector((state) => state.candidateDetailsRd.showBack);

  const Lang = useSelector((state) => state.formDetailsRd.candidateLanguage);

  const candidateNumber = useSelector(
    (state) => state.formDetailsRd.candidateNumber.val
  );
  const Dispatch = useDispatch();

  const navigate = useNavigate();

  const onBackClick = useCallback(() => {
    navigate("/jobseeker-profileformeducation-details");
  }, [navigate]);

  const [monthOptions, setMonthOptions] = useState([
    "0 Month",
    "01 Month",
    "02 Months",
    "03 Months",
    "04 Months",
    "05 Months",
    "06 Months",
    "07 Months",
    "08 Months",
    "09 Months",
    "10 Months",
    "11 Months",
  ]);

  // on click next button
  const onFormSubmitButtonClick = (e) => {
    e.preventDefault();
    handleWorkDetailsFormValidation();
    if (noError != 0) {
      return false;
    }

    UpdateWorkDetails(workDetails, candidateNumber);
    navigate(`/jobseeker-profileformother-details?MN=${candidateNumber}`);
  };

  function handleJobRolePopup() {
    Dispatch(singleSelectionActions.showJobCatogory(true));
  }
  function handlePrefLocPopUP() {
    Dispatch(multiSelectionActions.showPreferredLocation(true));
  }

  function handleShowWorkDetails(val) {
    resetAllFields();

    // console.log(val.target.value);
    let value = val.target.value;
    if (value == "true") {
      Dispatch(
        formValidationActions.showWorkDetailsDetails({
          PfAccount: true,
          prefLocation: true,
          expYear: false,
          jobRole: true,
          doYouHaveExp: true,
        })
      );
    } else {
      Dispatch(
        formValidationActions.showWorkDetailsDetails({
          PfAccount: false,
          prefLocation: false,
          expYear: false,
          jobRole: false,
          doYouHaveExp: false,
        })
      );
    }
  }

  function handleWorkDetailsFormValidation() {
    // form validation
    noError = 0;

    if (
      workDetails.DoYouHaveExperience.val == "" ||
      workDetails.DoYouHaveExperience.val == null
    ) {
      noError++;
      Dispatch(
        formValidationActions.validateWorkDetails({
          key: "DoYouHaveExperience",
          error: true,
        })
      );
    } else {
      Dispatch(
        formValidationActions.validateWorkDetails({
          key: "DoYouHaveExperience",
          error: false,
        })
      );
    }

    if (
      workDetails.preferredLocations.val.city == "" ||
      workDetails.preferredLocations.val.city == null
    ) {
      noError++;
      Dispatch(
        formValidationActions.validateWorkDetails({
          key: "preferredLocations",
          error: true,
        })
      );
    } else {
      Dispatch(
        formValidationActions.validateWorkDetails({
          key: "preferredLocations",
          error: false,
        })
      );
    }

    if (workDetails.PfAccount.show) {
      if (
        workDetails.PfAccount.val == "" ||
        workDetails.PfAccount.val == null
      ) {
        noError++;
        Dispatch(
          formValidationActions.validateWorkDetails({
            key: "PfAccount",
            error: true,
          })
        );
      } else {
        Dispatch(
          formValidationActions.validateWorkDetails({
            key: "PfAccount",
            error: false,
          })
        );
      }
    }

    if (workDetails.interestedJobRole.show) {
      if (
        workDetails.interestedJobRole.val == "" ||
        workDetails.interestedJobRole.val == null
      ) {
        noError++;
        Dispatch(
          formValidationActions.validateWorkDetails({
            key: "interestedJobRole",
            error: true,
          })
        );
      } else {
        Dispatch(
          formValidationActions.validateWorkDetails({
            key: "interestedJobRole",
            error: false,
          })
        );
      }
    }

    if (workDetails.yearsOfExperience.show) {
      if (
        workDetails.yearsOfExperience.val == "" ||
        workDetails.yearsOfExperience.val == null
      ) {
        noError++;
        Dispatch(
          formValidationActions.validateWorkDetails({
            key: "yearsOfExperience",
            error: true,
          })
        );
      } else {
        Dispatch(
          formValidationActions.validateWorkDetails({
            key: "yearsOfExperience",
            error: false,
          })
        );
      }

      if (
        workDetails.monthsOfExperience.val == "" ||
        workDetails.monthsOfExperience.val == null
      ) {
        noError++;
        Dispatch(
          formValidationActions.validateWorkDetails({
            key: "monthsOfExperience",
            error: true,
          })
        );
      } else {
        Dispatch(
          formValidationActions.validateWorkDetails({
            key: "monthsOfExperience",
            error: false,
          })
        );
      }
    }
  }

  function resetAllFields() {
    // to reset all fields
    Dispatch(
      singleSelectionActions.setJobcatogory({
        jobRole: "",
        industry: "",
      })
    );

    Dispatch(
      formValidationActions.setWorkDetails({ key: "PfAccount", value: "" })
    );

    // Dispatch(multiSelectionActions.setPreferredLocation([]));

    // Dispatch(
    //   formValidationActions.setWorkDetails({
    //     key: "preferredLocations",
    //     value: "",
    //   })
    // );
    Dispatch(
      formValidationActions.setWorkDetails({
        key: "yearsOfExperience",
        value: "",
      })
    );
    Dispatch(
      formValidationActions.setWorkDetails({
        key: "monthsOfExperience",
        value: "",
      })
    );
    Dispatch(
      formValidationActions.setWorkDetails({
        key: "interestedJobRole",
        value: "",
      })
    );
    Dispatch(
      formValidationActions.setWorkDetails({
        key: "DoYouHaveExperience",
        value: "",
      })
    );

    Dispatch(
      formValidationActions.setWorkDetails({
        key: "industry",
        value: "",
      })
    );
  }

  function handleUserInput(value, name) {
    // to store user value in redux

    Dispatch(formValidationActions.setWorkDetails({ key: name, value: value }));
  }

  function handleMonthOptions(value) {
    if (value == "0 Year") {
      setMonthOptions([
        "01 Month",
        "02 Months",
        "03 Months",
        "04 Months",
        "05 Months",
        "06 Months",
        "07 Months",
        "08 Months",
        "09 Months",
        "10 Months",
        "11 Months",
      ]);
    } else {
      setMonthOptions([
        "0 Month",
        "01 Month",
        "02 Months",
        "03 Months",
        "04 Months",
        "05 Months",
        "06 Months",
        "07 Months",
        "08 Months",
        "09 Months",
        "10 Months",
        "11 Months",
      ]);
    }
  }

  function handleRadioInput(e) {
    // to store user value in redux

    let name = e.target.name;
    let value = e.target.value;

    Dispatch(formValidationActions.setWorkDetails({ key: name, value: value }));
  }

  return (
    <div className={styles.jobseekerProfileFormWorkDe}>
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
        <form className={styles.workDetailsContainer}>
          <div className={styles.formFieldsSectionParent}>
            <div className={styles.formFieldsSection}>
              <div className={styles.formHeading}>
                <div className={styles.workDetails}>
                  {translate.WorkDetails[Lang]}
                </div>
                <div className={styles.formHeadingInner}>
                  <div className={styles.frameChild} />
                </div>
              </div>
              <div className={styles.radioButtonSection}>
                <div className={styles.workExperienceRadioGroup}>
                  <div
                    className={`${styles.doYouHave} ${
                      workDetails.DoYouHaveExperience.err ? "text-danger" : ""
                    }`}
                  >
                    {translate.doYouHaveExperience[Lang]}
                  </div>
                  <div className={styles.radioGroup}>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="DoYouHaveExperience"
                        onChange={(e) => {
                          handleShowWorkDetails(e);
                          handleRadioInput(e);
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          label={translate.yes[Lang]}
                          labelPlacement="end"
                          control={<Radio />}
                          checked={
                            workDetails.DoYouHaveExperience.val == "true"
                          }
                        />
                        <FormControlLabel
                          value={false}
                          label={translate.no[Lang]}
                          labelPlacement="end"
                          control={<Radio />}
                          checked={
                            workDetails.DoYouHaveExperience.val == "false"
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>

              {workDetails.DoYouHaveExperience.show && (
                <>
                  <div className={styles.jobRoleExpYearPreferredJo}>
                    <span
                      className={`${styles.doYouHave} ${
                        workDetails.interestedJobRole.err ? "text-danger" : ""
                      }`}
                    >
                      {translate.PleaseDoLetWhichJobrole[Lang]}
                    </span>
                    <TextField
                      onClick={() => {
                        handleJobRolePopup();
                      }}
                      value={
                        jobCatogoryPopupDetails.city != ""
                          ? `${jobCatogoryPopupDetails.jobRole}`
                          : ""
                      }
                      name="surveyField"
                      color="primary"
                      label={translate.jobRole[Lang]}
                      variant="outlined"
                      placeholder=""
                      helperText=""
                      fullWidth
                      multiline
                      error={workDetails.interestedJobRole.err}
                    />

                    {workDetails.yearsOfExperience.show && (
                      <div className={styles.jobRoleExperience}>
                        <div className={styles.howManyYearsContainer}>
                          <p
                            className={`${styles.howManyYears} ${
                              workDetails.yearsOfExperience.err ||
                              workDetails.monthsOfExperience.err
                                ? "text-danger"
                                : ""
                            }`}
                          >
                            {translate.howManyYearsOfExperience(
                              workDetails.interestedJobRole.val,
                              Lang
                            )}
                          </p>
                        </div>
                        <div className={styles.yearsMonthsInput}>
                          <Autocomplete
                            className={styles.degreeInput}
                            disablePortal
                            onChange={(e, value) => {
                              handleUserInput(value, "yearsOfExperience");
                              handleMonthOptions(value);
                            }}
                            value={workDetails.yearsOfExperience.val}
                            options={[
                              "0 Year",
                              "01 Year",
                              "02 Years",
                              "03 Years",
                              "04 Years",
                              "05 Years",
                              "06 Years",
                              "07 Years",
                              "08 Years",
                              "09 Years",
                              "10 Years",
                            ]}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="experienceYear"
                                color="primary"
                                label={translate.years[Lang]}
                                variant="outlined"
                                placeholder="e.g., 5 Year(s)"
                                helperText=""
                                error={workDetails.yearsOfExperience.err}
                              />
                            )}
                            size="medium"
                          />
                          <Autocomplete
                            className={styles.degreeInput}
                            disablePortal
                            onChange={(e, val) => {
                              handleUserInput(val, "monthsOfExperience");
                            }}
                            value={workDetails.monthsOfExperience.val}
                            options={monthOptions}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="experienceMonth"
                                color="primary"
                                label={translate.months[Lang]}
                                variant="outlined"
                                placeholder="e.g., 01 Month(s)"
                                helperText={workDetails.monthsOfExperience.err}
                                error={workDetails.monthsOfExperience.err}
                              />
                            )}
                            size="medium"
                          />
                        </div>
                      </div>
                    )}
                    {/* <SkillsContainer
                      keySkillsText="Where do you want to work?"
                      propDisplay="unset"
                      propBoxSizing="unset"
                    /> */}
                  </div>
                  <div className={styles.radioButtonSection}>
                    <div className={styles.workExperienceRadioGroup}>
                      <div
                        className={`${styles.doYouHave} ${
                          workDetails.PfAccount.err ? "text-danger" : ""
                        }`}
                      >
                        {translate.doYouHavePfEsi[Lang]}
                      </div>
                      <div className={styles.radioGroup}>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="PfAccount"
                            onChange={(e) => {
                              handleRadioInput(e);
                            }}
                          >
                            <FormControlLabel
                              value={"Yes"}
                              label={translate.yes[Lang]}
                              labelPlacement="end"
                              control={<Radio />}
                              checked={workDetails.PfAccount.val == "Yes"}
                            />
                            <FormControlLabel
                              value={"No"}
                              label={translate.no[Lang]}
                              labelPlacement="end"
                              control={<Radio />}
                              checked={workDetails.PfAccount.val == "No"}
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <span
                className={`${styles.doYouHave}
                         ${
                           workDetails.preferredLocations.err
                             ? "text-danger"
                             : ""
                         }`}
              >
                {translate.WhereDoYouWantToWork[Lang]}
              </span>

              <div
                onClick={() => {
                  handlePrefLocPopUP();
                }}
                className="d-flex align-self-stretch"
              >
                <TextField
                  value={prefLocationValue.city?` ${prefLocationValue.city}, ${prefLocationValue.area}`:""}
                  name="preferredLocation"
                  color="primary"
                  label={translate.preferredLocations[Lang]}
                  variant="outlined"
                  placeholder="e.g., Chennai, Ambattur"
                  helperText=""
                  multiline
                  fullWidth
                  error={workDetails.preferredLocations.err}
                />
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

      <div>
        <ScrollDialog
          title={translate.selectIndustryJobrole[Lang]}
          open={jobCatogoryPopupDetails.show}
        >
          <JobRoleDetails />
        </ScrollDialog>
      </div>

      {/* preferred location modal */}
      <div>
        <ScrollDialog
          title={translate.SelectPreferredjoblocation[Lang]}
          open={showPrefLocation.preferredLocation}
        >
          <PreferredLocation />
        </ScrollDialog>
      </div>
    </div>
  );
};

export default JobseekerProfileFormWorkDe;
