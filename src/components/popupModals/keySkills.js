import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import KeySkillsData from "../keySkillsList";

export default function ScrollDialog(props) {
  //   const [open, setOpen] = React.useState(true);
  //   const [scroll, setScroll] = React.useState("paper");

  //   const handleClickOpen = (scrollType) => () => {
  //     setOpen(true);
  //     setScroll(scrollType);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const descriptionElementRef = React.useRef(null);
  //   React.useEffect(() => {
  //     if (open) {
  //       const { current: descriptionElement } = descriptionElementRef;
  //       if (descriptionElement !== null) {
  //         descriptionElement.focus();
  //       }
  //     }
  //   }, [open]);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>
        <DialogContent dividers={true}>
          {/* <KeySkillsData /> */}
          {props.children}
        </DialogContent>
      </Dialog>
    </div>
  );
}
