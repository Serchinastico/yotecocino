import React from "react";
import ReactMapGL, { Marker, ViewportProps } from "react-map-gl";
import config from "../../foundation/Config";
import SearchPlacesInput from "./SearchPlaceInput";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { withStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import { Coordinates } from "../../foundation/types/Coordinates";

const styles = () => ({
  marker: {
    color: red[500],
    height: 35,
    width: 35
  }
});

interface Props {
  setLocation: (location: Coordinates) => void;
  address?: string | null;
  showMap: boolean;
  mapWidth: number | string;
  mapHeight: number | string;
  classes: any;
  errorMessage: string | null;
  label: string | null;
  hint?: string;
}

interface DefaultProps {
  showMap: boolean;
  mapWidth: number | string;
  mapHeight: number | string;
  errorMessage: string | null;
}

type LocationProps = Props & DefaultProps;

type LocationInputState = {
  viewport: any;
  marker: any | null;
};

class LocationInput extends React.Component<LocationProps, LocationInputState> {
  public static defaultProps: Partial<LocationProps> = {
    showMap: true,
    mapWidth: "100%",
    mapHeight: 400,
    errorMessage: null
  };

  constructor(props: LocationProps) {
    super(props);
    this.state = {
      viewport: {
        longitude: -3.70379,
        latitude: 40.416775,
        zoom: 14
      },
      marker: null
    };
    this.updateViewPort = this.updateViewPort.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
  }

  updateAddress(address: Coordinates) {
    this.props.setLocation(address);
    this.setState((prev: any) => ({
      ...prev,
      viewport: {
        ...prev.viewport,
        latitude: address.latitude,
        longitude: address.longitude
      },
      marker: {
        latitude: address.latitude,
        longitude: address.longitude
      }
    }));
  }

  render() {
    const { address, classes, errorMessage, label, showMap, hint } = this.props;
    const { marker, viewport } = this.state;
    const auth = {
      mapboxApiAccessToken: config.mapsToken
    };
    const mapConfig = {
      width: this.props.mapWidth,
      height: this.props.mapHeight,
      mapStyle: config.mapLayout
    };

    const markerInMap = marker ? (
      <Marker {...marker}>
        <LocationOnIcon className={classes.marker} />
      </Marker>
    ) : null;

    const searchPlacesInput = (
      <SearchPlacesInput
        {...auth}
        country={config.country}
        language={config.language}
        onChange={this.updateAddress}
        address={address}
        errorMessage={errorMessage}
        label={label}
        hint={hint}
      />
    );

    const map = showMap ? (
      <ReactMapGL
        {...auth}
        {...mapConfig}
        {...viewport}
        onViewportChange={this.updateViewPort}
      >
        {markerInMap}
      </ReactMapGL>
    ) : null;

    return (
      <div>
        {searchPlacesInput}
        {map}
      </div>
    );
  }

  private updateViewPort(viewport: ViewportProps) {
    return this.setState((prev: any) => ({
      ...prev,
      viewport
    }));
  }
}

export default withStyles(styles)(LocationInput);
