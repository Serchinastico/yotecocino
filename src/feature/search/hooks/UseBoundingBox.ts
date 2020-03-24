import { Coordinates } from "foundation/types/Coordinates";

export interface BoundingBox {
  swCoordinate: Coordinates;
  neCoordinate: Coordinates;
}

export function useBoundingBox(coordinates: Coordinates[]): BoundingBox {
  const allLatitudes = coordinates.map(c => c.latitude);
  const allLongitudes = coordinates.map(c => c.longitude);
  const minLatitude = allLatitudes.reduce(
    (a: number, b: number) => (a < b ? a : b),
    90
  );
  const maxLatitude = allLatitudes.reduce(
    (a: number, b: number) => (a > b ? a : b),
    -90
  );
  const minLongitude = allLongitudes.reduce(
    (a: number, b: number) => (a < b ? a : b),
    180
  );
  const maxLongitude = allLongitudes.reduce(
    (a: number, b: number) => (a > b ? a : b),
    -180
  );
  return {
    swCoordinate: { latitude: minLatitude, longitude: minLongitude },
    neCoordinate: { latitude: maxLatitude, longitude: maxLongitude }
  };
}
