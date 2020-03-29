import React from "react";

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core/styles";


export type FAQQuestion = {
  question: string | React.ReactNode;
  answer: string | React.ReactNode;
}

const boldText: React.CSSProperties = {
  fontWeight: "bold"
};
type FAQItemProps = {
  classes?: any;
} & FAQQuestion;

const styles = {
  container: {
    width: "100%",
    margin: "auto"
  },
  question: {
    ...boldText,
},
  answerContainer:  {
    borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
    padding: "0px 10px",
    margin: "0 12px"
  },
  answer: {
    color: "#646464"
  }
};

const ExpansionPanel = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
      marginBottom: 30,
    },
  },
  expanded: {
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);
const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);
const FAQItem: React.FC<FAQItemProps> = ({
                                           question,
                                           answer,
                                           classes = {}
                                         }) => {
  return <ExpansionPanel className={classes.container}>
    <ExpansionPanelSummary>
      <Typography  className={classes.question}>{question}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails className={classes.answerContainer}>
      <Typography className={classes.answer}>{answer}</Typography>
    </ExpansionPanelDetails>
  </ExpansionPanel>
};

export default withStyles(styles)(FAQItem);