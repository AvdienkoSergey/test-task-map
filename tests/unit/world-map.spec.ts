import { _WorldMap } from "@/entities/Map";

describe("_WorldMap", () => {
  let yandexMap: _WorldMap;
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
    };

    // @ts-ignore
    (global as any).ymaps = mockYmaps;

    yandexMap = new _WorldMap();
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

    await yandexMap.initialization(config);

    expect(mockYmaps.Map).toHaveBeenCalledWith("map", {
      center: [55.751244, 37.618423],
      zoom: 10,
      controls: ["zoomControl"],
    });
    expect(yandexMap["map"]).toBeDefined();
  });

  test("should set center of the map", () => {
    const mockSetCenter = jest.fn();
    yandexMap["map"] = { setCenter: mockSetCenter } as any; // Мокируем карту

    const coordinates = [55.751244, 37.618423];
    yandexMap.displayOnTheScreen(coordinates);

    expect(mockSetCenter).toHaveBeenCalledWith(coordinates);
  });

  test("should enable event tracking", () => {
    const mockAddEvent = jest.fn();
    yandexMap["map"] = { events: { add: mockAddEvent } } as any; // Мокируем карту

    const mockEventCallback = jest.fn();
    yandexMap.createTrackingEvent(mockEventCallback);
    yandexMap.enableEventTracking();

    expect(mockAddEvent).toHaveBeenCalledWith("click", mockEventCallback);
  });

  test("should disable event tracking", () => {
    const mockRemoveEvent = jest.fn();
    yandexMap["map"] = { events: { remove: mockRemoveEvent } } as any; // Мокируем карту

    const mockEventCallback = jest.fn();
    yandexMap.createTrackingEvent(mockEventCallback);
    yandexMap.disableEventTracking();

    expect(mockRemoveEvent).toHaveBeenCalledWith("click", mockEventCallback);
  });

  test("should pan around the map", async () => {
    const mockPanTo = jest.fn();
    yandexMap["map"] = { panTo: mockPanTo } as any; // Мокируем карту

    const coordinates = [55.751244, 37.618423];
    await yandexMap.moveAroundTheMap(coordinates);

    expect(mockPanTo).toHaveBeenCalledWith(coordinates, {
      flying: false,
      duration: 500,
    });
  });

  test("should add all objects to the map", () => {
    const mockAddObject = jest.fn();
    yandexMap["map"] = { geoObjects: { add: mockAddObject } } as any; // Мокируем карту

    const objects = [{}, {}];
    yandexMap.putAllObjects(objects as any[]);

    expect(mockAddObject).toHaveBeenCalledTimes(objects.length);
  });

  test("should remove all objects from the map", () => {
    const mockRemoveObject = jest.fn();
    yandexMap["map"] = { geoObjects: { remove: mockRemoveObject } } as any; // Мокируем карту

    const objects = [{}, {}];
    yandexMap.deleteAllObjects(objects as any[]);

    expect(mockRemoveObject).toHaveBeenCalledTimes(objects.length);
  });

  test("should add one object to the map", () => {
    const mockAddObject = jest.fn();
    yandexMap["map"] = { geoObjects: { add: mockAddObject } } as any; // Мокируем карту

    const object = {};
    yandexMap.putOneObject(object as any);

    expect(mockAddObject).toHaveBeenCalledWith(object);
  });
});
