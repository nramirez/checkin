
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, makeStyles, Grid, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { useState, useRef, useMemo, useEffect } from 'react';
import throttle from 'lodash/throttle';
import parse from 'autosuggest-highlight/parse';

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));

const loadScript = (src: string, position: HTMLElement, id: string) => {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}
const autocompleteService = { current: null };

export const LocationAutoComplete = (): JSX.Element => {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const loaded = useRef(false);

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            // TODO: Invalidate this key and restrict to only be used from the site
            loadScript(
                'https://maps.googleapis.com/maps/api/js?key=AIzaSyDq44oNiE57db3mcWI8Noy3PY_snjxhrAo&libraries=places',
                document.querySelector('head'),
                'google-maps',
            );
        }

        loaded.current = true;
    }

    const fetch = useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions([]);
            return undefined;
        }

        fetch({ input: inputValue }, results => {
            if (active) {
                setOptions(results || []);
            }
        });

        return () => {
            active = false;
        };
    }, [inputValue, fetch]);

    const handleChange = event => {
        setInputValue(event.target.value);
    };

    return <Autocomplete
        id="google-map-demo"
        getOptionLabel={option => typeof option === 'string' ? option : option.description}
        filterOptions={x => x}
        options={options}
        autoComplete
        includeInputInList
        disableOpenOnFocus
        renderInput={params => (
            <TextField
                {...params}
                label="Add a location"
                onChange={handleChange}
            />
        )}
        renderOption={option => {
            const matches = option.structured_formatting.main_text_matched_substrings;
            const parts = parse(
                option.structured_formatting.main_text,
                matches.map(match => [match.offset, match.offset + match.length]),
            );

            return (
                <Grid container alignItems="center">
                    <Grid item>
                        <LocationOnIcon className={classes.icon} />
                    </Grid>
                    <Grid item xs>
                        {parts.map((part, index) => (
                            <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                {part.text}
                            </span>
                        ))}

                        <Typography variant="body2" color="textSecondary">
                            {option.structured_formatting.secondary_text}
                        </Typography>
                    </Grid>
                </Grid>
            );
        }}
    />
}