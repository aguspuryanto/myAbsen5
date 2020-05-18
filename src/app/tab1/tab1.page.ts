import { Component } from '@angular/core';
import { Capacitor, Plugins } from '@capacitor/core';

// const { Capacitor } = Plugins;
const { Geolocation } = Plugins;
const { Device } = Plugins;

import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  coords: any;
  address: any;
  
  constructor(private nativeGeocoder: NativeGeocoder, private localNotifications: LocalNotifications) {
    console.log('Capacitor.platform', Capacitor.platform); // web ios android
    console.log( this.deviceInfo() );
    // Schedule a single notification
    // this.localNotifications.schedule({
    //   id: 1,
    //   text: 'Single ILocalNotification',
    //   sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
    //   data: { secret: key }
    // });

    // Schedule multiple notifications
    this.localNotifications.schedule([{
      id: 1,
      title: 'Local ILocalNotification Example',
      text: 'Multi ILocalNotification 1',
      icon: 'http://example.com/icon.png'
    }, {
      id: 2,
      title: 'Local ILocalNotification Example',
      text: 'Multi ILocalNotification 2',
      icon: 'http://example.com/icon.png'
    }]);
  }

  async deviceInfo(){
    const info = await Device.getInfo();
    console.log(info);
  }

  async locate() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);
    this.coords = coordinates.coords;
  }

  async reverseGeocode() {
    if (!this.coords) {
      const coordinates = await Geolocation.getCurrentPosition();
      this.coords = coordinates.coords;
    }
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(this.coords.latitude, this.coords.longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        console.log(result);
        this.address = result[0];
      })
      .catch((error: any) => console.log(error));
  }
}
