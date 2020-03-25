import React from "react";

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from "@material-ui/core/styles";

type SubmitButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  label: string;
  onSubmit: (event: any) => void;
  classes: any;
}

const styles = {
  activeButton: {
    background: "#e27861",
    padding: "16px",
    marginTop: "16px",
    borderRadius: "48px",
    border: "none",
    width: "45%",
    fontSize: "1rem",
    fontWeight: 600,
    color: "#fff",
    alignSelf: "flex-end",
    "&:disabled": {
      background: "#ccc"
    },
    "&:hover": {
      background: "#ef9f8d"
    }
  },
  progressStyle: {
    color: "#FFF"
  }
};

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const disabled = props.disabled || false;
  const {classes, onSubmit} = props;

  const buttonContent = props.loading ? <CircularProgress className={classes.progressStyle}/> : props.label;
  return <Button
    className={classes.activeButton}
    onSubmit={onSubmit}
    type="submit"
    disabled={disabled}>
    {buttonContent}
  </Button>;
}

export default withStyles(styles)(SubmitButton);