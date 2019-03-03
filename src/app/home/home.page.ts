import {Component, OnInit} from '@angular/core';
import { EventService } from '../services/event/event.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    public eventList: Array<any>;
    constructor(private eventService: EventService) {}

    ngOnInit() {
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
        this.getImage(this, this.eventList);
    }

    getImage(image: any, evntarr: Array<any>) {

      if ( evntarr === undefined ) {
        return '../../assets/imgs/loading.svg';
      }
      if ( evntarr.length <= 5 ) {
        return '../../assets/imgs/tree1.png';
      }
      if ( evntarr.length > 5 &&  evntarr.length <= 15 ) {
        return '../../assets/imgs/tree2.png';
      }
      if ( evntarr.length > 15 &&  evntarr.length <= 25 ) {
          return '../../assets/imgs/tree3.png';
      }
      if ( evntarr.length > 25 &&  evntarr.length <= 50 ) {
          return '../../assets/imgs/tree4.png';
      }
      if ( evntarr.length > 50 ) {
          return '../../assets/imgs/tree5.png';
      }
    }
}
