import style from "../asserts/common.module.css";
import PortalPopup from "./portal-popup";

const StudentNotAllowed = () => {
  // console.log(keySkillsDetails);

  return (
    <>
      <div>
        <PortalPopup overlayColor="rgba(40, 40, 40, 0.8)" placement="Centered">
          <div>
            Note: Companies are looking for candidates who can join immediately.
            Students cannot apply for jobs at this time. Complete your course
            before registering. Thank you
          </div>
        </PortalPopup>
      </div>
    </>
  );
};

export default StudentNotAllowed;
