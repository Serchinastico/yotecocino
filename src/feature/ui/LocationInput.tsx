import React from "react";
import ReactMapGL, {GeolocateControl, ViewportProps} from "react-map-gl";
import config from "../../core/Config";
import * as Geohash from "latlon-geohash";
import ConvertLocationToCoords, {RichLocation} from "../../core/places/ConvertLocationToCoords";
import SearchPlacesInput from "./SearchPlaceInput";

interface Props {
    setAddress: (address: string) => void,
    setLocation: (location: RichLocation) => void
    address: string | null,
    showMap: boolean,
    mapWidth: number | string,
    mapHeight: number | string,
    convertLocation: ConvertLocationToCoords
}

interface DefaultProps {
    showMap: boolean,
    mapWidth: number | string,
    mapHeight: number | string
    convertLocation: ConvertLocationToCoords
}

type LocationProps = Props & DefaultProps;

const geolocateStyle = {
    top: 0,
    left: 0,
    margin: 10
};

class LocationInput extends React.Component<LocationProps, any> {
    public static defaultProps: Partial<LocationProps> = {
        showMap: true,
        mapWidth: "100%",
        mapHeight: 400,
        convertLocation: new ConvertLocationToCoords()
    };

    constructor(props: LocationProps) {
        super(props);
        this.state = {
            viewport: {
                width: props.mapWidth,
                height: props.mapHeight,
                mapStyle: config.mapLayout,
                longitude: -3.703790,
                latitude: 40.416775,
                zoom: 14
            }
        };
        this.updateViewPort = this.updateViewPort.bind(this);
        this.logLocation = this.logLocation.bind(this);
        this.searchAddress = this.searchAddress.bind(this);
    }

    searchAddress(address: string) {
        this.props.convertLocation.search(address)
            .then(console.log)
            .catch(console.error);
        this.props.setAddress(address);
    }

    render() {
        const {address} = this.props;
        const {viewport} = this.state;
        const auth = {
            mapboxApiAccessToken: config.mapsToken
        }
        return <div>
            <div>
                <ReactMapGL
                    {...auth}
                    {...viewport}
                    onViewportChange={this.updateViewPort}>
{/*
                    <GeolocateControl
                        label="Foooo"
                        style={geolocateStyle}
                        positionOptions={{enableHighAccuracy: true}}
                        trackUserLocation={true}
                        showUserLocation={true}
                        onGeolocate={this.logLocation}
                    />
*/}
                        <SearchPlacesInput/>
{/*
                    <input
                        type="text"
                        value={address ?? ""}
                        onChange={event => this.searchAddress(event.target.value)}
                    />
*/}
                </ReactMapGL>
            </div>
        </div>
    }

    private logLocation(location: any) {
        const lat = location.coords.latitude;
        const long = location.coords.longitude;
        const geohash = Geohash.default.encode(lat, long, 8);
        this.props.setLocation({
            lat: lat,
            long: long,
            geohash: geohash
        });
        this.updateViewPort(
            {
                ...this.state.viewport,
                longitude: long,
                latitude: lat,
                zoom: 16
            }
        );
    }

    private updateViewPort(viewport: ViewportProps) {
        const viewPortWithToken = {
            ...viewport,
            mapboxApiAccessToken: config.mapsToken,
            width: this.props.mapWidth,
            height: this.props.mapHeight,
            mapStyle: config.mapLayout,
        };
        return this.setState({viewport: viewPortWithToken});
    }
}

export default LocationInput;