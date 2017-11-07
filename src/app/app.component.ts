/// <reference path="WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      /** Enter your Wikitude (trial) License Key here. You can register and download your free license key here: http://www.wikitude.com/developer/licenses */      
      WikitudePlugin._sdkKey = "lsEQmxUhiYZFxIKUpEZwkFBkJvaM6S6Pt/gmSvv+PTyRPLbZ8D9jJu6Eb4GUQl7BCVBWc6cX1wqS5iqP5gW4rk+mPXrdHiv3EclhwUF6DUZhrdj7Wtdh9HJdvNWc1eFMzvT+2jEbCDUkR7inHdQhaIBnbJQ73PVNcTvNO4XmUBVTYWx0ZWRfX3r/3EzUOWDqOZLYAApf2fC7ktTkbrnhQlaeR0neL9P6V1eT0FonkxcuGtbZ5QzrRD+7v5MBpLDZNGGT0qT55QobLnAnAU1YCDcurCMeiO2MSQpHgQ4AiBon9Au4UVWFwO3NE4XSxlQm94stPJrijsaFRKPQ/3ZIdfz/U9lQonj5gXwxCGMzpg9JJacxZ1mMaUN9R6kQ9jZZEAWm231el0fQ8CWwO58zykbr9WPkQTnm/JQHoFYpEP09qN31xO356AB1ue9NBJW6wVI9EYo3DlAyva1XuPdud0K50l3Yc6DKHFgBZy5IvUUUhwn5Nu9pSWLS0h6m05fxFL0DvD0JXC/h+jO3ZeMjXbVstAs4bdAyGNYQPhXsd1nr+bga+Rh42k71itElpKAbyWER62njcIddwUE6kN6HRsa0vZdtH8RwpNAhF/npJQJH7ILnfE1d74SKLa+Hzp8OHC8ViEuD64zlhvmMx63QXCQzDC65okK35G7fmQqZHNw=";

      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
          function(success) {
            console.log("Your platform supports AR/Wikitude. Have fun developing!!");
          },
          function(fail) {
            console.log("Your platform failed to run AR/Wikitude: "+fail);
          },
          [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
      );                  

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
       * through the function below for the direction Ionic2 app --> Wikitude SDK 
       * For calls from Wikitude SDK --> Ionic2 app see the captureScreen example in 
       * WikitudeIonic2StarterApp/www/assets/3_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View  
      WikitudePlugin.setOnUrlInvokeCallback(function(url) {

        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
        if (url.indexOf('captureScreen') > -1) {
            WikitudePlugin.captureScreen(
                (absoluteFilePath) => {
                    console.log("snapshot stored at:\n" + absoluteFilePath);

                    // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                    WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                },
                (errorMessage) => {
                    console.log(errorMessage);
                },
                true, null
            );
        } else {
            alert(url + "not handled");
        }
      });

      /**
       * Define the generic ok callback
       */
      WikitudePlugin.onWikitudeOK = function() {
          console.log("Things went ok.");
      }
      
      /**
       * Define the generic failure callback
       */
      WikitudePlugin.onWikitudeError = function() {
          console.log("Something went wrong");
      }

      // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
      // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
      //WikitudePlugin.setLocation(47, 13, 450, 1);

      /* for Android only
      WikitudePlugin.setBackButtonCallback(
          () => {
              console.log("Back button has been pressed...");
          }
      );                  
      */

    });
  }
}
