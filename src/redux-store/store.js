import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

//////////////////////////////////////////////

// multitple selection popup
const multiSelectionSlice = createSlice({
  name: "multiSelection",
  initialState: {
    showPopup: {
      keySkills: false,
      courses: false,
      languages: false,
      preferredLocation: false,
    },
    keySkills: [],
    courses: [],
    languages: [],
    preferredLocation: [],
  },
  reducers: {
    setKeyskills(state, actions) {
      state.keySkills = actions.payload;
    },
    setCourses(state, actions) {
      state.courses = actions.payload;
    },
    setLanguages(state, actions) {
      state.languages = actions.payload;
    },
    setPreferredLocation(state, actions) {
      state.preferredLocation = actions.payload;
    },
    showKeySkills(state, actions) {
      state.showPopup.keySkills = actions.payload;
    },
    showCourses(state, actions) {
      state.showPopup.courses = actions.payload;
    },
    showLanguages(state, actions) {
      state.showPopup.languages = actions.payload;
    },
    showPreferredLocation(state, actions) {
      state.showPopup.preferredLocation = actions.payload;
    },
  },
});

////////////////////////////////////////////////////////////////

const singleSelectionPopupSlice = createSlice({
  name: "singleSelection",
  initialState: {
    currentLocation: {
      show: false,
      city: "",
      state: "",
    },
    jobCatogory: {
      show: false,
      industry: "",
      jobRole: "",
    },
  },
  reducers: {
    showCurLocation(state, actions) {
      state.currentLocation.show = actions.payload;
    },
    showJobCatogory(state, actions) {
      state.jobCatogory.show = actions.payload;
    },
    setLocation(state, actions) {
      state.currentLocation.city = actions.payload.city;
      state.currentLocation.state = actions.payload.state;
    },
    setJobcatogory(state, actions) {
      state.jobCatogory.industry = actions.payload.industry;
      state.jobCatogory.jobRole = actions.payload.jobRole;
    },
  },
});

/////////////////////////////////////////////////////////

