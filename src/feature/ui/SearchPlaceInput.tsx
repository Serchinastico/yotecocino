import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import throttle from "lodash/throttle";
import ConvertLocationToCoords, {
  PlaceSearchResult,
  SearchPlaceFilter
} from "../../foundation/places/ConvertLocationToCoords";
import { FieldErrorDescription, InputTitle, InputHint } from "../ui/StyledForm";

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2)
  },
  search: {
    backgroundColor: "#FFF",
    marginBottom: "15px",
    border: "0.5px solid rgba(0, 0, 0, 0.2)",
    height: "40px",
    width: "470px",
    borderRadius: "24px",
    paddingLeft: "16px",
    paddingRight: "16px",
    fontSize: "0.9rem",
    marginTop: "8px",
    fontFamily: "'Montserrat', sans-serif",
    "&::placeholder": {
      fontFamily: "'Montserrat', sans-serif"
    }
  },
  root: {
    border: 0,
    background: "#000"
  }
}));

type SearchPlaceInputProps = {
  onChange: (place: PlaceSearchResult) => void;
  address?: string | null;
  errorMessage: string | null;
  label: string | null;
  hint?: string;
} & SearchPlaceFilter;

export default function SearchPlaceInput(props: SearchPlaceInputProps) {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState(props.address || "");
  const [options, setOptions] = React.useState<PlaceSearchResult[]>([]);

  const convertLocation = new ConvertLocationToCoords();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const selectPlace = (
    event: any,
    value: PlaceSearchResult | null,
    reason: any
  ) => {
    if (value) {
      props.onChange(value);
    }
  };

  const fetch = React.useMemo(
    () =>
      throttle(
        (
          address: string,
          findPlaces: ConvertLocationToCoords,
          config: SearchPlaceInputProps,
          callback: (results?: PlaceSearchResult[]) => void
        ) => {
          findPlaces.search(address, config).then(callback);
        },
        200
      ),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions([]);
      return undefined;
    }

    fetch(
      inputValue,
      convertLocation,
      props,
      (results?: PlaceSearchResult[]) => {
        if (active) {
          setOptions(results || []);
        }
      }
    );

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, fetch]);

  const error = props.errorMessage ? (
    <FieldErrorDescription>{props.errorMessage}</FieldErrorDescription>
  ) : null;
  return (
    <Autocomplete
      id="search-place"
      style={{ maxWidth: 400 }}
      getOptionLabel={option =>
        typeof option === "string" ? option : option.address
      }
      filterOptions={x => x}
      options={options}
      autoComplete
      freeSolo
      includeInputInList
      onChange={selectPlace}
      renderInput={params => (
        <div>
          <InputTitle>
            {props.label} <InputHint>{props.hint}</InputHint>
          </InputTitle>
          {error}
          <TextField
            {...params}
            className={classes.search}
            placeholder="Calle y número"
            variant="standard"
            onChange={handleChange}
          />
        </div>
      )}
      renderOption={option => {
        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              <Typography variant="body2" color="textSecondary">
                {option.address}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
