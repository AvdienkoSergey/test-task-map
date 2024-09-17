import { YandexMap } from "./MapYandex";
import { LeafletMap } from "./MapLeaflet";

class _WorldMap extends YandexMap {
  constructor() {
    super();
  }
}

const WorldMap = new _WorldMap();

export { WorldMap, _WorldMap };
