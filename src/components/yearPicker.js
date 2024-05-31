import { format, parseISO } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import styles from "../components/yearPicker.module.css";
import { useSelector, useDispatch } from "react-redux";
import { formValidationActions } from "../redux-store/store";
import { translate } from "../utility";

const YearPicker = () => {
  const Dispatch = useDispatch();
  const eductiondetails = useSelector(
    (state) => state.formDetailsRd.educationDetails
  );
  const Lang = useSelector((state) => state.formDetailsRd.candidateLanguage);

  const minDate = new Date(); // Set your minimum date here
  const maxDate = new Date(); // Set your maximum date here
  minDate.setFullYear(minDate.getFullYear() - 50); // Subtract 500 years from the current year
  maxDate.setFullYear(maxDate.getFullYear() + 6); // Subtract 18 years from the current year

  function handleCompletionYear(val) {
    const currentYear = new Date().getFullYear();

    Dispatch(
      formValidationActions.validateEducationDetails({
        key: "completionYear",
        error: false,
      })
    );

    let userInput = val.getFullYear();
    if (userInput > currentYear) {
      // console.log("student");
      Dispatch(
        formValidationActions.showEducationDetails({
          // to show hide details
          education: true,
          department: true,
          year: true,
          student: false,
          arreas: false,
        })
      );
      Dispatch(
        formValidationActions.setEducationDetails({
          key: "areYouStudent",
          value: "Yes",
        })
      );
    } else if (userInput > currentYear - 3 && userInput < currentYear) {
      // console.log("Worker");
      Dispatch(
        formValidationActions.showEducationDetails({
          // to show hide details
          education: true,
          department: true,
          year: true,
          student: false,
          arreas: true,
        })
      );
      Dispatch(
        formValidationActions.setEducationDetails({
          key: "areYouStudent",
          value: "No",
        })
      );
    } else if (userInput == currentYear) {
      // console.log("are you student");
      Dispatch(
        formValidationActions.showEducationDetails({
          // to show hide details
          education: true,
          department: true,
          year: true,
          student: true,
          arreas: false,
        })
      );

      Dispatch(
        formValidationActions.setEducationDetails({
          key: "areYouStudent",
          value: "",
        })
      );
    } else {
      Dispatch(
        formValidationActions.showEducationDetails({
          // to show hide details
          education: true,
          department: true,
          year: true,
          student: false,
          arreas: false,
        })
      );
      Dispatch(
        formValidationActions.setEducationDetails({
          key: "areYouStudent",
          value: "No",
        })
      );
      // console.log("old worker");
    }

    Dispatch(
      formValidationActions.setEducationDetails({
        key: "completionYear",
        value: val,
      })
    );
  }
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className={`${styles.stretch}`}>
          <DatePicker
            slotProps={{
              textField: {
                error: eductiondetails.completionYear.err,
              },
            }}
            onChange={(val) => {
              handleCompletionYear(val);
            }}
            value={eductiondetails.completionYear.val}
            name="completionYear"
            className={`${styles.stretch}`}
            minDate={minDate}
            maxDate={maxDate}
            label={translate.completionYear[Lang]}
            views={["year"]}
          />
        </div>
      </LocalizationProvider>
    </>
  );
};

export default YearPicker;
