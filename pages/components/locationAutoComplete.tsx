
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

let loadScript = (src: string, position: HTMLElement | null, id: string) => {
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

interface PlaceType {
    id: string;
    description: string;
    structured_formatting: {
        main_text: string;
        secondary_text: string;
        main_text_matched_substrings: [
            {
                offset: number;
                length: number;
            }
        ];
    };
}

export const LocationAutoComplete = (
    { value, onChange }
): JSX.Element => {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<PlaceType[]>([]);
    const loaded = useRef(false);

    if (window && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
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
            throttle((request: { input: string }, callback: (results?: PlaceType[]) => void) => {
                (autocompleteService.current as any).getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return;
        }

        if (inputValue === '') {
            setOptions([]);
            return;
        }

        fetch({ input: inputValue }, (results?: PlaceType[]) => {
            if (active) {
                setOptions(results || []);
            }
        });

        return () => {
            active = false;
        };
    }, [inputValue, fetch]);

    let onAutoCompleteChange = (e, newValue) => {
        // TODO: 
        // How to extract the location?
        // Should we do a geo query to know if the user is in the same area or should we use google maps?
        console.log(newValue);
    }

    return <Autocomplete
        id="google-map-demo"
        getOptionLabel={option => typeof option === 'string' ? option : option.description}
        filterOptions={x => x}
        options={options}
        autoComplete
        includeInputInList
        disableOpenOnFocus
        onChange={onAutoCompleteChange}
        renderInput={params => (
            <TextField
                {...params}
                label="Add a location"
                onChange={e => setInputValue(e.target.value)}
            />
        )}
        renderOption={option => {
            const matches = option.structured_formatting.main_text_matched_substrings;
            const parts = parse(
                option.structured_formatting.main_text,
                matches.map((match: any) => [match.offset, match.offset + match.length]),
            );

            return (
                <Grid container alignItems="center" data-id={option.id}>
                    <Grid item data-id={option.id}>
                        <LocationOnIcon className={classes.icon} />
                    </Grid>
                    <Grid item xs data-id={option.id}>
                        {parts.map((part, index) => (
                            <span data-id={option.id} key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                {part.text}
                            </span>
                        ))}

                        <Typography variant="body2" color="textSecondary" data-id={option.id}>
                            {option.structured_formatting.secondary_text}
                        </Typography>
                    </Grid>
                </Grid>
            );
        }}
    />
}