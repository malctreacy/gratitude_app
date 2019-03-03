import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { ActivatedRoute } from '@angular/router';

import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  public currentEvent: any = {};
  public guestPicture: string = null;
  public eventName: string;

  constructor(private eventService: EventService, private route: ActivatedRoute) {}

  ngOnInit() {
    const eventId: string = this.route.snapshot.paramMap.get('id');
    this.eventName = eventId;
    this.eventService
      .getEventDetail(eventId)
      .get()
      .then(eventSnapshot => {
        this.currentEvent = eventSnapshot.data();
        this.currentEvent.id = eventSnapshot.id;
      });
  }

  async takePicture(): Promise<void> {
    try {
      const profilePicture = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
      this.guestPicture = profilePicture.base64Data.slice(23);
    } catch (error) {
      console.error(error);
    }
  }
}
