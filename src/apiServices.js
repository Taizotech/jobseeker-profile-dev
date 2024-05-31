import {
  BaseUrl,
  calcAge,
  capitalizeWords,
  convertDateYYYYMMDD,
  middleUrl,
  toTitleCase,
} from "./utility";

import { useSelector } from "react-redux";
import { formValidationActions } from "./redux-store/store";

export async function GetkeySkills() {
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(`${BaseUrl}/keySkills`, reqObj);
  const data = await response.json();

  return data;
}

// to get Courses details
export async function GetCourses() {
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(`${BaseUrl}/certificateCourses`, reqObj);
  const data = await response.json();

  return data;
}

// to get language details
export async function Getlanguages() {
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(`${BaseUrl}/languages`, reqObj);
  const data = await response.json();

  return data;
}

// to get state details
export async function GetStates() {
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(`${BaseUrl}/indiaStates`, reqObj);
  const data = await response.json();

  return data;
}

// to get cities details
export async function GetCities(State_id) {
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(
    `${BaseUrl}/indiaStateCities?state_id=${State_id}`,
    reqObj
  );
  const data = await response.json();

  return data;
}

// to preferred cities details
export async function GetPreferredCities() {
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(
    `${BaseUrl}/webEmployer/cities?state_id=0`,
    reqObj
  );
  const data = await response.json();

  return data;
}

// to get Industry details
export async function GetIndustry() {
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(`${BaseUrl}/jobIndustries`, reqObj);
  const data = await response.json();

  return data;
}

export async function GetJobRoles(Industry_id) {
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(
    `${BaseUrl}/fullTimeJobRoless?industry_id=${Industry_id}`,
    reqObj
  );
  const data = await response.json();

  return data;
}

export async function GetCandidateSources() {
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(`${BaseUrl}/candidatesources`, reqObj);
  const data = await response.json();

  return data;
}

export async function GetRegStatus(mobileNumber) {
  // to get registration details

  const reqObj = {
    method: "GET",
  };
  const response = await fetch(
    `${BaseUrl}/chatbot/registeredStatus?phone_number=${mobileNumber}`,
    reqObj
  );
  const data = await response.json();
  return data;
}

export async function GetProfileStage(mobileNumber) {
  // to get profile stage details

  const reqObj = {
    method: "GET",
  };
  const response = await fetch(
    `${BaseUrl}/chatbot/candidateProfileStage?phone_number=${mobileNumber}`,
    reqObj
  );
  const data = await response.json();

  return data;
}

export async function GetDepartments(endUrl) {
  // to get candidate registration status
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(`${BaseUrl}/${endUrl}`, reqObj);
  const data = await response.json();

  return data;
}

// export async function UpdateBasicDetails(details, canNumber) {
//   // to update basic details
//   // console.log(details);

//   let myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   let Obj = {
//     age: calcAge(details.dob.val),
//     city: details.currentLocation.val.split(", ")[0],
//     dateOfBirth: convertDateYYYYMMDD(details.dob.val),
//     gender: details.gender.val,
//     name: toTitleCase(details.name.val.trim()), // to convert first letter to capital
//     lastName: details.initial.val,
//     state: details.currentLocation.val.split(", ")[1],
//     contactNumber: parseInt(details.contactNumber.val),
//   };
//   const reqObj = {
//     method: "PUT",
//     headers: myHeaders,
//     body: JSON.stringify(Obj),
//     redirect: "follow",
//   };
//   const response = await fetch(
//     `${BaseUrl}/${middleUrl()}/updateBasicDetails?mobileNumber=${canNumber}`,
//     reqObj
//   );

//   if (response.statusCode == 400) {
//     alert("Already Registered");
//     return;

//     // Stop further execution
//   } else {
//     alert("hiiii");
//   }
//   const data = await response.json();
//   console.log("ghsgdh", data);
//   return data;
// }
export async function UpdateBasicDetails(details, canNumber) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let Obj = {
    age: calcAge(details.dob.val),
    city: details.currentLocation.val.split(", ")[0],
    dateOfBirth: convertDateYYYYMMDD(details.dob.val),
    gender: details.gender.val,
    name: toTitleCase(details.name.val.trim()),
    lastName: details.initial.val,
    state: details.currentLocation.val.split(", ")[1],
    contactNumber: parseInt(details.contactNumber.val),
  };

  const reqObj = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(Obj),
    redirect: "follow",
  };

  const response = await fetch(
    `${BaseUrl}/${middleUrl()}/updateBasicDetails?mobileNumber=${canNumber}`,
    reqObj
  );

  const data = await response.json();
  return data;
}

