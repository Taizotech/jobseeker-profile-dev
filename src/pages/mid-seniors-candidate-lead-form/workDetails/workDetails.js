import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";

import styles from "../basicDetails/jobseeker-profile-form-basic-d.module.css";
import style from "../assets/commonCss.module.css";
import workDetailsStyles from "./workDetails.module.css";
import { numbersOnlyTest, translate } from "../../../utility";
import {
  GetMidSeniorDetails,
  postMidSeniorWorkDetails,
} from "../../../apiServices";
import { useNavigate } from "react-router-dom";

const BasicDetailsForm = () => {
  const Lang = "en";
  const navigate = useNavigate();

    const [usedFor, setUsedFor] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    hasExperience: {
      value: "",
      error: "",
    },
    jobCategory: {
      value: "",
      error: "",
    },
    expYears: {
      value: "",
      error: "",
    },
    expMonths: {
      value: "",
      error: "",
    },
    currentlyWorking: {
      value: "",
      error: "",
    },
    noticePeriod: {
      value: "",
      error: "",
    },
    current: {
      value: "",
      error: "",
    },
    expected: {
      value: "",
      error: "",
    },
  });


  useEffect(() => {
    let usedFor=localStorage.getItem("midSeniorUsedFor");
    if (usedFor=="linkedin") {
      setUsedFor("linkedin");
    }    
  },[])

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

  const validateInput = (field) => {
    let errors = "";
    switch (field) {
      case "hasExperience":
        if (!formData.hasExperience.value) errors = "Please select an option.";
        break;

      case "jobCategory":
        if (
          !formData.jobCategory.value &&
          formData.hasExperience.value == "yes"
        )
          errors = "Job Role is required.";
        break;

      case "expYears":
        if (!formData.expYears.value && formData.hasExperience.value == "yes") {
          errors = "Years is required.";
        }
        break;

      case "expMonths":
        if (
          !formData.expMonths.value &&
          formData.hasExperience.value == "yes"
        ) {
          errors = "Months is required.";
        }
        break;

      case "currentlyWorking":
        if (!formData.currentlyWorking.value) {
          errors = "Above  is required.";
        }
        break;

      case "noticePeriod":
        if (!formData.noticePeriod.value) {
          errors = "Notice Period Is Required.";
        }
        break;

      case "current":
        const currentSalary = formData.current.value.trim();
        if (currentSalary === "") {
          errors = "Current Salary is required.";
        } else if (currentSalary.length < 3 || currentSalary.length > 7) {
          errors = "Invalid.";
        }
        break;

      case "expected":
        const expectedSalary = formData.expected.value.trim();
        if (expectedSalary === "") {
          errors = "Expected Salary is required.";
        } else if (expectedSalary.length < 3 || expectedSalary.length > 7) {
          errors = "Invalid.";
        }
        break;

      default:
        break;
    }

    const updatedFormData = { ...formData };
    updatedFormData[field].error = errors;

    console.log(errors, updatedFormData);
    setFormData(updatedFormData);

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    if (name == "hasExperience") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        expMonths: {
          value: "",
          error: "",
        },
        expYears: {
          value: "",
          error: "",
        },
        jobCategory: {
          value: "",
          error: "",
        },
      }));
    }

    if (name === "current" && !numbersOnlyTest(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        current: {
          value: "",
          error: "",
        },
      }));
    }

    

    if (name == "expected" && !numbersOnlyTest(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        expected: {
          value: "",
          error: "",
        },
      }));
    }

    // Check if the input is numeric for "current" and "expected" fields
    if ((name === "current" || name === "expected") && !/^\d+$/.test(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: {
          value: "",
          error: "Please enter a valid number.",
        },
      }));
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: {
        ...prevFormData[name],
        value,
        error: "",
      },
    }));
  };

  const handleAutoCompleteChange = (value, name) => {
    console.log(name, value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: {
        ...prevFormData[name],
        value,
        error: "",
      },
    }));
  };

  const onFormSubmitButtonClick = (e) => {
    e.preventDefault();

    Object.keys(formData).forEach(validateInput);

    if (Object.values(formData).some((field) => field.error !== "")) return;

    // Submit form data
    console.log("Form submitted successfully!", formData);

    try {
      setIsLoading(true);
      if (!isLoading) {
        postMidSeniorWorkDetails(formData)
          .then((res) => {
            navigate("/candidate-resume-upload");
          })
          .catch(() => {
            alert("Something went wrong. Please try again later.");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      alert("Something went wrong. Please try again later.");
      setIsLoading(false);
    }
  };

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
          <form className={styles.basicDetailsForm}>
            <div className={styles.formFields}>
              <div className={styles.formFields1}>
                <div className={styles.formHeading}>
                  <div className={styles.basicDetails}>
                    {translate.WorkDetails[Lang]}
                  </div>
                  <div className={styles.formHeadingInner}>
                    <div className={styles.frameChild} />
                  </div>
                </div>
                <div className={style.formContainer}>
                  <div className={workDetailsStyles.radioButtonContainer}>
                    <div className={styles.genderRadioGroup}>
                      <FormControl>
                        <span
                          className={`${styles.gender} ${
                            formData.hasExperience.error && "text-danger"
                          } `}
                          id="demo-radio-buttons-group-label"
                        >
                          Experience in Manufacturing Industry
                        </span>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="hasExperience"
                          className="d-flex flex-row"
                          onChange={handleInputChange}
                        >
                          <FormControlLabel
                            value="yes"
                            control={<Radio />}
                            label={
                              <div
                                className={styles.maleToiletSvgrepoComParent}
                              >
                                <div className={styles.male}>
                                  {translate.yes[Lang]}
                                </div>
                              </div>
                            }
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio />}
                            label={
                              <div
                                className={styles.maleToiletSvgrepoComParent}
                              >
                                <div className={styles.female}>
                                  {translate.no[Lang]}
                                </div>
                              </div>
                            }
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>

                  {formData.hasExperience.value == "yes" && (
                    <>
                      <TextField
                        className={style.textField}
                        id="outlined-basic"
                        label={"Current Job Position"}
                        variant="outlined"
                        value={formData.jobCategory.value}
                        error={!!formData.jobCategory.error}
                        helperText={formData.jobCategory.error}
                        name="jobCategory"
                        onChange={handleInputChange}
                        fullWidth
                        required
                        placeholder={"Enter Job Role"}
                      />

                      <div className={workDetailsStyles.experienceContainer}>
                        <div className="d-grid justify-content-start my-3">
                          <span
                            className={`${styles.gender}`}
                            id="demo-radio-buttons-group-label"
                          >
                            Years of Experience
                          </span>
                        </div>

                        <div className="row d-flex justify-content-start ">
                          <div className="col-6">
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              name="expYears"
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
                              onChange={(e, val) => {
                                handleAutoCompleteChange(val, "expYears");
                              }}
                              //   sx={{ width: 300 }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Years"
                                  error={!!formData.expYears.error}
                                  helperText={formData.expYears.error}
                                />
                              )}
                            />
                          </div>
                          <div className="col-6">
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={[
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
                              ]}
                              name="expMonths"
                              onChange={(e, val) => {
                                handleAutoCompleteChange(val, "expMonths");
                              }}
                              //   sx={{ width: 300 }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Months"
                                  error={!!formData.expMonths.error}
                                  helperText={formData.expMonths.error}
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className={`${styles.genderRadioGroup} my-3`}>
                    <FormControl>
                      <span
                        className={`${styles.gender} ${
                          formData.currentlyWorking.error && "text-danger"
                        } `}
                        id="demo-radio-buttons-group-label"
                      >
                        Are you currently working?
                      </span>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="currentlyWorking"
                        className="d-flex flex-row"
                        onChange={handleInputChange}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label={
                            <div className={styles.maleToiletSvgrepoComParent}>
                              <div className={styles.male}>
                                {translate.yes[Lang]}
                              </div>
                            </div>
                          }
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label={
                            <div className={styles.maleToiletSvgrepoComParent}>
                              <div className={styles.female}>
                                {translate.no[Lang]}
                              </div>
                            </div>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="d-grid justify-content-start my-1">
                    <span
                      className={`${styles.gender}`}
                      id="demo-radio-buttons-group-label"
                    >
                      What Is Your Current Salary?
                    </span>
                  </div>
                  <div>
                    <TextField
                      className={style.textField}
                      id="outlined-basic"
                      label={"current Salary"}
                      value={formData.current.value}
                      error={!!formData.current.error}
                      helperText={formData.current.error}
                      inputProps={{ maxLength: 7 }}
                      type="text"
                      variant="outlined"
                      name="current"
                      onChange={handleInputChange}
                      fullWidth
                      required
                      placeholder={"Current Salary"}
                    />
                  </div>

                  <div className="d-grid justify-content-start my-1">
                    <span
                      className={`${styles.gender}`}
                      id="demo-radio-buttons-group-label"
                    >
                      What Is Your Expected Salary?
                    </span>
                  </div>
                  <div>
                    <TextField
                      className={style.textField}
                      id="outlined-basic"
                      label={"Expected Salary"}
                      value={formData.expected.value}
                      error={!!formData.expected.error}
                      helperText={formData.expected.error}
                      inputProps={{ maxLength: 7 }}
                      type="text"
                      variant="outlined"
                      name="expected"
                      onChange={handleInputChange}
                      fullWidth
                      required
                      placeholder={"expected Salary"}
                    />
                  </div>

                  <div className="d-grid justify-content-start my-2">
                    <span
                      className={`${styles.gender}`}
                      id="demo-radio-buttons-group-label"
                    >
                      What Is Your Current Notice Period?
                    </span>
                  </div>
                  <div>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={["1 Month", "2 Months", "3 Months"]}
                      name="noticePeriod"
                      onChange={(e, val) => {
                        handleAutoCompleteChange(val, "noticePeriod");
                      }}
                      //   sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Notice Period"
                          error={!!formData.noticePeriod.error}
                          helperText={formData.noticePeriod.error}
                        />
                      )}
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
                  <div className={styles.submit}>Next</div>
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
      </div>
    </LocalizationProvider>
  );
};

export default BasicDetailsForm;
