import BioDataContainer from "../components/bio-data-container";
import styles from "./jobseeker-profile-create-biodat.module.css";
import { GetRegStatus, GetProfileStage } from "../apiServices";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  formValidationActions,
  candidateDetailsActions,
} from "../redux-store/store";
import { useSelector, useDispatch } from "react-redux";
import { numbersOnlyTest } from "../utility";

const JobseekerProfileCreateBiodat = () => {
  const candidateNumberr = useSelector(
    (state) => state.formDetailsRd.candidateNumber.val
  );

  const candidateLanguage = useSelector(
    (state) => state.formDetailsRd.candidateLanguage
  );

  const Dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let candidateNumber = params.get("MN");
    candidateNumber = candidateNumber ? candidateNumber.slice(-10) : 0;
    const candidateFullNumber = params.get("MN");

    const adminId = params.get("adminId");

    let isValidNumber = false;

    if (
      numbersOnlyTest(candidateFullNumber) &&
      (candidateFullNumber.length == 10 || candidateFullNumber.length == 12)
    ) {
      isValidNumber = true;
    }

    if (!isValidNumber) {
      navigate("/unauthorizedUser");
      // return false;
    }

    if (isValidNumber) {
      if (adminId && numbersOnlyTest(adminId)) {
        localStorage.setItem("adminId", adminId);
      } else {
        localStorage.removeItem("adminId");
      }

      Dispatch(formValidationActions.setCandidateNumber(candidateNumber));

      // to get candidate reg status
      GetRegStatus(candidateNumber).then((data) => {
        localStorage.setItem("candidateLanguage", "en");

        // if (!data.registered) {
        //   Dispatch(candidateDetailsActions.setLoginStatus(true));
        //   console.log("unAuthorised");
        //   // navigate("/unauthorizedUser");
        //   // return false;
        // }

        localStorage.setItem("candidateNumber", candidateNumber);
        Dispatch(formValidationActions.setCandidateNumber(candidateNumber)); // to store the candidate number in local storage
        Dispatch(candidateDetailsActions.setLoginStatus(true));
        // to get profile details
        GetProfileStage(candidateNumber).then((data) => {
          console.log(data, "HEloooooffjjjkl");
          if (data.profileFilled) {
            Dispatch(formValidationActions.setProfileFilledLoader(false));
            navigate("/jobseeker-profile-filled");
            return false;
          }

          localStorage.setItem(
            "candidateLanguage",
            data.profile.languageKey ? data.profile.languageKey : "en"
          ); // to store the candidate number in local storage
          Dispatch(
            formValidationActions.setLanguage(
              data.profile.languageKey ? data.profile.languageKey : "en"
            )
          );

          let page = data.profile.profilePageNo;
          switch (page) {
            case 1:
              // console.log("page 1");
              navigate(
                `/jobseeker-profileformeducation-details?MN=${candidateNumber}`
              );
              break;
            case 2:
              // console.log("page 2");
              navigate(
                `/jobseeker-profileformwork-details?MN=${candidateNumber}`
              );
              break;
            case 3:
              // console.log("page 3");
              navigate(
                `/jobseeker-profileformother-details?MN=${candidateNumber}`
              );
              break;
            case 4:
              // console.log("page 4");
              navigate(`/jobseeker-resume-details?MN=${candidateNumber}`);
              break;
            case 5:
              // console.log("page 5");
              navigate(
                `/jobseeker-profileformprofile-picture?MN=${candidateNumber}`
              );
              break;

            case 6:
              Dispatch(formValidationActions.setProfileFilledLoader(false));
              navigate("/jobseeker-profile-filled");
              break;

            case 0:
              // console.log("page 0");
              Dispatch(candidateDetailsActions.setShowBack(true));
              break;

            default:
              break;
          }

          if (data.profile.profilePageNo == 0) {
            Dispatch(candidateDetailsActions.setShowBack(true)); //to show back button
          }
        });
      });
    }
  }, []);

  return (
    <div className={styles.jobseekerProfileCreatebiodat}>
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
        <BioDataContainer />
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerTexts}>
          <div className={styles.copyrightInformation}>
            Copyright © Taizo Technologies Private Limited
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobseekerProfileCreateBiodat;
