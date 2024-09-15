const asyncGetCurrentCoordinates = (): Promise<number[]> =>
  new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve([position.coords.latitude, position.coords.longitude]),
        (error) =>
          reject(`Error occurred while fetching location: ${error.message}`),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      resolve([43.226259, 76.901672]);
    }
  });

export { asyncGetCurrentCoordinates };
