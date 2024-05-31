import { Autocomplete, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import styles from "./jobseeker-profile-form-basic-d.module.css";
import style from "./basicDetails.module.css";
import {
  emailRegex,
  alphabetWithDotTest,
  numbersOnlyTest,
  translate,
} from "../../../utility";
import { useState } from "react";
import {
  GetMidSeniorDetails,
  GetPreferredCities,
  postMidSeniorBasicDetails,
} from "../../../apiServices";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PortalPopup from "../../../components/portal-popup";
import UnauthorizedContent from "../../../components/unathoriszed";
import RegisteredAlready from "../components/alreadyRegistered";
import debounce from "lodash/debounce";

const BasicDetailsForm = () => {
  const emailRegexer = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const Lang = "en";

  const navigate = useNavigate();

  const [adminId, setAdminId] = useState("");

  const [usedFor, setUsedFor] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [showRegistered, setShowRegistered] = useState(false);

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let fromAdminId = params.get("from_id");
    let usedFor = params.get("for");
    setAdminId(fromAdminId);
    setUsedFor(usedFor);

    if (usedFor == "linkedin") {
      localStorage.setItem("midSeniorUsedFor", usedFor);
    } else {
      localStorage.removeItem("midSeniorUsedFor");
    }

    localStorage.setItem("midSeniorFromAdminId", fromAdminId);
    if (!fromAdminId) {
      navigate("/unauthorizedUser");
    }
  }, []);

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
      // navigate("/candidate-basic-details?from_id=1");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: {
      value: "",
      error: "",
    },
    initial: {
      value: "",
      error: "",
    },
    mobileNumber: {
      value: "",
      error: "",
    },
    whatsappNumber: {
      value: "",
      error: "",
    },
    emailId: {
      value: "",
      error: "",
    },
    jobLocation: {
      value: "",
      error: "",
    },
    educationalQualification: {
      value: "",
      error: "",
    },
  });

  const validateInput = (field) => {
    let errors = ""; // Use let instead of const
    switch (field) {
      case "name":
        if (!formData.name.value) errors = "Name is required.";
        break;
      case "initial":
        if (!formData.initial.value) errors = "Initial is required.";
        break;
      case "mobileNumber":
        if (!formData.mobileNumber.value) errors = "Mobile number is required.";
        if (formData.mobileNumber.value.length != 10)
          errors = "Invalid mobile number.";
        break;
      case "whatsappNumber":
        if (!formData.whatsappNumber.value)
          errors = "Mobile whatsapp is required.";
        if (formData.whatsappNumber.value.length != 10)
          errors = "Invalid whatsapp number.";
        break;
      case "emailId":
        if (!formData.emailId.value) errors = "Email Id is required.";
        break;
      case "jobLocation":
        if (!formData.jobLocation.value) errors = "Job location is required.";
        break;
      case "educationalQualification":
        if (!formData.educationalQualification.value)
          errors = "Educational Qualification is required.";
        break;
      default:
        break;
    }
    const updatedFormData = { ...formData };
    updatedFormData[field].error = errors; // Corrected this line
    setFormData(updatedFormData);
  };

  useEffect(() => {
    GetPreferredCities()
      .then((data) => {
        setCities(data.data.map((el) => el.city));
      })
      .catch((err) => {
        alert("Something Went Wrong" + err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // validateInput(name);

    if (name === "mobileNumber" && !numbersOnlyTest(value)) {
      // Handle invalid mobile number
      console.log("Invalid mobile number.");
      return;
    }

    if (name === "whatsappNumber" && !numbersOnlyTest(value)) {
      // Handle invalid mobile number
      console.log("Invalid  number.");
      return;
    }
    // if (name === "emailId"(value)) {
    //   // Handle invalid emailId
    //   console.log("Invalid emailId");
    //   return;
    // }
    // !emailRegexer.test(value)
    if (name === "name" && !alphabetWithDotTest(value)) {
      // Handle invalid mobile number
      console.log("Invalid name");
      return;
    }

    if (name === "initial" && !alphabetWithDotTest(value)) {
      // Handle invalid mobile number
      console.log("Invalid name");
      return;
    }

    if (name === "educationalQualification" && !alphabetWithDotTest(value)) {
      // Handle invalid mobile number
      console.log("Invalid name");
      return;
    }

    // if (name == "whatsappNumber" || name == "mobileNumber") {
    //   debouncedCheckRegisterStatus(value);
    // }

    // Update the form data with the new input value
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: {
        ...prevFormData[name],
        value,
        error: "",
      },
    }));
  };

  // function debouncedCheckRegisterStatus(data) {
  //   // Create a debounced version of the function
  //   function debouncedFunction() {
  //     debounce(() => {
  //       GetMidSeniorDetails(data)
  //         .then(() => {
  //           // setShowRegistered;
  //           console.log("helo");
  //         })
  //         .catch(() => {
  //           setShowRegistered(true);
  //         });
  //     }, 1000);
  //   }

  //   // Invoke the debounced function
  //   debouncedFunction();
  // }

  useEffect(() => {
    if (formData.whatsappNumber.value.length == 10) {
      GetMidSeniorDetails(formData.whatsappNumber.value)
        .then((data) => {
          if (data.data.registered) {
            setShowRegistered(true);
          }
        })
        .catch(() => {
          setShowRegistered(false);
        });
    } else {
    }
  }, [formData.whatsappNumber.value]);

  useEffect(() => {
    if (formData.mobileNumber.value.length == 10) {
      GetMidSeniorDetails(formData.mobileNumber.value)
        .then((data) => {
          if (data.data.registered) {
            setShowRegistered(true);
          }
        })
        .catch(() => {
          setShowRegistered(false);
        });
    }
  }, [formData.mobileNumber.value]);

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
    // validateInput();

    Object.keys(formData).forEach(validateInput);
    const emailField = formData.emailId;
    if (!emailRegexer.test(emailField.value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        emailId: {
          ...prevFormData.emailId,
          error: "Invalid email Id",
        },
      }));
      return;
    }
    if (Object.values(formData).some((field) => field.error !== "")) return; // Corrected this line

    // Submit form data
    console.log("Form submitted successfully!", formData);
    try {
      setIsLoading(true);
      if (!isLoading) {
        postMidSeniorBasicDetails(formData, adminId)
          .then((res) => {
            navigate("/candidate-work-details");
          })
          .catch(() => {
            alert("Something went wrong");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      alert("Something went wrong");
      setIsLoading(false);
    }
  };

  // ... remaining code ...

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
                    {translate.basicDetails[Lang]}
                  </div>
                  <div className={styles.formHeadingInner}>
                    <div className={styles.frameChild} />
                  </div>
                </div>
                <div className={style.formContainer}>
                  {/* <TextField
                    className={style.textField}
                    id="outlined-basic"
                    label={"Name"}
                    value={formData.name.value}
                    error={!!formData.name.error}
                    helperText={formData.name.error}
                    inputProps={{ maxLength: 45 }}
                    name="name"
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    required
                    placeholder={"Name"}
                  />

                  <TextField
                    className={style.textField}
                    id="outlined-basic"
                    label={"Initial"}
                    value={formData.initial.value}
                    error={!!formData.initial.error}
                    helperText={formData.initial.error}
                    inputProps={{ maxLength: 5 }}
                    name="initial"
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    required
                    placeholder={"Initial"}
                  /> */}
                  <div className="row">
                    <div className="col-md-8">
                      {/* Name TextField */}
                      <TextField
                        className={style.textField}
                        id="outlined-basic"
                        label={"Name"}
                        value={formData.name.value}
                        error={!!formData.name.error}
                        helperText={formData.name.error}
                        inputProps={{ maxLength: 45 }}
                        name="name"
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        required
                        placeholder={"Name"}
                      />
                    </div>
                    <div className="col-md-4">
                      {/* Initial TextField */}
                      <TextField
                        className={style.textField}
                        id="outlined-basic"
                        label={"Father Name"}
                        value={formData.initial.value}
                        error={!!formData.initial.error}
                        helperText={formData.initial.error}
                        inputProps={{ maxLength: 45 }}
                        name="initial"
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        required
                        placeholder={"FatherName"}
                      />
                    </div>
                  </div>

                  <TextField
                    className={style.textField}
                    id="outlined-basic"
                    label={"Educational Qualification"}
                    value={formData.educationalQualification.value}
                    error={!!formData.educationalQualification.error}
                    helperText={formData.educationalQualification.error}
                    inputProps={{ maxLength: 100 }}
                    type="text"
                    variant="outlined"
                    name="educationalQualification"
                    onChange={handleInputChange}
                    fullWidth
                    required
                    placeholder={"e.g. B.E Mechanical Engineer"}
                  />

                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    name="jobLocation"
                    options={cities}
                    onChange={(e, val) => {
                      handleAutoCompleteChange(val, "jobLocation");
                    }}
                    //   sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Preferred Job Location"
                        placeholder={"e.g. Chennai, Coimbatore"}
                        error={!!formData.jobLocation.error}
                        helperText={formData.jobLocation.error}
                      />
                    )}
                  />

                  {/* <TextField
                    className={style.textField}
                    id="outlined-basic"
                    label={"Preferred Job Location"}
                    variant="outlined"
                    inputProps={{ maxLength: 75 }}
                    value={formData.jobLocation.value}
                    error={!!formData.jobLocation.error}
                    helperText={formData.jobLocation.error}
                    name="jobLocation"
                    onChange={handleInputChange}
                    fullWidth
                    required
                    placeholder={"e.g. Chennai, Coimbatore"}
                  /> */}

                  <TextField
                    className={style.textField}
                    id="outlined-basic"
                    label={"Mobile Number"}
                    value={formData.mobileNumber.value}
                    error={!!formData.mobileNumber.error}
                    helperText={formData.mobileNumber.error}
                    inputProps={{ maxLength: 10 }}
                    type="text"
                    variant="outlined"
                    name="mobileNumber"
                    onChange={handleInputChange}
                    fullWidth
                    required
                    placeholder={"Mobile Number"}
                  />

                  <TextField
                    className={style.textField}
                    id="outlined-basic"
                    label={"Whatsapp Number"}
                    value={formData.whatsappNumber.value}
                    error={!!formData.whatsappNumber.error}
                    helperText={formData.whatsappNumber.error}
                    inputProps={{ maxLength: 10 }}
                    type="text"
                    variant="outlined"
                    name="whatsappNumber"
                    onChange={handleInputChange}
                    fullWidth
                    required
                    placeholder={"Whatsapp Number"}
                  />
                  <TextField
                    className={style.textField}
                    id="outlined-basic"
                    label={"emailId"}
                    value={formData.emailId.value}
                    error={!!formData.emailId.error}
                    helperText={formData.emailId.error}
                    // inputProps={{ maxLength: 10 }}
                    variant="outlined"
                    name="emailId"
                    onChange={handleInputChange}
                    fullWidth
                    required
                    placeholder={"Email Id"}
                  />
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

        {showRegistered && (
          <>
            <PortalPopup
              overlayColor="rgba(40, 40, 40, 0.8)"
              placement="Centered"
            >
              <div>
                <RegisteredAlready />
              </div>
            </PortalPopup>
          </>
        )}
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
