import Geohash from "latlon-geohash";
import {RichLocation} from "../types/Coordinates";

export interface PlaceSearchResult extends RichLocation {
    address: string
}

export interface SearchPlaceFilter {
    mapboxApiAccessToken: string,
    country?: string,
    language?: string
}

export default class ConvertLocationToCoords {

    search(address: string, filter: SearchPlaceFilter): Promise<Array<PlaceSearchResult>> {
        const searchableAddress = encodeURI(address);
        const authPart = `access_token=${filter.mapboxApiAccessToken}`;
        const filterByCountry = filter.country ? `&country=${filter.country}` : "";
        const filterByLanguage = filter.language ? `&language=${filter.language}` : "";

        const searchUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchableAddress}.json?${authPart}&autocomplete=true${filterByCountry}${filterByLanguage}`
        return fetch(searchUrl)
            .then(response => response.json())
            .then(foundPlaces => {
                    if (foundPlaces.type === "FeatureCollection") {
                        return foundPlaces.features.map((place: any) => {
                            const lat = place.center[1];
                            const long = place.center[0];
                            const geohash = Geohash.encode(lat, long, 8);
                            return {
                                latitude: lat,
                                longitude: long,
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

