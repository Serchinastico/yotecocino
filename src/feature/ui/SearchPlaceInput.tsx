import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import throttle from 'lodash/throttle';
import ConvertLocationToCoords, {PlaceSearchResult, SearchPlaceFilter} from "../../foundation/places/ConvertLocationToCoords";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
    search: {
        backgroundColor: "#FFF",
        margin: "15px"
    }
}));

type  SearchPlaceInputProps = {
    onChange: (place: PlaceSearchResult) => void,
    address?: string | null
} & SearchPlaceFilter

export default function SearchPlaceInput(props: SearchPlaceInputProps) {
    const classes = useStyles();
    const [inputValue, setInputValue] = React.useState(props.address || "");
    const [options, setOptions] = React.useState<PlaceSearchResult[]>([]);

    const convertLocation = new ConvertLocationToCoords();


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const selectPlace = (event: any, value: PlaceSearchResult | null, reason: any) => {
        if (value) {
            props.onChange(value);
        }
    }

    const fetch = React.useMemo(
        () =>
            throttle((address: string, callback: (results?: PlaceSearchResult[]) => void) => {
                convertLocation.search(address, props).then(callback);
            }, 200),
        [convertLocation, props],
    );

    React.useEffect(() => {
        let active = true;

        if (inputValue === '') {
            setOptions([]);
            return undefined;
        }

        fetch(inputValue, (results?: PlaceSearchResult[]) => {
            if (active) {
                setOptions(results || []);
            }
        });

        return () => {
            active = false;
        };
    }, [inputValue, fetch]);

    return (
        <Autocomplete
            id="search-place"
            style={{maxWidth: 400}}
            getOptionLabel={option => (typeof option === 'string' ? option : option.address)}
            filterOptions={x => x}
            options={options}
            autoComplete
            includeInputInList
            onChange={selectPlace}
            renderInput={params => (
                <TextField
                    {...params}
                    className={classes.search}
                    label="Dóndde"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <React.Fragment>
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                                {params.InputProps.startAdornment}
                            </React.Fragment>
                        )
                    }
                    }
                />
            )}
            renderOption={option => {
                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon}/>
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
