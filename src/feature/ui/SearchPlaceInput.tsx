import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import throttle from 'lodash/throttle';
import ConvertLocationToCoords, {PlaceSearchResult} from "../../core/places/ConvertLocationToCoords";
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

export default function GoogleMaps() {
    const classes = useStyles();
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<PlaceSearchResult[]>([]);

    const convertLocation = new ConvertLocationToCoords();


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const fetch = React.useMemo(
        () =>
            throttle((address: string, callback: (results?: PlaceSearchResult[]) => void) => {
                convertLocation.search(address).then(callback);
            }, 200),
        [],
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
            id="google-map-demo"
            style={{maxWidth: 400}}
            getOptionLabel={option => (typeof option === 'string' ? option : option.address)}
            filterOptions={x => x}
            options={options}
            autoComplete
            includeInputInList
            renderInput={params => (
                <TextField
                    {...params}
                    className={classes.search}
                    label="Add a location"
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
                /*
                                const matches = option.structured_formatting.main_text_matched_substrings;
                                const parts = parse(
                                    option.structured_formatting.main_text,
                                    matches.map((match: any) => [match.offset, match.offset + match.length]),
                                );
                */

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon}/>
                        </Grid>
                        <Grid item xs>
                            {/*
                            {parts.map((part, index) => (
                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
                            ))}
*/}
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