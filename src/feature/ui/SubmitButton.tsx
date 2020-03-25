import React from "react";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

type SubmitButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  label: string;
  onSubmit?: (event: any) => void;
  onClick?: (event: any) => void;
  classes: any;
};

const noTransformText: React.CSSProperties = {
  textTransform: "none"
};

const styles = {
  activeButton: {
    ...noTransformText,
    background: "#e27861",
    padding: "10px",
    marginTop: "16px",
    borderRadius: "48px",
    border: "none",
    width: "45%",
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "#fff",
    alignSelf: "center",
    fontFamily: "Montserrat, sans-serif",
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

const SubmitButton: React.FC<SubmitButtonProps> = props => {
  const disabled = props.disabled || false;
  const { classes, loading, onSubmit, onClick } = props;
  const submit = loading ? () => {} : onSubmit;

  const buttonContent = loading ? (
    <CircularProgress className={classes.progressStyle} size={24} />
  ) : (
    props.label
  );
  return (
    <Button
      className={classes.activeButton}
      onSubmit={submit}
      onClick={onClick}
      type="submit"
      disabled={disabled}
    >
      {buttonContent}
    </Button>
  );
};

export default withStyles(styles)(SubmitButton);
