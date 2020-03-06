import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from "@googlemaps/google-maps-services-js";
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js/dist/places/autocomplete';
const client = new Client({});

export default (req: NextApiRequest, res: NextApiResponse<PlaceAutocompleteResult[]>) => {
    client.placeAutocomplete({
        params: {
            input: req.query.input as string,
            key: process.env.GOOGLE_MAPS_API_KEY
        }
    }).then(r => {
        res.status(200).json(r.data.predictions);
    }).catch(e => {
        console.log(e);
        res.status(500).json(e);
    });
};