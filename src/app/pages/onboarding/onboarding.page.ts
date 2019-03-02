import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController, ToastController, Platform } from '@ionic/angular';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import * as moment from 'moment';

@Component({
    selector: 'app-onboarding',
    templateUrl: './onboarding.page.html',
    styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
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


    constructor(
        private storage: Storage,
        private router: Router,
        public platform: Platform,
        private alertCtrl: AlertController,
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
    }

    async finish() {
        await this.storage.set('tutorialComplete', true);
        this.router.navigateByUrl('home'); // change to home
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

        if (this.platform.is('cordova')) {

            // Cancel any existing notifications
            this.localNotifications.cancelAll().then(() => {

                // Schedule the new notifications
                this.localNotifications.schedule(this.notifications);

                this.notifications = [];
            });
        }

    }



}

