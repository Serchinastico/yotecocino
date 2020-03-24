import React from "react";
import ReactMapGL, { Marker, ViewportProps } from "react-map-gl";
import config from "../../foundation/Config";
import { RichLocation } from "../../foundation/types/Coordinates";
import SearchPlacesInput from "./SearchPlaceInput";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { withStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

const styles = () => ({
  marker: {
    color: red[500],
    height: 35,
    width: 35
  }
});

interface Props {
  setLocation: (location: RichLocation) => void;
  address?: string | null;
  showMap: boolean;
  mapWidth: number | string;
  mapHeight: number | string;
  classes: any;
}

interface DefaultProps {
  showMap: boolean;
  mapWidth: number | string;
  mapHeight: number | string;
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
    mapHeight: 400
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

  updateAddress(address: RichLocation) {
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
    const { address, classes, showMap } = this.props;
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
      />
    );

    const search = showMap ? (
      <ReactMapGL
        {...auth}
        {...mapConfig}
        {...viewport}
        onViewportChange={this.updateViewPort}
      >
        {searchPlacesInput}
        {markerInMap}
      </ReactMapGL>
    ) : (
      searchPlacesInput
    );

    return <div>{search}</div>;
  }

  private updateViewPort(viewport: ViewportProps) {
    return this.setState((prev: any) => ({
      ...prev,
      viewport
    }));
  }
}

export default withStyles(styles)(LocationInput);
