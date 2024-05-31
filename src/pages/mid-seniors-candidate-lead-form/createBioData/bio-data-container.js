import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./bio-data-container.module.css";
import { useSelector, useDispatch } from "react-redux";
import { formValidationActions } from "../../../redux-store/store";
import { translate } from "../../../utility";

const BioDataContainer = () => {
  const navigate = useNavigate();

  const candidateNumber = useSelector(
    (state) => state.formDetailsRd.candidateNumber.val
  );
  const Lang = useSelector((state) => state.formDetailsRd.candidateLanguage);

  const onCreateBioDataButtonClick = () => {
    navigate(`/candidate-basic-details?MN=${candidateNumber}`);
  };

  return (
    <div className={styles.createYourBiodata}>
      <div className={styles.heading}>
        <div className={styles.createYourBioData}>Job Enquiry Form</div>
        <div className={styles.letsBeginBy}>
          {translate.LetsBeginByCreatingYourBioData[Lang]}
        </div>
      </div>
      <img
        className={styles.biodataImageIcon}
        alt=""
        src="/biodata-image@2x.png"
      />
      <button
        className={`${styles.createBioDataButton} text-center`}
        onClick={onCreateBioDataButtonClick}
      >
        Job Enquiry Form
      </button>
      <div className={styles.termsPrivacyPolicyContent}>
        <div className={styles.textFrame1}>
          <div className={styles.byClickingThe}>
            By clicking the above button, you agree to our
          </div>
        </div>
        <div className={styles.textFrame2}>
          <a
            className={styles.termsOfService}
            href="https://www.taizo.in/terms-service"
            target="_blank"
          >
            Terms of Service
          </a>
          <div className={styles.and}>and</div>
          <a
            className={styles.privacyPolicy}
            href="https://www.taizo.in/privacy-policy"
            target="_blank"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default BioDataContainer;
