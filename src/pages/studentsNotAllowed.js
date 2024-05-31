import PortalPopup from "../components/portal-popup";
import StudentsNotAllowed from "../components/students-not-allowed";

const NoStudents = () => {
  return (
    <>
      <div>
        <PortalPopup overlayColor="rgba(40, 40, 40, 0.8)" placement="Centered">
          <div>
            <StudentsNotAllowed />
          </div>
        </PortalPopup>
      </div>
    </>
  );
};

export default NoStudents;
