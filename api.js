import {
  PermissionsAndroid,
} from 'react-native';

export class Api {

  static async requestLocationPermission() {
    return new Promise((resolve, reject) => {
      resolve();
    });
    // try {
    //   const granted = await PermissionsAndroid.requestPermission(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    //     {
    //       'title': 'KidsLists Location Permission',
    //       'message': 'We need access to the location to give you customized recommendations.'
    //     }
    //   )
    //   if (granted) {
    //   } else {
    //     console.log("Location permission denied")
    //   }
    // } catch (err) {
    //   console.warn(err)
    // }
  }

  static async getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        resolve(pos.coords);
      }, (err) => {
        reject(err);
      });
    });
  }

  static async getEvents() {
    return Api.requestLocationPermission()
      .then(Api.getLocation)
      .then((location) => {
        return fetch('http://kidslists.herokuapp.com/api/v1');
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  }
}