export async function UpdateEducationDetails(details, candidateNumber) {
  // to update education details details
  // console.log(details);

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let Obj = {
    isHavingArrear:
      details.doYouHaveArrears.val != "" && details.doYouHaveArrears.val != null
        ? details.doYouHaveArrears.val
        : null,

    passed_out_year:
      details.completionYear.val != null && details.completionYear.val != ""
        ? new Date(details.completionYear.val).getFullYear()
        : null,
    qualification:
      details.eduQualification.val != null && details.eduQualification.val != ""
        ? details.eduQualification.val
        : null,
    specification:
      details.department.val != null && details.department.val != ""
        ? details.department.val
        : null,
    student:
      details.areYouStudent.val != null && details.areYouStudent.val != ""
        ? details.areYouStudent.val
        : null,
  };
  const reqObj = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(Obj),
    redirect: "follow",
  };

  const response = await fetch(
    `${BaseUrl}/${middleUrl()}/updateEducationDetails?mobileNumber=${candidateNumber}`,
    reqObj
  );
  const data = await response.json();

  return data;
}

export async function UpdateWorkDetails(details, candidateNumber) {
  // to update work details details
  // console.log(details);

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let Obj = {
    expInManufacturing: details.DoYouHaveExperience.val,
    expMonths:
      details.monthsOfExperience.val != null &&
      details.monthsOfExperience.val != ""
        ? details.monthsOfExperience.val.replace(/\D/g, "")
        : null,
    expYears:
      details.yearsOfExperience.val != null &&
      details.yearsOfExperience.val != ""
        ? details.yearsOfExperience.val.replace(/\D/g, "")
        : null,
    // experienced: false,
    industry:
      details.industry.val != null && details.industry.val != ""
        ? details.industry.val
        : null,
    jobCategory:
      details.interestedJobRole.val != null &&
      details.interestedJobRole.val != ""
        ? details.interestedJobRole.val
        : null,
    pfEsiAccount:
      details.PfAccount.val != null && details.PfAccount.val != ""
        ? details.PfAccount.val
        : null,
    prefLocation:
      details.preferredLocations.val.city != null &&
      details.preferredLocations.val.city != ""
        ? details.preferredLocations.val.city
        : null,
    prefArea:
      details.preferredLocations.val.area != null &&
      details.preferredLocations.val.area != ""
        ? details.preferredLocations.val.area
        : null,
  };
  const reqObj = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(Obj),
    redirect: "follow",
  };

  const response = await fetch(
    `${BaseUrl}/${middleUrl()}/updateWorkDetails?mobileNumber=${candidateNumber}`,
    reqObj
  );
  const data = await response.json();

  return data;
}

export async function UpdateOtherDetails(details, canNumber) {
  // to update basic details
  // console.log(details);

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let Obj = {
    courses:
      details.courses.val != "" && details.courses.val != null
        ? details.courses.val.join(", ")
        : null,
    keySkill:
      details.keySkills.val != "" && details.keySkills.val != null
        ? details.keySkills.val.join(", ")
        : null,
    knownLanguages:
      details.languageCode.val != "" && details.languageCode.val != null
        ? details.languageCode.val
        : null,
    reference:
      details.referrence.val != "" && details.referrence.val != null
        ? details.referrence.val
        : null,
  };
  const reqObj = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(Obj),
    redirect: "follow",
  };
  let url;

  let adminId = localStorage.getItem("adminId");

  if (adminId) {
    url = `${BaseUrl}/admin/updateOtherDetails?mobileNumber=${canNumber}&adminId=${adminId}`;
  } else {
    url = `${BaseUrl}/chatbot/updateOtherDetails?mobileNumber=${canNumber}`;
  }
  const response = await fetch(url, reqObj);
  const data = await response.json();

  return data;
}

export async function UpdateProfileDetails(file, canNumber) {
  // to update basic details
  // console.log(file);

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const formData = new FormData();
  formData.append("file", file);
  const reqObj = {
    method: "PUT",
    body: formData,
    redirect: "follow",
  };
  const response = await fetch(
    `${BaseUrl}/${middleUrl()}/updateUserProfilePic?mobileNumber=${canNumber}`,
    reqObj
  );
  const data = await response.json();

  return data;
}

// var formdata = new FormData();
// formdata.append("file", fileInput.files[0], "/C:/Users/vc/Pictures/Camera Roll/WIN_20230602_14_49_48_Pro.jpg");

// var requestOptions = {
//   method: 'PUT',
//   body: formdata,
//   redirect: 'follow'
// };

