import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  public eventListRef: firebase.firestore.CollectionReference;
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.eventListRef = firebase
          .firestore()
          .collection(`/userProfile/${user.uid}/gratitudeTimeline`);
      }
    });
  }

  getEventList(): firebase.firestore.CollectionReference {
    return this.eventListRef;
  }

  createEvent(
    gratitudePrompt: string,
    gratitudeStatement: string
  ): Promise<firebase.firestore.DocumentReference> {
    return this.eventListRef.add({
      name: gratitudePrompt,
      content: gratitudeStatement
    });
  }

  getEventDetail(eventId: string): firebase.firestore.DocumentReference {
    return this.eventListRef.doc(eventId);
  }
}
