
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, TextField, Grid, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { useState, useMemo, useEffect } from 'react';
import throttle from 'lodash/throttle';
import { Place } from '../hooks/types';
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

interface LocationAutoCompleteProps {
    value: Place;
    onChange: (place: Place) => void;
}

export const LocationAutoComplete = (
    { value, onChange }: LocationAutoCompleteProps
): JSX.Element => {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState(value ? value.description : '');
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
            if (active) {
                setOptions(results || []);
            }
        });

        return () => {
            active = false;
        };
    }, [inputValue, fetch]);

    let onAutoCompleteChange = (e, newValue: PlaceType) => {
        onChange({
            description: newValue.description,
            place_id: newValue.place_id
        });
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