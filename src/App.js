import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import JobseekerProfileCreateBiodat from "./pages/jobseeker-profile-create-biodat";
import JobseekerProfileFormProfile from "./pages/jobseeker-profile-form-profile";
import JobseekerProfileFormOtherD from "./pages/jobseeker-profile-form-other-d";
import JobseekerProfileFormWorkDe from "./pages/jobseeker-profile-form-work-de";
import JobseekerProfileFormEducati from "./pages/jobseeker-profile-form-educati";
import JobseekerProfileFormBasicD from "./pages/jobseeker-profile-form-basic-d";
import JobseekerProfileFormResume from "./pages/jobseeker-profile-resume";
import NoStudents from "./pages/studentsNotAllowed";
import UnauthorizedUser from "./pages/unauthorized";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  candidateDetailsActions,
  formValidationActions,
} from "./redux-store/store";
import NotFound from "./pages/notFound";
import BioDataCreatedPopupMessage from "./components/bio-data-created-popup-message";
import JobseekerProfileResume from "./pages/jobseeker-profile-resume";
import JobseekerProfileCreateBiodata from "./pages/mid-seniors-candidate-lead-form/createBioData/createBioData";
import BasicDetailsForm from "./pages/mid-seniors-candidate-lead-form/basicDetails/basicDetails";
import WorkDetailsForm from "./pages/mid-seniors-candidate-lead-form/workDetails/workDetails";
import ResumeUpload from "./pages/mid-seniors-candidate-lead-form/resumeUpload/resumeUpload";
import CandidateEvaluationSummaryF from "./pages/mid-senior-report-generation-form/CandidateEvaluationSummaryF";

// import history from "./history";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  const Dispatch = useDispatch();
  const loginStatus = useSelector(
    (state) => state.candidateDetailsRd.loginStatus
  );

  
  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let candidateNumber = localStorage.getItem("candidateNumber"); //to check if the candidate number is already stored in local storage
    //to check if the candidate number is already stored in local storage
    //  let candidateId = localStorage.getItem("candidateId");
    if (candidateNumber != null) {
      Dispatch(candidateDetailsActions.setLoginStatus(true));

      Dispatch(
        formValidationActions.setCandidateNumber(
          localStorage.getItem("candidateNumber")
        )
      );
      Dispatch(
        formValidationActions.setLanguage(
          localStorage.getItem("candidateLanguage")
        )
      );
    }
  });

  // useEffect(() => {
  //   const handleBackButton = (e) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     window.history.forward();
  //   };

  //   window.history.pushState(null, null, window.location.pathname);
  //   window.addEventListener("popstate", handleBackButton);

  //   return () => {
  //     window.removeEventListener("popstate", handleBackButton);
  //   };
  // }, []);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Taizo.in - Jobseeker Profile";
        metaDescription = "";
        break;
      case "/jobseeker-profileformprofile-picture":
        title = "";
        metaDescription = "";
        break;
      case "/jobseeker-profileformother-details":
        title = "";
        metaDescription = "";
        break;
      case "/jobseeker-profileformwork-details":
        title = "";
        metaDescription = "";
        break;
      case "/jobseeker-profileformeducation-details":
        title = "";
        metaDescription = "";
        break;
      case "/jobseeker-profileformbasic-details":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<JobseekerProfileCreateBiodat />} />
      <Route path="/profile-form" element={<JobseekerProfileCreateBiodat />} />
      <Route path="/unauthorizedUser" element={<UnauthorizedUser />} />
      <Route path="*" element={<NotFound />}></Route>
      <Route
        path="/candidate-create-bio-data"
        element={<JobseekerProfileCreateBiodata />}
      />

      <Route
        path="/candidate-create-bio-data"
        element={<JobseekerProfileCreateBiodata />}
      />

      <Route
        path="/candidateevaluationsummary"
        element={<CandidateEvaluationSummaryF />}
      />

      {/* mid senior routes */}
      <Route path="/candidate-basic-details" element={<BasicDetailsForm />} />
      <Route path="/candidate-work-details" element={<WorkDetailsForm />} />
      <Route path="/candidate-resume-upload" element={<ResumeUpload />} />
      {/* end of mid senior routes */}

      <Route
        path="/jobseeker-profile-filled"
        element={<BioDataCreatedPopupMessage />}
      />
      {loginStatus && (
        <>
          <Route
            path="/jobseeker-profileformprofile-picture"
            element={<JobseekerProfileFormProfile />}
          />
          <Route
            path="/jobseeker-resume-details"
            element={<JobseekerProfileFormResume />}
          />
          <Route
            path="/jobseeker-profileformother-details"
            element={<JobseekerProfileFormOtherD />}
          />
          <Route
            path="/jobseeker-profileformwork-details"
            element={<JobseekerProfileFormWorkDe />}
          />
          <Route
            path="/jobseeker-profileformeducation-details"
            element={<JobseekerProfileFormEducati />}
          />
          <Route
            path="/jobseeker-profileformbasic-details"
            element={<JobseekerProfileFormBasicD />}
          />
          {/* <Route
            path="/jobseeker-resume-details"
            element={<JobseekerProfileResume/>}
          /> */}
          {/* <Route
            path="/jobseeker-profile-filled"
            element={<BioDataCreatedPopupMessage />}
          /> */}
          <Route path="/noStudents" element={<NoStudents />} />
        </>
      )}
    </Routes>
  );
}
export default App;
