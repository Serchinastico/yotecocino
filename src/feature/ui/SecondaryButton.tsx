import React from "react";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

type SecondaryButtonProps = {
  label: string;
  onClick: () => void;
  classes: any;
};

const noTransformText: React.CSSProperties = {
  textTransform: "none"
};

const styles = {
  activeButton: {
    ...noTransformText,
    background: "#0000",
    padding: "10px",
    marginTop: "16px",
    borderRadius: "48px",
    border: "none",
    width: "45%",
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "#E27861",
    alignSelf: "flex-end",
    fontFamily: "Montserrat, sans-serif",
    "&:hover": {
      background: "##E27861"
    }
  },
  progressStyle: {
    color: "#FFF"
  }
};

const SecondaryButton: React.FC<SecondaryButtonProps> = props => {
  const { classes, onClick, label } = props;

  return (
    <Button className={classes.activeButton} onClick={onClick}>
      {label}
    </Button>
  );
};

export default withStyles(styles)(SecondaryButton);
