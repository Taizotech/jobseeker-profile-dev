import { useState, useCallback, useEffect } from "react";
import { TextField, Icon, Autocomplete } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { format, parseISO } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import styles from "./jobseeker-profile-form-basic-d.module.css";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ScrollDialog from "../components/popupModals/keySkills";
import LocationDetails from "../components/locationDetails";
import {
  UpdateBasicDetails,
  GetRegStatus,
  GetProfileStage,
} from "../apiServices";
import {
  alphabetWithDotTest,
  convertDateYYYYMMDD,
  translate,
} from "../utility";

import { useSelector, useDispatch } from "react-redux";
import {
  singleSelectionActions,
  formValidationActions,
} from "../redux-store/store";

// import LocationDetails from "../components/locationDetails";
// singleSelectionActions;

const useStyles = makeStyles(() => ({
  datePicker: {
    width: "100%",
  },
}));

// let noError;

const JobseekerProfileFormBasicD = () => {
  let noError;

  const locationPopupDetails = useSelector(
    (state) => state.singleSelectionRd.currentLocation
  );
  const Lang = useSelector((state) => state.formDetailsRd.candidateLanguage);

  const [showError, setShowError] = useState({
    name: false,
    initial: false,
    dob: false,
    gender: false,
    location: false,
  });

  const basicDetails = useSelector((state) => state.formDetailsRd.basicDetails);

  const candidateNumber = useSelector(
    (state) => state.formDetailsRd.candidateNumber.val
  );

  const Dispatch = useDispatch();

  // console.log(locationPopupDetails);
  const [dOBInputDateTimePickerValue, setDOBInputDateTimePickerValue] =
    useState(null);
  const navigate = useNavigate();

  const classes = useStyles();

  // basic details form validation functions

  // useEffect(() => {
  //   basicDetailFormValidate();
  // }, [basicDetails]);

  const minDate = new Date(); // Set your minimum date here
  const maxDate = new Date(); // Set your maximum date here
  minDate.setFullYear(minDate.getFullYear() - 50); // Subtract 500 years from the current year
  maxDate.setFullYear(maxDate.getFullYear() - 18); // Subtract 18 years from the current year

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

  const basicDetailFormValidate = () => {
    noError = 0;

    if (basicDetails.name.val == "") {
      noError++;

      Dispatch(
        formValidationActions.validateBasicDetails({ key: "name", error: true })
      );
    } else {
      const value = basicDetails.name.val;

      if (alphabetWithDotTest(value)) {
        Dispatch(
          formValidationActions.validateBasicDetails({
            key: "name",
            error: false,
          })
        );
      } else {
        noError++;
        Dispatch(
          formValidationActions.validateBasicDetails({
            key: "name",
            error: true,
          })
        );
      }
    }

    if (basicDetails.initial.val == "") {
      noError++;

      Dispatch(
        formValidationActions.validateBasicDetails({
          key: "initial",
          error: true,
        })
      );
    } else {
      const value = basicDetails.initial.val;

      if (alphabetWithDotTest(value)) {
        Dispatch(
          formValidationActions.validateBasicDetails({
            key: "initial",
            error: false,
          })
        );
      } else {
        noError++;
        Dispatch(
          formValidationActions.validateBasicDetails({
            key: "initial",
            error: true,
          })
        );
      }
    }

    if (basicDetails.gender.val == "") {
      noError++;
      Dispatch(
        formValidationActions.validateBasicDetails({
          key: "gender",
          error: true,
        })
      );
    } else {
      Dispatch(
        formValidationActions.validateBasicDetails({
          key: "gender",
          error: false,
        })
      );
    }
    if (basicDetails.dob.val == null) {
      noError++;
      Dispatch(
        formValidationActions.validateBasicDetails({ key: "dob", error: true })
      );
    } else {
      Dispatch(
        formValidationActions.validateBasicDetails({ key: "dob", error: false })
      );
    }

    if (basicDetails.contactNumber.val == "") {
      noError++;

      Dispatch(
        formValidationActions.validateBasicDetails({
          key: "contactNumber",
          error: true,
        })
      );
    } else {
      const regex = /^[0-9]+$/;
      const value = basicDetails.contactNumber.val;

      if (regex.test(value) && value.length == 10) {
        Dispatch(
          formValidationActions.validateBasicDetails({
            key: "contactNumber",
            error: false,
          })
        );
      } else {
        noError++;
        Dispatch(
          formValidationActions.validateBasicDetails({
            key: "contactNumber",
            error: true,
          })
        );
      }
    }

    if (basicDetails.currentLocation.val == "") {
      noError++;
      Dispatch(
        formValidationActions.validateBasicDetails({
          key: "currentLocation",
          error: true,
        })
      );
    } else {
      Dispatch(
        formValidationActions.validateBasicDetails({
          key: "currentLocation",
          error: false,
        })
      );
      // setShowError((prev) => ({ ...prev, location: false }));
    }
  };

  // end of form validation

  // const onFormSubmitButtonClick = (e) => {
  //   e.preventDefault();
  //   basicDetailFormValidate();

  //   if (noError != 0) return false;

  //   UpdateBasicDetails(basicDetails, candidateNumber);
  //   navigate(`/jobseeker-profileformeducation-details?MN=${candidateNumber}`);
  // };
  let allowNavigation = true;

  const onFormSubmitButtonClick = async (e) => {
    e.preventDefault();
    basicDetailFormValidate();

    if (noError !== 0) return false;

    try {
      await UpdateBasicDetails(basicDetails, candidateNumber).then((data) => {
        if (data.statusCode == 400) {
          alert("This number is already registered");
          return;
        } else if (data.statusCode == 200) {
          console.log("Data:", data);
          if (allowNavigation) {
            navigate(
              `/jobseeker-profileformeducation-details?MN=${candidateNumber}`
            );
          }
          return;
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function handlelocationPopup() {
    // to open location popup
    Dispatch(singleSelectionActions.showCurLocation(true));
  }

  function handleInput(e) {
    // to update state if user inputs

    let name = e.target.name;
    let value = e.target.value;
    let showErr = e.target.value != "" && e.target.value != null;

    Dispatch(
      formValidationActions.setBasicDetails({
        key: name,
        value: value,
        error: !showErr,
      })
    );
    // to remove error
    Dispatch(
      formValidationActions.validateBasicDetails({ key: name, error: !showErr })
    );
  }

  function handleInputs(e) {
    // to update state if user inputs

    let initial = e.target.initial;
    let value = e.target.value;
    let name = basicDetails.name.val; // Assuming you have access to the other field's value
    let showErr = value.trim() === "" && name.trim() === "";

    Dispatch(
      formValidationActions.setBasicDetails({
        key: initial,
        value: value,
        error: showErr,
      })
    );

    // to remove error
    Dispatch(
      formValidationActions.validateBasicDetails({
        key: initial,
        error: showErr,
      })
    );
  }

  function handleInputs(e) {
    // to update state if user inputs

    let initial = e.target.initial;
    let value = e.target.value;
    let showErr = e.target.value != "" && e.target.value != null;

    Dispatch(
      formValidationActions.setBasicDetails({
        key: initial,
        value: value,
        error: !showErr,
      })
    );
    // to remove error
    Dispatch(
      formValidationActions.validateBasicDetails({
        key: initial,
        error: !showErr,
      })
    );
  }

  function handleDob(val) {
    let showErr = val != "" && val != null;
    // console.log(convertDateYYYYMMDD(val));

    convertDateYYYYMMDD(val);

    Dispatch(
      formValidationActions.setBasicDetails({
        key: "dob",
        value: val,
      })
    );

    // to remove error
    Dispatch(
      formValidationActions.validateBasicDetails({
        key: "dob",
        error: !showErr,
      })
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.jobseekerProfileFormBasicD}>
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
          <form className={styles.basicDetailsForm}>
            <div className={styles.formFields}>
              <div className={styles.formFields1}>
                <div className={styles.formHeading}>
                  <div className={styles.basicDetails}>
                    {translate.basicDetails[Lang]}
                  </div>
                  <div className={styles.formHeadingInner}>
                    <div className={styles.frameChild} />
                  </div>
                </div>
                <div className={styles.inputFields}>
                  <div className={styles.nameDobFields}>
                    <div className="row">
                      <div className="col-sm-8 mt-3">
                        <TextField
                          className={styles.nameInput}
                          error={basicDetails.name.err}
                          color="primary"
                          fullWidth
                          variant="outlined"
                          type="text"
                          name="name"
                          label={translate.name[Lang]}
                          placeholder={translate.enterYourName[Lang]}
                          size="medium"
                          inputProps={{ maxLength: 50, autoCapitalize: "on" }}
                          margin="none"
                          helperText={
                            basicDetails.name.err
                              ? `${translate.OnlyAlphabetsAreAllowed[Lang]}`
                              : ""
                          }
                          value={basicDetails.name.val}
                          onChange={(e) => {
                            handleInput(e);
                          }}
                        />
                      </div>
                      <div className="col-sm-4 mt-3">
                        <TextField
                          className={styles.nameInput}
                          error={basicDetails.initial.err}
                          color="primary"
                          fullWidth
                          variant="outlined"
                          type="text"
                          name="initial"
                          label={translate.FatherName[Lang]}
                          placeholder={translate.FatherName[Lang]}
                          size="medium"
                          inputProps={{ maxLength: 45, autoCapitalize: "on" }}
                          margin="none"
                          helperText={
                            basicDetails.initial.err
                              ? `${translate.AlphabetsAllowed[Lang]}`
                              : ""
                          }
                          value={basicDetails.initial.val}
                          onChange={(e) => {
                            handleInput(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.dobInput}>
                      <DatePicker
                        format="dd/MM/yyyy"
                        minDate={minDate}
                        maxDate={maxDate}
                        className={classes.datePicker}
                        label={`${translate.dateOfBirth[Lang]} (DD/MM/YYYY)`}
                        value={
                          basicDetails.dob.val != null
                            ? new Date(basicDetails.dob.val)
                            : null
                        }
                        name="dob"
                        disableFuture
                        onChange={(val) => {
                          handleDob(val);
                        }}
                        slotProps={{
                          textField: {
                            error: basicDetails.dob.err,
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.genderAndCurrentLocationFi}>
                    <div className={styles.genderRadioGroup}>
                      {/* <div className={styles.gender}>Gender</div> */}
                      <div className={`${styles.genderRow}`}>
                        <FormControl>
                          <FormLabel
                            className={styles.gender}
                            error={basicDetails.gender.err}
                            id="demo-radio-buttons-group-label"
                          >
                            {translate.gender[Lang]}
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="gender"
                            error={basicDetails.gender.err}
                          >
                            <FormControlLabel
                              value="Male"
                              control={<Radio />}
                              onChange={(e) => {
                                handleInput(e);
                              }}
                              checked={basicDetails.gender.val.includes("Male")}
                              label={
                                <div
                                  className={styles.maleToiletSvgrepoComParent}
                                >
                                  <img
                                    className={styles.maleToiletSvgrepoComIcon}
                                    alt=""
                                    src="/maletoiletsvgrepocom.svg"
                                  />
                                  <div className={styles.male}>
                                    {translate.male[Lang]}
                                  </div>
                                </div>
                              }
                            />
                            <FormControlLabel
                              value="Female"
                              control={<Radio />}
                              onChange={(e) => {
                                handleInput(e);
                              }}
                              checked={basicDetails.gender.val.includes(
                                "Female"
                              )}
                              label={
                                <div
                                  className={styles.maleToiletSvgrepoComParent}
                                >
                                  <img
                                    className={styles.maleToiletSvgrepoComIcon}
                                    alt=""
                                    src="/femaletoiletsvgrepocom.svg"
                                  />
                                  <div className={styles.female}>
                                    {translate.female[Lang]}
                                  </div>
                                </div>
                              }
                            />
                            <FormControlLabel
                              value="Prefer not to say"
                              control={<Radio />}
                              onChange={(e) => {
                                handleInput(e);
                              }}
                              checked={basicDetails.gender.val.includes(
                                "Prefer not to say"
                              )}
                              label={
                                <div
                                  className={
                                    styles.transgenderSvgrepoCom1Parent
                                  }
                                >
                                  <img
                                    className={styles.maleToiletSvgrepoComIcon}
                                    alt=""
                                    src="/transgendersvgrepocom-1.svg"
                                  />
                                  <div className={styles.preferNotTo}>
                                    {translate.preferNotToSay[Lang]}
                                  </div>
                                </div>
                              }
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>

                    <TextField
                      onClick={() => {
                        handlelocationPopup();
                      }}
                      value={
                        locationPopupDetails.city != ""
                          ? `${locationPopupDetails.city}, ${locationPopupDetails.state}`
                          : ""
                      }
                      error={basicDetails.currentLocation.err}
                      name="jobseekerCurrentLocation"
                      color="primary"
                      label={translate.currentLocation[Lang]}
                      variant="outlined"
                      placeholder="e.g., Chennai, Tamil Nadu"
                      helperText=""
                      fullWidth
                      multiline
                    />

                    <TextField
                      className={styles.nameInput}
                      error={basicDetails.contactNumber.err}
                      color="primary"
                      variant="outlined"
                      type="tel"
                      autoComplete="tel"
                      name="contactNumber"
                      label={translate.enterYourMobileNumber[Lang]}
                      placeholder={translate.enterYourMobileNumber[Lang]}
                      size="medium"
                      margin="none"
                      inputProps={{ maxLength: 10 }}
                      helperText={
                        basicDetails.contactNumber.err
                          ? `${translate.pleaseEnterValidNumber[Lang]}`
                          : ""
                      }
                      value={basicDetails.contactNumber.val}
                      onChange={(e) => {
                        handleInput(e);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.bottomNavBtn}>
                <div className={styles.back}>Back</div>
                <button
                  className={styles.formSubmitButton}
                  onClick={(e) => {
                    onFormSubmitButtonClick(e);
                  }}
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
        {/* popup ///////// */}
        <div>
          <ScrollDialog
            title={translate.selectCityState[Lang]}
            open={locationPopupDetails.show}
          >
            <LocationDetails />
          </ScrollDialog>
        </div>
        {/* end of popup ///////// */}
      </div>
    </LocalizationProvider>
  );
};

export default JobseekerProfileFormBasicD;
