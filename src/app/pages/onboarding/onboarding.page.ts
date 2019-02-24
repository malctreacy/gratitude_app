import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Component({
    selector: 'app-onboarding',
    templateUrl: './onboarding.page.html',
    styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

    constructor(private storage: Storage, private router: Router ) { }

    ngOnInit() {
    }

    async finish() {
        await this.storage.set('tutorialComplete', true);
        this.router.navigateByUrl('home'); // change to home
    }

}

