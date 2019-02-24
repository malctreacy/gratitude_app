import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event/event.service';
import { GratitudeService } from '../../services/event/gratitude.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  public gratitude: any = {};
  public gratitudeStatement: string;
  constructor(private router: Router, private eventService: EventService, private gratitudeService: GratitudeService) {}

  ngOnInit() {
      this.gratitudeService
          .getGratitudeStatement()
          .get()
          .then(eventSnapshot => {
              this.gratitude = eventSnapshot.data();
          });
      // this.getGratitude();
  }

  createEvent(
    gratitudeResponse: string,
  ): void {
    if (
      gratitudeResponse === undefined
    ) {
      return;
    }
    this.eventService
      .createEvent(this.gratitudeStatement, gratitudeResponse)
      .then(() => {
        this.router.navigateByUrl('');
      });
  }

  getGratitude() {
    const gratitudeArr = this.gratitude.gratitude;
    this.gratitudeStatement = gratitudeArr[Math.floor(Math.random() * gratitudeArr.length)];
    // console.log(this.gratitudeStatement);
  }
}
