import { useEffect } from "react";
import styles from "./bio-data-created-popup-message.module.css";
import { useSelector, useDispatch } from "react-redux";
import { formValidationActions } from "../redux-store/store";
import { translate } from "../utility";
import PortalPopup from "./portal-popup";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useState } from "react";

const BioDataCreatedPopupMessage = ({ onClose }) => {
  const Lang = useSelector((state) => state.formDetailsRd.candidateLanguage);
  const showLoader = useSelector(
    (state) => state.formDetailsRd.profileFilledLoader.show
  );

  const [from, setFrom] = useState("BC");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let from = params.get("from");
    // BC => blue color
    // WC => White color
    if (from == "WC") {
      setFrom("WC");
    }
  }, []);

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  return (
    <>
      <PortalPopup overlayColor="rgba(40, 40, 40, 0.8)" placement="Centered">
        <div
          className={styles.bioDataCreatedPopupMessage}
          data-animate-on-scroll
        >
          {showLoader && (
            <div className={styles.loader_wrp}>
              <Box>
                <CircularProgress />
              </Box>
              <div>
                <h6 className="text-center">
                  {translate.WereLoadingYourProfile[Lang]}
                </h6>
              </div>
            </div>
          )}
          {!showLoader && (
            <div className={styles.biodataCreatedImg1Parent}>
              <img
                className={styles.biodataCreatedImg1Icon}
                alt=""
                src="/biodatacreatedimg-1@2x.png"
              />
              <div className={styles.text}>
                <div className={styles.yourBioDataCreated}>Thank you!</div>
                <div className={styles.loremIpsumHas}>
                  Your form has been received by us. You can click the "Talk to
                  us" button and chat with one of our recruitment specialists
                  about your job search.
                </div>
              </div>
              <a
                href={`https://wa.me/+917806805808?text=${
                  from == "BC"
                    ? "Hi,%0A%0AI am looking for a job."
                    : "Hi,%0A%0AI need your assistance in finding a new job."
                }`}
                target="blank"
                style={{ textDecoration: "none" }}
              >
                <button className={styles.showMeJobsBtn}>
                  <span className={styles.showMeJobs}>Talk to us</span>
                </button>
              </a>
            </div>
          )}
        </div>
      </PortalPopup>
    </>
  );
};

export default BioDataCreatedPopupMessage;
