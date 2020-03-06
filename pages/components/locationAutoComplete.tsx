
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

interface PlaceType {
    id: string;
    description: string;
    place_id: string;
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

interface GeoPlace {
    location: {
        lat: number;
        lng: number;
    },
    location_type: string;
    viewport: {
        northeast: {
            lat: number;
            lng: number;
        },
        southwest: {
            lat: number;
            lng: number;
        }
    }
}

export const LocationAutoComplete = (
    { value, onChange }
): JSX.Element => {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<PlaceType[]>([]);

    const fetch = useMemo(
        () =>
            throttle((inputValue: string, callback: (results?: PlaceType[]) => void) => {
                window.fetch(`/api/google/places?input=${inputValue}`)
                    .then(r => {
                        r.json().then(callback)
                    })
            }, 200),
        [],
    );

    useEffect(() => {
        let active = true;

        if (inputValue === '') {
            setOptions([]);
            return;
        }

        fetch(inputValue, (results?: PlaceType[]) => {
            console.log(results);
            if (active) {
                setOptions(results || []);
            }
        });

        return () => {
            active = false;
        };
    }, [inputValue, fetch]);

    let onAutoCompleteChange = (e, newValue: PlaceType) => {
        console.log(newValue);
        window.fetch(`/api/google/geocode?place_id=${newValue.place_id}`)
            .then(r => r.json().then((results: GeoPlace[]) => {
                console.log(results);
            }))
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