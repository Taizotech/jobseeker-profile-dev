import { useEffect } from "react";
import styles from "./bio-data-created-popup-message.module.css";
import { translate } from "../utility";

import { useSelector, useDispatch } from "react-redux";
import {
  multiSelectionActions,
  formValidationActions,
} from "../redux-store/store";

const StudentsNotAllowed = ({ onClose }) => {
  const Lang = useSelector((state) => state.formDetailsRd.candidateLanguage);
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
    <div className={styles.bioDataCreatedPopupMessage} data-animate-on-scroll>
      <div className={styles.biodataCreatedImg1Parent}>
        <div className={styles.text}>
          <div className="">
            <strong> {translate.note[Lang]}:</strong>{" "}
            {translate.CompaniesAreLookingForCandidates[Lang]} <br />{" "}
            {translate.thankYou[Lang]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsNotAllowed;
