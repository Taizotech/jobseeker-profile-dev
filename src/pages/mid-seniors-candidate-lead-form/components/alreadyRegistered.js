import { useEffect } from "react";
import styles from "../../../components/bio-data-created-popup-message.module.css";

const RegisteredAlready = ({ onClose }) => {
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
          <div className="text-center my-5">
            <h4 className="">Form already submitted</h4>
            <div className="d-grid justify-content-center mt-4">
              <div>
                <h6>
                  It looks like you have already submitted your information in
                  the form. For further information, please contact us at
                  7806805808.
                </h6>
                <a
                  target="_blank"
                  href="https://wa.me/+917806805808?text=Hi"
                  style={{ textDecoration: "none" }}
                >
                  <button className="btn btn-success d-block mx-auto mb-2 mt-3">
                    Contact Us
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredAlready;
