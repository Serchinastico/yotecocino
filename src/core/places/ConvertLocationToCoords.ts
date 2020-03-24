import config from "../Config";
import Geohash from "latlon-geohash";

export interface RichLocation {
    lat: number,
    long: number,
    geohash: string
}

export interface PlaceSearchResult {
    id: string,
    lat: number,
    long: number,
    geohash: string,
    address: string
}

export default class ConvertLocationToCoords {

    search(address: string): Promise<Array<PlaceSearchResult>> {
        const searchableAddress = encodeURI(address);
        const searchUrl = `${config.mapboxUrl}/geocoding/v5/mapbox.places/${searchableAddress}.json?access_token=${config.mapsToken}&autocomplete=true&country=${config.country}&language=${config.language}`
        return fetch(searchUrl)
            .then(response => response.json())
            .then(foundPlaces => {
                    if (foundPlaces.type === "FeatureCollection") {
                        return foundPlaces.features.map((place: any) => {
                            const lat = place.center[0];
                            const long = place.center[1];
                            const geohash = Geohash.encode(lat, long, 8);
                            return {
                                id: place.id,
                                lat: lat,
                                long: long,
                                address: place.place_name,
                                geohash: geohash
                            }
                        });
                    } else {
                        return [];
                    }
                }
            );
    }
}

