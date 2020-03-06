import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from "@googlemaps/google-maps-services-js";
import { GeocodeResult } from '@googlemaps/google-maps-services-js/dist/common';
const client = new Client({});

export default (req: NextApiRequest, res: NextApiResponse<GeocodeResult[]>) => {
    client.geocode({
        params: {
            place_id: req.query.place_id,
            key: process.env.GOOGLE_MAPS_API_KEY
        } as any // place_id is not defined in the types of this libray
    }).then(r => {
        res.status(200).json(r.data.results);
    }).catch(e => {
        console.log(e);
        res.status(500).json(e);
    });
};