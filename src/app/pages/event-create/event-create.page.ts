import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit() {}

  createEvent(
    gratitudePrompt: string,
    gratitudeStatement: string,
  ): void {
    if (
      gratitudePrompt === undefined ||
      gratitudeStatement === undefined
    ) {
      return;
    }
    this.eventService
      .createEvent(gratitudePrompt, gratitudeStatement)
      .then(() => {
        this.router.navigateByUrl('');
      });
  }
}
