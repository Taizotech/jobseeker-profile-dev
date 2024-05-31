import { useCallback, useEffect, useState } from "react";

import SkillsContainer from "../components/skills-container";
import TaizoAppSurveyFieldContainer from "../components/taizo-app-survey-field-container";
import { useNavigate } from "react-router-dom";
import styles from "./jobseeker-profile-form-other-d.module.css";
import ScrollDialog from "../components/popupModals/keySkills";
import { GetkeySkills } from "../apiServices";
import KeySkillsData from "../components/keySkillsList";
import CoursesData from "../components/coursesList";
import LanguagesData from "../components/languagesList";
import { formValidationActions } from "../redux-store/store";
import { useSelector, useDispatch } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";
import { translate } from "../utility";
import {
  UpdateOtherDetails,
  GetProfileStage,
  GetRegStatus,
  GetCandidateSources,
} from "../apiServices";
import { set } from "date-fns";

const JobseekerProfileFormOtherD = () => {
  let noError;
  const navigate = useNavigate();
  const [sourceOptions, setSourceOptions] = useState([]);

  const showPopup = useSelector((state) => state.multiSelectionRd.showPopup);
  const otherDetails = useSelector((state) => state.formDetailsRd.otherDetails);

  const Lang = useSelector((state) => state.formDetailsRd.candidateLanguage);

  const showBack = useSelector((state) => state.candidateDetailsRd.showBack);

  const candidateNumber = useSelector(
    (state) => state.formDetailsRd.candidateNumber.val
  );
  const Dispatch = useDispatch();

  // console.log(showPopup);

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

  //   console.log(candidateNumber); // Output the value of the "id" parameter
  // }, []);
  // // end of user validation

  const [openPopup, setOpenPopup] = useState({
    keySkills: false,
    courses: false,
    lang: false,
  });
  const [scroll, setScroll] = useState("paper");

  const HandleClickOpen = (popup) => {
    setOpenPopup((prev) => ({ ...prev, keySkills: true }));
    // setOpen(true);
    // setScroll(scrollType);
  };

  const handleClose = (popup) => {
    setOpenPopup((prev) => ({ ...prev, keySkills: false }));
    // setOpen(false);
  };

  const onBackClick = useCallback(() => {
    navigate(`/jobseeker-profileformwork-details?MN=${candidateNumber}`);
  }, [navigate]);

  const onFormSubmitButtonClick = () => {
    otherDetailsValidation();

    if (noError != 0) return false;

    UpdateOtherDetails(otherDetails, candidateNumber);
    // navigate(`/jobseeker-profileformprofile-picture?MN=${candidateNumber}`);
    navigate(`/jobseeker-resume-details?MN=${candidateNumber}`);
  };

  useEffect(() => {
    GetCandidateSources().then((data) => {
      // console.log(data);
      // to get and set source options
      let options = data.map((item) => {
        return item.source;
      });
      setSourceOptions(options);
    });
  }, []);

  function otherDetailsValidation() {
    noError = 0;

    if (
      otherDetails.keySkills.val == "" ||
      otherDetails.keySkills.val == null
    ) {
      noError++;
      Dispatch(
        formValidationActions.validateOtherDetails({
          key: "keySkills",
          error: true,
        })
      );
    } else {
      Dispatch(
        formValidationActions.validateOtherDetails({
          key: "keySkills",
          error: false,
        })
      );
    }

    // if (otherDetails.courses.val == "" || otherDetails.courses.val == null) {
    //   noError++;
    //   Dispatch(
    //     formValidationActions.validateOtherDetails({
    //       key: "courses",
    //       error: true,
    //     })
    //   );
    // } else {
    //   Dispatch(
    //     formValidationActions.validateOtherDetails({
    //       key: "courses",
    //       error: false,
    //     })
    //   );
    // }

    if (
      otherDetails.referrence.val == "" ||
      otherDetails.referrence.val == null
    ) {
      noError++;
      Dispatch(
        formValidationActions.validateOtherDetails({
          key: "referrence",
          error: true,
        })
      );
    } else {
      Dispatch(
        formValidationActions.validateOtherDetails({
          key: "referrence",
          error: false,
        })
      );
    }

    if (
      otherDetails.knownLanguages.val == "" ||
      otherDetails.knownLanguages.val == null
    ) {
      noError++;
      Dispatch(
        formValidationActions.validateOtherDetails({
          key: "knownLanguages",
          error: true,
        })
      );
    } else {
      Dispatch(
        formValidationActions.validateOtherDetails({
          key: "knownLanguages",
          error: false,
        })
      );
    }

    if (
      otherDetails.knownLanguages.val == "" ||
      otherDetails.knownLanguages.val == null
    ) {
      noError++;
      Dispatch(
        formValidationActions.validateOtherDetails({
          key: "knownLanguages",
          error: true,
        })
      );
    } else {
      Dispatch(
        formValidationActions.validateOtherDetails({
          key: "knownLanguages",
          error: false,
        })
      );
    }
  }

  function handleUserInput(name, val) {
    Dispatch(
      formValidationActions.setOtherDetails({
        key: name,
        value: val,
      })
    );
  }

  return (
    <div className={styles.jobseekerProfileFormOtherD}>
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
        <div className={styles.otherDetailsContainer}>
          <div className={styles.formFieldsSectionParent}>
            <div className={styles.formFieldsSection}>
              <div className={styles.formHeading}>
                <div className={styles.otherDetails}>
                  {translate.otherDetails[Lang]}
                </div>
                <div className={styles.topRightLine}>
                  <div className={styles.topRightLineChild} />
                </div>
              </div>

              <div className={styles.formInputFields}>
                <SkillsContainer
                  type={"keySkills"}
                  HandleOpen={HandleClickOpen}
                  keySkillsText={translate.keySkills[Lang]}
                  propDisplay="inline-block"
                  propBoxSizing="border-box"
                />
                <SkillsContainer
                  type={"courses"}
                  keySkillsText={translate.certificationCourse[Lang]}
                />
                <SkillsContainer
                  type={"languages"}
                  keySkillsText="Known Languages"
                />

                <div className={styles.taizoAppSurveyField}>
                  <div className={styles.howDidYou}>
                    {translate.HowDoYouHearAboutUs[Lang]}
                  </div>

                  <Autocomplete
                    disablePortal
                    name="eduQualification"
                    options={sourceOptions}
                    onChange={(e, value) => {
                      handleUserInput("referrence", value);
                    }}
                    value={otherDetails.referrence.val}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="experienceYear"
                        color="primary"
                        // label=""
                        variant="outlined"
                        placeholder="e.g., Youtube"
                        error={otherDetails.referrence.err}
                        helperText=""
                        fullWidth
                      />
                    )}
                    size="medium"
                    fullWidth
                  />
                </div>
                {/* <TaizoAppSurveyFieldContainer hearAboutTaizoApp="How did you hear about Taizo Jobs App?" /> */}
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
        </div>
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
          title={`${translate.selectKeySkills[Lang]} ( ${translate.max[Lang]} 5)`}
          open={showPopup.keySkills}
          handleClose={handleClose}
        >
          <KeySkillsData />
        </ScrollDialog>
      </div>
      <div>
        <ScrollDialog
          title={`${translate.selectCertificationCourse[Lang]} ( ${translate.max[Lang]} 3)`}
          open={showPopup.courses}
          handleClose={handleClose}
        >
          <CoursesData />
        </ScrollDialog>
      </div>
      <div>
        <ScrollDialog
          title={`${translate.selectKnownLanguage[Lang]} ( ${translate.max[Lang]} 5)`}
          open={showPopup.languages}
          handleClose={handleClose}
        >
          <LanguagesData />
        </ScrollDialog>
      </div>
    </div>
  );
};

export default JobseekerProfileFormOtherD;
