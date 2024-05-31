import { useState, useCallback, useRef } from "react";
import BioDataCreatedPopupMessage from "../components/bio-data-created-popup-message";
import PortalPopup from "../components/portal-popup";
import styles from "./jobseeker-profile-form-profile.module.css";
import { UpdateProfileDetails } from "../apiServices";
import { useSelector, useDispatch } from "react-redux";
import { formValidationActions } from "../redux-store/store";
import { GetRegStatus, GetProfileStage } from "../apiServices";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { translate } from "../utility";
import InfoIcon from "@mui/icons-material/Info";
import ClearIcon from "@mui/icons-material/Clear";

const JobseekerProfileFormProfile = () => {
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const profilePic = useSelector((state) => state.formDetailsRd.profilePicture);

  const Lang = useSelector((state) => state.formDetailsRd.candidateLanguage);

  const candidateNumber = useSelector(
    (state) => state.formDetailsRd.candidateNumber.val
  );

  const [showSkipPopup, setShowSkipPopup] = useState(false);

  const [isBioDataCreatedPopupMessageOpen, setBioDataCreatedPopupMessageOpen] =
    useState(false);

  const [profilePicture, setProfilePicture] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [showError, setShowError] = useState(false);

  const openBioDataCreatedPopupMessage = (skiped) => {
    // profilepic form validation
    if (!skiped) {
      if (!profileFile) {
        setShowError(true);
        return false;
      } else {
        setShowError(false);
      }
      UpdateProfileDetails(profileFile, candidateNumber)
        .then((data) => {
          // console.log(data.statuscode);

          if (data.statuscode == 400) {
            alert("Something went wrong");
            return false;
          }
          if (data.statuscode === 200 || data.statuscode === 500) {
            Dispatch(formValidationActions.setProfileFilledLoader(false));
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong");
          return false;
        });
    } else {
      Dispatch(formValidationActions.setProfileFilledLoader(false));
    }

    navigate("/jobseeker-profile-filled");
  };

  const closeBioDataCreatedPopupMessage = () => {
    setBioDataCreatedPopupMessageOpen(false);
  };

  const fileInputRef = useRef(null);

  const handleProfilePhotoClick = () => {
    fileInputRef.current.click();
  };

  function closeSkipConfirm() {
    setShowSkipPopup(!showSkipPopup);
  }

  function ConfirmationContent() {
    return (
      <>
        <div className="py-4 px-sm-5 px-3 bg-white rounded">
          <div className="d-flex flex-row justify-content-between">
            <h5 className="mb-4">{translate.confirmation[Lang]}</h5>
            <span
              onClick={() => {
                closeSkipConfirm();
              }}
              className="  d-inline-block "
            >
              {" "}
              <span style={{ cursor: "pointer" }}>
                <ClearIcon />
              </span>
            </span>
          </div>

          <p className={`${styles.label_text}`}>
            {" "}
            {translate.areYouSureThatYouWanToSkip[Lang]}
          </p>
          <div className="mt-4 d-flex flex-row justify-content-end">
            <button
              onClick={() => {
                closeSkipConfirm();
              }}
              className={`${styles.label_text} btn `}
              style={{ borderStyle: "none", backgroundColor: "inherit" }}
            >
              {translate.cancel[Lang]}
            </button>
            {/* <span className={styles.yesSubmit}>Yes,Skip & Submit</span> */}
            <button
              className={`${styles.formSubmitButton}  ${styles.label_text} btn ms-4`}
              onClick={() => {
                openBioDataCreatedPopupMessage(true);
              }}
            >
              <span className={`${styles.submit} ${styles.label_text}`}>
                {translate.YesSkipSubmit[Lang]}
              </span>
            </button>
          </div>
        </div>
      </>
    );
  }

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];

    setProfileFile(file);

    // Dispatch(
    //   formValidationActions.setProfilePic({ key: "photo", value: file })
    // );

    if (file) {
      // Read the file and set it as the profile picture
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        setShowError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className={styles.jobseekerProfileFormProfile}>
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
          <div className={styles.profilePictureContainer}>
            <div className={styles.formFieldsSection}>
              <div className={styles.formHeading}>
                <div className={styles.profilePicture}>
                  {translate.ProfilePicture[Lang]}
                </div>
                <div className={styles.topRightLine}>
                  <div className={styles.topRightLineChild} />
                </div>
              </div>
              <div className={styles.profilePictureField}>
                <div className={styles.profilePictureGroup}>
                  <div className={styles.profilePicture1}>
                    {profilePicture && (
                      <img
                        src={profilePicture}
                        alt="Profile"
                        className={styles.avatarDefaultSvgrepoCom1Icon}
                        onClick={() => {
                          handleProfilePhotoClick();
                        }}
                      />
                    )}

                    {!profilePicture && (
                      <img
                        className={styles.avatarDefaultSvgrepoCom1Icon}
                        alt=""
                        onClick={() => {
                          handleProfilePhotoClick();
                        }}
                        src="/avatardefaultsvgrepocom-1.svg"
                      />
                    )}
                  </div>

                  <button className={styles.addPictureBtn}>
                    <img
                      onClick={() => {
                        handleProfilePhotoClick();
                      }}
                      className={styles.addButtonIcon}
                      alt=""
                      src="/add-button.svg"
                    />
                  </button>

                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleProfilePictureChange}
                    ref={fileInputRef}
                    className="d-none"
                    name=""
                    id=""
                  />
                </div>

                {showError && (
                  <p className="text-danger">
                    {translate.PleaseUploadYourPhoto[Lang]}
                  </p>
                )}
                <div>
                  <div className="my-3">
                    <p
                      className={`${styles.profilePictureText} d-flex flex-row  rounded mt-4`}
                    >
                      <span className="d-inline-block me-2 mt-2">
                        {" "}
                        <InfoIcon />
                      </span>
                      {
                        translate
                          .yourChancesOfGettingJobIncreasedWithGoodProfilePic[
                          Lang
                        ]
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={` mt-3`}>
              <button
                className={styles.formSubmitButton}
                onClick={() => {
                  openBioDataCreatedPopupMessage(false);
                }}
              >
                <span className={styles.submit}>{translate.submit[Lang]}</span>
              </button>
              <button
                className="btn mt-2 mx-4"
                onClick={() => {
                  closeSkipConfirm();
                }}
              >
                <span className=" text-success">{translate.skip[Lang]}</span>
              </button>
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
      </div>

      {showSkipPopup && (
        <PortalPopup overlayColor="rgba(40, 40, 40, 0.8)" placement="Centered">
          <ConfirmationContent />
        </PortalPopup>
      )}
    </>
  );
};

export default JobseekerProfileFormProfile;
