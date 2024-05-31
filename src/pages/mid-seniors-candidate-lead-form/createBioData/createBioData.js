import { useNavigate } from "react-router-dom";
import BioDataContainer from "./bio-data-container";
import styles from "./createBioData.module.css";
import { useEffect } from "react";

const JobseekerProfileCreateBiodata = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let fromAdminId = params.get("from_id");
    localStorage.setItem("midSeniorFromAdminId", fromAdminId);
    if (!fromAdminId) {
      navigate("/unauthorizedUser");
    }
  }, []);

  return (
    <div className={styles.jobseekerProfileCreatebiodat}>
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
        <BioDataContainer />
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerTexts}>
          <div className={styles.copyrightInformation}>
            Copyright © Taizo Technologies Private Limited
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobseekerProfileCreateBiodata;
