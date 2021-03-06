import { Component, OnInit} from '@angular/core';
import { AlertController, ToastController, Platform } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/user/profile.service';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import * as moment from 'moment';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public eventCount: any;
  public eventLevel: any;
  public eventList: Array<any>;
  notifyTime: any;
  formatedNotifyTime: any
  notifications: any[] = [];
  days: any[];
  mon: boolean;
  tues: boolean;
  weds: boolean;
  thurs: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
  chosenHours: number;
  chosenMinutes: number;
  public userProfile: any;
  public birthDate: Date;
  constructor(
    private alertCtrl: AlertController,
    public platform: Platform,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    public localNotifications: LocalNotifications,
    private eventService: EventService,
    public toastController: ToastController
  ) {
      this.days = [
          {title: 'Monday', dayCode: 1, checked: false},
          {title: 'Tuesday', dayCode: 2, checked: false},
          {title: 'Wednesday', dayCode: 3, checked: false},
          {title: 'Thursday', dayCode: 4, checked: false},
          {title: 'Friday', dayCode: 5, checked: false},
          {title: 'Saturday', dayCode: 6, checked: false},
          {title: 'Sunday', dayCode: 0, checked: false}
      ];
      this.notifyTime = moment(new Date()).format();

      this.chosenHours = new Date().getHours();
      this.chosenMinutes = new Date().getMinutes();

  }

  ngOnInit() {
    this.profileService
      .getUserProfile()
      .get()
      .then(userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
      });
      this.eventService
          .getEventList()
          .get()
          .then(eventListSnapshot => {
              this.eventList = [];
              eventListSnapshot.forEach(snap => {
                  this.eventList.push({
                      name: snap.data().name,
                      content: snap.data().content,
                  });
                  return false;
              });
          });
      this.progressBar(this, this.eventList);
  }

  progressBar(ratio: any, evntarr: Array<any>) {
      if ( evntarr === undefined ) {
          return '1';
      }
      if ( evntarr.length <= 5 ) {
          return evntarr.length / 5;
      }
      if ( evntarr.length > 5 &&  evntarr.length <= 15 ) {
          return evntarr.length / 15;
      }
      if ( evntarr.length > 15 &&  evntarr.length <= 25 ) {
          return evntarr.length / 25;
      }
      if ( evntarr.length > 25 &&  evntarr.length <= 50 ) {
          return evntarr.length / 50;
      }
      if ( evntarr.length > 50 ) {
          return 1;
      }
  }

  logOut(): void {
    this.authService.logoutUser().then(() => {
      this.router.navigateByUrl('login');
    });
  }

  async updateName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: 'Your first name & last name',
      inputs: [
        {
          type: 'text',
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName,
        },
        {
          type: 'text',
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName,
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService.updateName(data.firstName, data.lastName);
          },
        },
      ],
    });
    await alert.present();
  }

  async updateEmail(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { type: 'text', name: 'newEmail', placeholder: 'Your new email' },
        { name: 'password', placeholder: 'Your password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService
              .updateEmail(data.newEmail, data.password)
              .then(() => {
                console.log('Email Changed Successfully');
              })
              .catch(error => {
                console.log('ERROR: ' + error.message);
              });
          },
        },
      ],
    });
    await alert.present();
  }

  async updatePassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService.updatePassword(data.newPassword, data.oldPassword);
          },
        },
      ],
    });
    await alert.present();
  }
  async presentCancel() {
      const toast = await this.toastController.create({
          message: 'All notifications cancelled.',
          duration: 2000
      });
      toast.present();
  }
  async presentNotifyOn() {
      const toast = await this.toastController.create({
          message: 'Your notification settings have been saved.',
          duration: 2000
      });
      toast.present();
  }
  onSun(eventObject) {
      if (eventObject.target.checked) {
          this.sun = true;
      } else {
          this.sun = false;
      }
  }
  onMon(eventObject) {
        if (eventObject.target.checked) {
            this.mon = true;
        } else {
            this.mon = false;
        }
  }
    onTue(eventObject) {
        if (eventObject.target.checked) {
            this.tues = true;
        } else {
            this.tues = false;
        }
    }
    onWed(eventObject) {
        if (eventObject.target.checked) {
            this.weds = true;
        } else {
            this.weds = false;
        }
    }

    onThu(eventObject) {
        if (eventObject.target.checked) {
            this.thurs = true;
        } else {
            this.thurs = false;
        }
    }

    onFri(eventObject) {
        if (eventObject.target.checked) {
            this.fri = true;
        } else {
            this.fri = false;
        }
    }

    onSat(eventObject) {
        if (eventObject.target.checked) {
            this.sat = true;
        } else {
            this.sat = false;
        }
    }

  getDays() {
    this.presentNotifyOn();
    console.log(this.notifyTime);
    this.formatedNotifyTime = moment(this.notifyTime);
    this.chosenHours = this.formatedNotifyTime.hour();
    this.chosenMinutes = this.formatedNotifyTime.minutes();
    this.addNotifications();
  }

  addNotifications() {
    this.days = [
        {title: 'Monday', dayCode: 1, checked: false},
        {title: 'Tuesday', dayCode: 2, checked: false},
        {title: 'Wednesday', dayCode: 3, checked: false},
        {title: 'Thursday', dayCode: 4, checked: false},
        {title: 'Friday', dayCode: 5, checked: false},
        {title: 'Saturday', dayCode: 6, checked: false},
        {title: 'Sunday', dayCode: 0, checked: false}
    ];

    console.log(this.days);
    this.days[0].checked = this.mon;
    this.days[1].checked = this.tues;
    this.days[2].checked = this.weds;
    this.days[3].checked = this.thurs;
    this.days[4].checked = this.fri;
    this.days[5].checked = this.sat;
    this.days[6].checked = this.sun;



    const currentDate = new Date();
    // console.log(currentDate);
    const currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
    console.log(currentDay);

    for (let day of this.days) {

        if (day.checked) {

            const firstNotificationTime = new Date();
            let dayDifference = day.dayCode - currentDay;
            if (dayDifference < 0) {
                dayDifference = dayDifference + 7; // for cases where the day is in the following week
            }

            firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
            firstNotificationTime.setHours(this.chosenHours);
            firstNotificationTime.setMinutes(this.chosenMinutes);

            let notification = {
                id: day.dayCode,
                title: 'Gratitude App',
                text: 'Time to practice a little gratitude.',
                at: firstNotificationTime,
                every: 'week'
            };

            console.log(notification);

            this.notifications.push(notification);
        }
    }
    console.log(this.notifications);

    if (this.platform.is('cordova')){

        // Cancel any existing notifications
        this.localNotifications.cancelAll().then(() => {

            // Schedule the new notifications
            this.localNotifications.schedule(this.notifications);

            this.notifications = [];
        });
    }

  }

  cancelAll() {
    this.localNotifications.cancelAll();
    this.presentCancel();
  }

}


