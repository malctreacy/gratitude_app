import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
declare var require: any;

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {
  public counter: any;
  public articleCount: any;
  public size: any;
  public eventList: Array<any>;
  public url: string;
  public resultList: Array<any>;
  public numbers: Array<any>;
  public newsFeedArr: Array<any>;
  public gratitudeFeedArr: Array<any>;
  constructor(private eventService: EventService) {}

  ngOnInit() {
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('f27f44c23fff4a20a975cc914dd615d4');

    newsapi.v2.everything({
        q: 'positivity',
        language: 'en',
        sortBy: 'relevancy',
    }).then(response => {
        this.resultList = response;

    });
    this.eventService
      .getEventList()
      .get()
      .then(eventListSnapshot => {
        this.eventList = [];
        eventListSnapshot.forEach(snap => {
          this.eventList.push({
            id: snap.id,
            name: snap.data().name,
            content: snap.data().content,
          });
          return false;
        });

      this.delay(1000);
      this.counter = 0;
      this.articleCount = 0;
      this.size = this.eventList.length;
      if (this.size >= 5 ) {
          for (let _i = 0; _i < this.eventList.length; _i++) {
              if (this.counter === 4) {
                  this.eventList.splice(_i, 0, {
                      id: this.resultList['articles'][this.articleCount]['title'],
                      name: this.resultList['articles'][this.articleCount]['title'],
                      content: this.resultList['articles'][this.articleCount]['description'],
                  });
                  this.counter = 0;
                  this.articleCount++;
              }
              this.counter++;
          }
      }
      if (this.size < 5 ) {
          for (let _i = 0; _i < this.eventList.length; _i++) {
              if (this.counter === 2) {
                  this.eventList.splice(_i, 0, {
                      id: this.resultList['articles'][this.articleCount]['title'],
                      name: this.resultList['articles'][this.articleCount]['title'],
                      content: this.resultList['articles'][this.articleCount]['description'],
                  });
                  this.counter = 0;
                  this.articleCount++;
              }
              this.counter++;
              console.log(this.counter);
          }
      }

      });
  }

  async delay(ms: number) {
      await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }
}