// full form validation slice
let initialState_formValidation = {
  candidateNumber: { val: "" },
  // candidateId: { val: "" },
  candidateLanguage: "en",
  profileFilledLoader: { show: true },
  basicDetails: {
    name: { err: false, val: "" },
    initial: { err: false, val: "" },
    dob: { err: false, val: null },
    gender: { err: false, val: "" },
    currentLocation: { err: false, val: "" },
    contactNumber: { err: false, val: "" },
    // candidateId:{err: false, val: ""},
  },
  educationDetails: {
    eduQualification: { err: false, val: "", show: true },
    department: { err: false, val: "", show: false },
    departmentOptions: { err: false, val: "", show: false },
    completionYear: { err: false, val: null, show: false },
    areYouStudent: { err: false, val: "", show: false },
    doYouHaveArrears: { err: false, val: "", show: false },
  },
  workDetails: {
    DoYouHaveExperience: { err: false, val: "", show: false },
    industry: { err: false, val: "", show: false },
    interestedJobRole: { err: false, val: "", show: false },
    yearsOfExperience: { err: false, val: "", show: false },
    monthsOfExperience: { err: false, val: "", show: false },
    preferredLocations: {
      err: false,
      val: { city: "", area: "" },
      show: false,
    },
    PfAccount: { err: false, val: "", show: false },
  },
  otherDetails: {
    keySkills: { err: false, val: "" },
    courses: { err: false, val: "" },
    knownLanguages: { err: false, val: "" },
    languageCode: { err: false, val: "" },
    referrence: { err: false, val: "" },
  },
  profilePicture: {
    photo: { err: false, val: null },
  },

  ResumeUpload: {
    photo: { err: false, val: null },
  },
};
const formValidationSlice = createSlice({
  name: "FormValidation",
  initialState: initialState_formValidation,
  reducers: {
    setProfileFilledLoader(state, actions) {
      state.profileFilledLoader.show = actions.payload;
    },
    setCandidateNumber(state, actions) {
      state.candidateNumber.val = actions.payload;
      // state.basicDetails[actions.payload.key].err = actions.payload.error;
    },
    // setcandidateId(state,actions){
    //   state.candidateId.val = actions.payload;
    // },
    setBasicDetails(state, actions) {
      state.basicDetails[actions.payload.key].val = actions.payload.value;
      // state.basicDetails[actions.payload.key].err = actions.payload.error;
    },

    validateBasicDetails(state, actions) {
      state.basicDetails[actions.payload.key].err = actions.payload.error;
    },

    setEducationDetails(state, actions) {
      state.educationDetails[actions.payload.key].val = actions.payload.value;
      if (actions.payload.value != null || actions.payload.value != "") {
        state.educationDetails[actions.payload.key].err = false;
      }
    },

    showEducationDetails(state, actions) {
      state.educationDetails["doYouHaveArrears"].show = actions.payload.arreas;
      state.educationDetails["areYouStudent"].show = actions.payload.student;
      state.educationDetails["completionYear"].show = actions.payload.year;
      state.educationDetails["department"].show = actions.payload.department;
      state.educationDetails["eduQualification"].show =
        actions.payload.education;
    },

    validateEducationDetails(state, actions) {
      state.educationDetails[actions.payload.key].err = actions.payload.error;
    },

    showWorkDetailsDetails(state, actions) {
      state.workDetails["DoYouHaveExperience"].show =
        actions.payload.doYouHaveExp;
      state.workDetails["interestedJobRole"].show = actions.payload.jobRole;
      state.workDetails["yearsOfExperience"].show = actions.payload.expYear;
      state.workDetails["preferredLocations"].show =
        actions.payload.prefLocation;
      state.workDetails["PfAccount"].show = actions.payload.PfAccount;
    },

    setWorkDetails(state, actions) {
      state.workDetails[actions.payload.key].val = actions.payload.value;
      if (actions.payload.value != null || actions.payload.value != "") {
        state.workDetails[actions.payload.key].err = false;
      }
    },
    validateWorkDetails(state, actions) {
      state.workDetails[actions.payload.key].err = actions.payload.error;
    },

    setOtherDetails(state, actions) {
      state.otherDetails[actions.payload.key].val = actions.payload.value;
      if (actions.payload.value != null || actions.payload.value != "") {
        state.otherDetails[actions.payload.key].err = false;
      }
    },

    validateOtherDetails(state, actions) {
      state.otherDetails[actions.payload.key].err = actions.payload.error;
    },

    setProfilePic(state, actions) {
      state.profilePicture[actions.payload.key].val = actions.payload.value;
    },

    setResumeUpload(state, actions) {
      state.ResumeUpload[actions.payload.key].val = actions.payload.value;
    },

    setLanguage(state, actions) {
      state.candidateLanguage = actions.payload;
    },
  },
});
// end of form validation slice

// candidate details slice
const candidateDetailsSlice = createSlice({
  name: "candidateDetails",
  initialState: {
    loginStatus: false,
    showBack: false,
  },
  reducers: {
    setLoginStatus(state, actions) {
      state.loginStatus = actions.payload;
    },
    setShowBack(state, actions) {
      state.showBack = actions.payload;
    },
  },
});
// end of candidate details slice

export const multiSelectionActions = multiSelectionSlice.actions;
export const singleSelectionActions = singleSelectionPopupSlice.actions;
export const formValidationActions = formValidationSlice.actions;
export const candidateDetailsActions = candidateDetailsSlice.actions;

const Store = configureStore({
  reducer: {
    multiSelectionRd: multiSelectionSlice.reducer,
    singleSelectionRd: singleSelectionPopupSlice.reducer,
    formDetailsRd: formValidationSlice.reducer,
    candidateDetailsRd: candidateDetailsSlice.reducer,
  },
});

export default Store;
