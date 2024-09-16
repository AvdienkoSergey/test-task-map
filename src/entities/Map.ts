import { YandexMap } from "./MapYandex";

class _WorldMap extends YandexMap {
  constructor() {
    super();
  }
}

const WorldMap = new _WorldMap();

export { WorldMap, _WorldMap };
