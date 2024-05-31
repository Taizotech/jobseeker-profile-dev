import PortalPopup from "../components/portal-popup";
import UnauthorizedContent from "../components/unathoriszed";

const UnauthorizedUser = () => {
  return (
    <>
      <div>
        <PortalPopup overlayColor="rgba(40, 40, 40, 0.8)" placement="Centered">
          <div>
            <UnauthorizedContent />
          </div>
        </PortalPopup>
      </div>
    </>
  );
};

export default UnauthorizedUser;