// fetch("https://dev.taizo.in/chatbot/resumeUpload?candidateId=4&file", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

export async function UpdateResumeUpload(file, candidateNumber) {
  // to update basic details
  // console.log(file);

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const formData = new FormData();
  formData.append("file", file);
  const reqObj = {
    method: "PUT",
    body: formData,
    redirect: "follow",
  };
  const response = await fetch(
    `${BaseUrl}/${middleUrl()}/resumeUpload?mobileNumber=${candidateNumber}`,
    reqObj
  );
  const data = await response.json();

  return data;
}

export async function GetAssignToAreas(id) {
  try {
    // to get profile stage details
    const reqObj = {
      method: "GET",
    };

    const response = await fetch(
      `${BaseUrl}/chatbot/assignArea?cityId=${id}`,
      reqObj
    );

    if (!response.ok) {
      // If the response status is not in the range 200-299, consider it an error
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in GetAssignToAreas API:", error.message);
    // You can choose to throw the error again or handle it gracefully
    throw error;
  }
}

export async function getcandidateDetails(id) {
  console.log(BaseUrl);
  if (id != 0) {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `${BaseUrl}/webEmployer/candidate/${id}`,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    return data;
  }
}

// mid Senior Category

export async function postMidSeniorBasicDetails(obj, adminId) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    adminId: adminId,
    firstName: capitalizeWords(obj.name.value),
    lastName: obj.initial.value,
    emailId: obj.emailId.value,
    mobileNumber: obj.mobileNumber.value,
    educationalQualification: capitalizeWords(
      obj.educationalQualification.value
    ),
    prefJobLocation: capitalizeWords(obj.jobLocation.value),
    whatsappNumber: obj.whatsappNumber.value,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BaseUrl}/admin/basicMidLevelLead`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    localStorage.setItem("midSeniorMobileNumber", obj.mobileNumber.value);
    return data;
  } catch (error) {
    console.error("Error in postMidSeniorCatogoryBasicDetails API:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function postMidSeniorWorkDetails(obj) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let mobileNumber = localStorage.getItem("midSeniorMobileNumber");

  function getInt(value) {
    if (value) {
      return parseInt(value, 10);
    } else {
      return 0;
    }
  }

  var raw = JSON.stringify({
    mobileNumber: mobileNumber,
    expInManufacturing: obj.hasExperience.value == "yes",
    expInYears: getInt(obj.expYears.value),
    expInMonths: getInt(obj.expMonths.value),
    jobCategory: obj.jobCategory.value
      ? capitalizeWords(obj.jobCategory.value)
      : null,
    isCurrentlyWorking: obj.currentlyWorking.value == "yes",
    noticePeriod: obj.noticePeriod.value,
    expectedSalary: obj.expected.value,
    currentSalary: obj.current.value,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BaseUrl}/admin/workDetailsMidLevelLead`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error in postMidSeniorCatogoryBasicDetails API:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function UploadMidSeniorResume(file, Linkedin) {
  // to update basic details
  // console.log(file);

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const formData = new FormData();
  formData.append("file", file);

  const reqObj = {
    method: "PUT",
    body: formData,
    redirect: "follow",
  };

  let mobileNumber = localStorage.getItem("midSeniorMobileNumber");

  try {
    const response = await fetch(
      `${BaseUrl}/admin/updateProfileResumeMidSenior?mobileNumber=${mobileNumber}&linkedinUrl=${Linkedin}`,
      reqObj
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`HTTP error! Status: ${error}`);
  }
}

export async function GetMidSeniorDetails(mobileNumber) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const reqObj = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BaseUrl}/admin/regStatusMidSenior?mobileNumber=${mobileNumber}`,
      reqObj
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`HTTP error! Status: ${error}`);
  }
}

export async function postMidSeniorReportGeneration(formData, mobileNumber) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    titles: formData.candidates || "",
    age: formData.age || 0,
    candidateName: formData.candidateName || "",
    certifications: formData.certifications || "",
    coreSkillSetMatchingJd: formData.coreSkillSetMatchingJd || "",
    lookingFor: formData.lookingFor || "",
    previousDesignation: formData.previousDesignation || "",
    qualification: formData.qualification || "",
    skills: formData.skills || "",
    taizoScore: formData.taizoScore || "",
    taizoSuggestion: formData.taizosSuggestion || "",
    yearsOfExperience: formData.yearsOfExperience || "",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BaseUrl}/admin/reportGenerationMidSenior?mobileNumber=${mobileNumber}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error in postMidSeniorCatogoryBasicDetails API:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
