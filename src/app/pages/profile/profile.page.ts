import { Component, OnInit} from '@angular/core';
import { AlertController, ToastController, Platform } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/user/profile.service';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  notifyTime: any;
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
    timeChange(time) {
        this.chosenHours = time.hour.value;
        this.chosenMinutes = time.minute.value;
    }
  getDays() {
    console.log(this.notifyTime);
    this.timeChange(this.notifyTime);
    this.presentNotifyOn();
    this.sun = (<any> document.getElementById('weekday-sun')).checked;
    this.mon = (<any> document.getElementById('weekday-mon')).checked;
    this.tues = (<any> document.getElementById('weekday-tue')).checked;
    this.weds = (<any> document.getElementById('weekday-wed')).checked;
    this.thurs = (<any> document.getElementById('weekday-thu')).checked;
    this.fri = (<any> document.getElementById('weekday-fri')).checked;
    this.sat = (<any> document.getElementById('weekday-sat')).checked;
    console.log(this.sun);
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

    this.days[0].checked = this.mon;
    this.days[1].checked = this.tues;
    this.days[2].checked = this.weds;
    this.days[3].checked = this.thurs;
    this.days[4].checked = this.fri;
    this.days[5].checked = this.sat;
    this.days[6].checked = this.sun;

    console.log(this.days);

    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.

    for (let day of this.days){

        if (day.checked){

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

            this.notifications.push(notification);

        }

    }

    console.log("Notifications to be scheduled: ", this.notifications);

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


