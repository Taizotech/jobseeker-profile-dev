import { useState, useEffect } from "react";
import { GetIndustry, GetJobRoles } from "../apiServices";
import { useSelector, useDispatch } from "react-redux";
import {
  singleSelectionActions,
  formValidationActions,
} from "../redux-store/store";

import style from "../asserts/common.module.css";
import { translate } from "../utility";
const JobRoleDetails = () => {
  const Dispatch = useDispatch();
  const [industryDetails, setIndustryDetails] = useState([]);
  const [jobRoleDetails, setJobRoleDetails] = useState([]);
  const [selectedJobRole, setSelectedJobRole] = useState({
    jobRole: null,
    industry: null,
  });
  const Lang = useSelector((state) => state.formDetailsRd.candidateLanguage);

  const workDetetails = useSelector((state) => state.formDetailsRd.workDetails);

  useEffect(() => {
    GetIndustry().then((data) => {
      setIndustryDetails(data.results);
    });
  }, []);

  function handleIndustryInput(e, state_id, industry_val) {
    setSelectedJobRole((prev) => ({ ...prev, industry: industry_val }));
    Dispatch(singleSelectionActions.showJobCatogory(false));
    Dispatch(
      singleSelectionActions.setJobcatogory({
        jobRole: selectedJobRole.jobRole,
        industry: industry_val,
      })
    );
    Dispatch(
      formValidationActions.setWorkDetails({
        key: "interestedJobRole",
        value: selectedJobRole.jobRole,
      })
    );

    Dispatch(
      formValidationActions.setWorkDetails({
        key: "industry",
        value: industry_val,
      })
    );

    Dispatch(
      formValidationActions.showWorkDetailsDetails({
        PfAccount: true,
        prefLocation: true,
        expYear: true,
        jobRole: true,
        doYouHaveExp: true,
      })
    );
  }

  // console.log(workDetetails);

  function handleJobRoleInput(event, city_id, jobRole_val) {
    setSelectedJobRole((prev) => ({ ...prev, jobRole: jobRole_val }));
  }

  useEffect(() => {
    GetJobRoles(1).then((data) => {
      setJobRoleDetails(data.results);
    });
  }, []);

  function resetJobCatogory() {
    // to reset jobroles and category
    setSelectedJobRole({
      jobRole: null,
      industry: null,
    });
  }

  return (
    <>
      <div>
        <div>
          <div>
            <h6>{translate.jobRole[Lang]}</h6>
            {selectedJobRole.jobRole != null && (
              <div>
                <span className={`${style.chips_wrp}`}>
                  <input
                    type="radio"
                    name="SelectedJobRole"
                    id={`selected_jobRole_${selectedJobRole.jobRole}`}
                    value={selectedJobRole.jobRole}
                    defaultChecked
                    readOnly
                  />
                  <label
                    className="row d-inline-block"
                    htmlFor={`selected_jobRole_${selectedJobRole.jobRole}`}
                  >
                    <span className="col-9">{selectedJobRole.jobRole}</span>

                    <span className="col-3">
                      <button
                        onClick={() => {
                          resetJobCatogory();
                        }}
                        className="btn-close"
                      ></button>
                    </span>
                  </label>
                </span>
              </div>
            )}
          </div>
          <div>
            <>
              <div
                className={`${style["scrollbar-primary"]}  `}
                style={{ maxHeight: "60vh" }}
              >
                <div className={`${style["force-overflow"]}`}>
                  {jobRoleDetails.length > 0 &&
                    selectedJobRole.jobRole == null && (
                      <>
                        {jobRoleDetails.map((el, index) => {
                          return (
                            <span key={el.id} className={`${style.chips_wrp}`}>
                              <input
                                onClick={(e) => {
                                  handleJobRoleInput(e, el.id, el.jobRoles);
                                }}
                                type="radio"
                                name="jobrole_list"
                                id={`jobRole${index}`}
                                value={el.jobRoles}
                              />
                              <label htmlFor={`jobRole${index}`}>
                                {el.jobRoles}
                              </label>
                            </span>
                          );
                        })}
                      </>
                    )}
                </div>
              </div>
            </>
          </div>
          {selectedJobRole.jobRole != null && (
            <h6>{translate.industry[Lang]}</h6>
          )}

          <div
            className={`${style["scrollbar-primary"]}  `}
            style={{ maxHeight: "60vh" }}
          >
            <div className={`${style["force-overflow"]}`}>
              {industryDetails.length > 0 &&
                selectedJobRole.jobRole != null && (
                  <>
                    {industryDetails.map((el, index) => {
                      return (
                        <span key={el.id} className={`${style.chips_wrp}`}>
                          <input
                            onClick={(e) => {
                              handleIndustryInput(e, el.id, el.industry);
                            }}
                            type="radio"
                            name="industryList"
                            id={`industry_${index}`}
                            value={el.industry}
                          />
                          <label htmlFor={`industry_${index}`}>
                            {el.industry}
                          </label>
                        </span>
                      );
                    })}
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobRoleDetails;
