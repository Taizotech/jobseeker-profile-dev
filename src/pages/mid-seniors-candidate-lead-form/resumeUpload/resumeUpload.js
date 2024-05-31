import { useState, useRef, useEffect } from "react";
import { TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PortalPopup from "../../../components/portal-popup";
import styles from "../resumeUpload/jobseekermidsenior-profile-form-profile.module.css";
import style from "../assets/commonCss.module.css";
import Button from "@mui/material/Button";
import {
  GetMidSeniorDetails,
  UpdateResumeUpload,
  UploadMidSeniorResume,
} from "../../../apiServices";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { translate } from "../../../utility";
import InfoIcon from "@mui/icons-material/Info";
import ClearIcon from "@mui/icons-material/Clear";
import { formValidationActions } from "../../../redux-store/store";

const ResumeUpload = () => {
  const navigate = useNavigate();
  const Dispatch = useDispatch();

  const Lang = "en";

  //   const candidateNumber = useSelector(
  //     (state) => state.formDetailsRd.candidateNumber.val
  //   );

  const [isLoading, setIsLoading] = useState(false);

  const [usedFor, setUsedFor] = useState("");

  const candidateNumber = useSelector(
    (state) => state.formDetailsRd.candidateNumber.val
  );
  const [linkedin, setLinkedin] = useState("");

  // const validateInput = (field) => {
  //   let errors = ""; // Use let instead of const
  //   switch (field) {
  //     case "Linkedin":
  //       if (!formData.Linkedin.value) errors = "Linkedin Url is Required is required.";
  //       break;
  //   }
  //   const updatedFormData = { ...formData };
  //   updatedFormData[field].error = errors; // Corrected this line
  //   setFormData(updatedFormData);
  // };

  //  const handleInputChange = (e) => {
  //   const { Linkedin, value } = e.target.value;
  //   // validateInput(name);

  //   // Update the form data with the new input value
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [Linkedin]: value
  //   }));
  // };

  useEffect(() => {
    let usedFor = localStorage.getItem("midSeniorUsedFor");
    if (usedFor == "linkedin") {
      setUsedFor("linkedin");
    }
  }, []);

  const handleInputChange = (e) => {
    setLinkedin(e.target.value);
  };
  const [showSkipPopup, setShowSkipPopup] = useState(false);
  const [open, setOpen] = useState(false);

  const [profilePicture, setProfilePicture] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [showError, setShowError] = useState(false);
  const MAX_FILE_SIZE_MB = 2;
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const openBioDataCreatedPopupMessage = (skiped) => {
    // profilepic form validation
    if (!skiped) {
      if (!profileFile) {
        setShowError(true);
        return false;
      } else {
        setShowError(false);
      }

      setIsLoading(true);
      if (!isLoading) {
        UploadMidSeniorResume(profileFile);
        handleOpen();
        const linkedinUrl = linkedin;
        UploadMidSeniorResume(profileFile, linkedinUrl)
          .then((data) => {
            // console.log(data.statuscode);

            console.log("called once");

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
            //   alert("Something went wrong");
            return false;
          })
          .finally(() => {
            setIsLoading(false);

            if (usedFor == "linkedin") {
              navigate("/jobseeker-profile-filled?from=WC");
            } else {
              window.location.href =
                "https://calendly.com/taizoindia/technical-discussion-taizo-in";
            }
            handleClose();
          });
      }
    } else {
      Dispatch(formValidationActions.setProfileFilledLoader(false));
    }
  };

  const validateAndSubmit = () => {
    // if (!profileFile) {
    //   setShowError(true);
    //   return false;
    // } else {
    //   setShowError(false);
    // }
    // Your existing logic for submitting the form
    // setIsLoading(true);
    // if (!isLoading) {
    //   UploadMidSeniorResume(profileFile)
    //     .then((data) => {
    //       // Handle the response
    //       console.log("called once");
    //       if (data.statuscode == 400) {
    //         alert("Something went wrong");
    //         return false;
    //       }
    //       if (data.statuscode === 200 || data.statuscode === 500) {
    //         Dispatch(formValidationActions.setProfileFilledLoader(false));
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       // Handle error
    //       return false;
    //     })
    //     .finally(() => {
    //       setIsLoading(false);
    //     });
    // }
    // // Continue with other form submission logic if needed
    // navigate("/jobseeker-profile-filled?from=WC");
  };

  useEffect(() => {
    let mobileNumber = localStorage.getItem("midSeniorMobileNumber");
    if (mobileNumber) {
      GetMidSeniorDetails(mobileNumber)
        .then((data) => {
          let pageNumber = data.data.profilePageNo;
          switch (pageNumber) {
            case 1:
              navigate("/candidate-work-details");
              break;

            case 2:
              navigate("/candidate-resume-upload");
              break;

            case 3:
              navigate("/jobseeker-profile-filled?from=WC");
              break;

            default:
              break;
          }
        })
        .catch(() => {
          //  setShowRegistered(false);
          alert("something went wrong");
        });
    } else {
      navigate("/candidate-basic-details?from_id=1");
    }
  }, []);

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
            {translate.areYouSureThatYouWanToSkipAndContinue[Lang]}
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
                {translate.yes[Lang]}
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

    // allow 2mb in resume

    if (file && file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert("File size exceeds the allowed limit of 2MB");
      return;
    }

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
              {usedFor == "linkedin" ? (
                <>Job Enquiry Form</>
              ) : (
                <>Schedule a Meeting - Technical Discussion</>
              )}
            </div>
            <div className={styles.pleaseFillOut}>
              {usedFor == "linkedin" ? (
                <>
                  Please fill out the details below to help us find you a job
                  faster
                </>
              ) : (
                <>
                  Please fill out the details below to help us prepare for our
                  meeting
                </>
              )}
            </div>
          </div>
          <div className={styles.profilePictureContainer}>
            <div className={styles.formFieldsSection}>
              <div className={styles.formHeading}>
                <div className={styles.profilePicture}>
                  {/* {translate.ResumeUpload[Lang]} */}
                  Resume Upload
                </div>
                <div className={styles.topRightLine}>
                  <div className={styles.topRightLineChild} />
                </div>
              </div>
              <div className={styles.profilePictureField}>
                <div className="row ">
                  <div className={`col-sm-6 ${styles.profilePictureGroup}`}>
                    <div className={styles.profilePicture1}>
                      {profilePicture && (
                        <img
                          src={profilePicture}
                          alt="Resume"
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
                          // src="/avatardefaultsvgrepocom-1.svg"
                          src="/Upload-Resume.svg"
                        />
                      )}
                    </div>
                    {/* <button className={styles.addPictureBtn}>
                      <img
                        onClick={() => {
                          handleProfilePhotoClick();
                        }}
                        className={styles.addButtonIcon}
                        alt="Resume"
                        src="/add-button.svg"
                      />
                    </button> */}

                    <input
                      type="file"
                      accept=".pdf, application/pdf"
                      onChange={handleProfilePictureChange}
                      ref={fileInputRef}
                      className="d-none"
                      name=""
                      id=""
                    />
                  </div>

                  <div
                    className={`col-sm-6 d-grid justify-content-center  align-items-center mt-sm-0 mt-3`}
                  >
                    <div>
                      <button
                        className={styles.formSubmitButton}
                        variant="outlined"
                        onClick={() => {
                          validateAndSubmit(false);
                          handleProfilePhotoClick();
                        }}
                      >
                        <span className={styles.submit}>
                          {translate.Upload[Lang]}
                        </span>
                      </button>
                    </div>
                    {/* <button
                className="btn mt-2 mx-4"
                onClick={() => {
                  closeSkipConfirm();
                }}
              >
                <span className=" text-success">{translate.skip[Lang]}</span>
              </button> */}
                  </div>
                </div>
                {showError && (
                  <p className="text-danger my-2">Please upload your resume</p>
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
                      Your chances of getting a job can be increased with a
                      Resume ( PDF )
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <TextField
              className={style.textField}
              id="outlined-basic"
              label={"Linkedin Url"}
              value={linkedin}
              inputProps={{ maxLength: 200 }}
              name="Linkedin"
              variant="outlined"
              onChange={handleInputChange}
              fullWidth
              placeholder={"eg:www.linkedin.com/in/fay-wallis098bbdccdfgg."}
            />
            {!usedFor && (
              <p
                className={`${styles.profilePictureText} d-flex flex-row  rounded mt-4`}
              >
                <span className="d-inline-block me-2"> </span>
                Join us for a virtual technical discussion!
              </p>
            )}
            {!usedFor && (
              <Button
                className="mt-4"
                variant="outlined"
                onClick={() => {
                  openBioDataCreatedPopupMessage(false);
                }}
              >
                {/* {translate.submit[Lang]} */}
                Schedule your slot
              </Button>
            )}

            {usedFor == "linkedin" && (
              <Button
                className="mt-4"
                variant="outlined"
                onClick={() => {
                  openBioDataCreatedPopupMessage(false);
                }}
              >
                Submit
              </Button>
            )}
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
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </div>

      {showSkipPopup && (
        <PortalPopup overlayColor="rgba(40, 40, 40, 0.8)" placement="Centered">
          <ConfirmationContent />
        </PortalPopup>
      )}
    </>
  );
};

export default ResumeUpload;
