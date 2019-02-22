import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  private posts : any = [];

  constructor() { }

  ngOnInit() {
    this.loadPosts();
  }

    private loadPosts() {
        this.posts = [
            {
                gratitude_q   : 'Gratitude Statement 1',
                time    : 'Febuary 20, 08:30 pm',
                content : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n
        Requiescat in pace `
            },
            {
                gratitude_q   : 'Featured Article',
                time    : 'Date Written',
                content : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n
        Requiescat in pace `
            },
            {
                gratitude_q   : 'Gratitude Statement 3',
                time    : 'January 01, 01:00 am',
                content : 'Dormit deus faciunt dormit perpetua astra deus Auroram videre potest'
            }
        ];
    }
    private refresh(refresher : any) {
        setTimeout(() => {
            this.loadPosts();
            refresher.complete();
        }, 2000);
    }



}
