import { YandexMap } from "@/entities/MapYandex";

describe("WorldMap in YandexMap class implementation", () => {
  let worldMap: YandexMap;
  let mockYmaps: any;

  beforeEach(() => {
    mockYmaps = {
      ready: jest.fn((callback) => callback()),
      Map: jest.fn(() => ({
        setCenter: jest.fn(),
        panTo: jest.fn(),
        geoObjects: {
          add: jest.fn(),
          remove: jest.fn(),
        },
        events: {
          add: jest.fn(),
          remove: jest.fn(),
        },
      })),
      Placemark: jest.fn(() => ({})),
    };

    // @ts-ignore
    (global as any).ymaps = mockYmaps;

    worldMap = new YandexMap();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should initialize the map correctly", async () => {
    const config = {
      containerId: "map",
      center: [55.751244, 37.618423],
      zoom: 10,
      controls: ["zoomControl"],
    };

    await worldMap.initialization(config);

    expect(mockYmaps.Map).toHaveBeenCalledWith("map", {
      center: [55.751244, 37.618423],
      zoom: 10,
      controls: ["zoomControl"],
    });
    expect(worldMap["map"]).toBeDefined();
  });

  test("should set center of the map", () => {
    const mockSetCenter = jest.fn();
    const coordinates = [55.751244, 37.618423];

    worldMap["map"] = { setCenter: mockSetCenter } as any;
    worldMap["center"] = coordinates as any;

    worldMap.displayOnTheScreen();

    expect(mockSetCenter).toHaveBeenCalledWith(coordinates);
  });

  test("should enable event tracking", () => {
    const mockAddEvent = jest.fn();
    worldMap["map"] = { events: { add: mockAddEvent } } as any;

    const mockEventCallback = jest.fn();
    worldMap.createTrackingEvent(mockEventCallback);
    worldMap.enableEventTracking();

    expect(mockAddEvent).toHaveBeenCalledWith("click", mockEventCallback);
  });

  test("should disable event tracking", () => {
    const mockRemoveEvent = jest.fn();
    worldMap["map"] = { events: { remove: mockRemoveEvent } } as any;

    const mockEventCallback = jest.fn();
    worldMap.createTrackingEvent(mockEventCallback);
    worldMap.disableEventTracking();

    expect(mockRemoveEvent).toHaveBeenCalledWith("click", mockEventCallback);
  });

  test("should pan around the map", async () => {
    const mockPanTo = jest.fn();
    worldMap["map"] = { panTo: mockPanTo } as any;

    const coordinates = [55.751244, 37.618423];
    await worldMap.moveAroundTheMap(coordinates);

    expect(mockPanTo).toHaveBeenCalledWith(coordinates, {
      flying: false,
      duration: 500,
    });
  });

  test("should add all objects to the map", () => {
    const mockAddObject = jest.fn();
    worldMap["map"] = { geoObjects: { add: mockAddObject } } as any;

    const objects = [{}, {}];
    worldMap.putAllObjects(objects as any[]);

    expect(mockAddObject).toHaveBeenCalledTimes(objects.length);
  });

  test("should remove all objects from the map", () => {
    const mockRemoveObject = jest.fn();
    worldMap["map"] = { geoObjects: { remove: mockRemoveObject } } as any;

    const objects = [{}, {}];
    worldMap.deleteAllObjects(objects as any[]);

    expect(mockRemoveObject).toHaveBeenCalledTimes(objects.length);
  });

  test("should add one object to the map", () => {
    const mockAddObject = jest.fn();
    worldMap["map"] = { geoObjects: { add: mockAddObject } } as any;

    const object = {
      id: 1,
      latitude: 55.751244,
      longitude: 37.618423,
    };

    worldMap.putOneObject(object as any);

    expect(mockAddObject).toHaveBeenCalled();
  });
});
