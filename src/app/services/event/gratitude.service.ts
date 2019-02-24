import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Injectable({
    providedIn: 'root',
})
export class GratitudeService {
    public gratitudeListRef: firebase.firestore.CollectionReference;
    constructor() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.gratitudeListRef = firebase
                    .firestore()
                    .collection(`/gratitudePrompts/o7KVw1M8HUpriMOT1JZp/gratitudeStatements`);
            }
        });
    }

    getGratitudeList(): firebase.firestore.CollectionReference {
        return this.gratitudeListRef;
    }

    getGratitudeStatement(): firebase.firestore.DocumentReference {
        return this.gratitudeListRef.doc('gratitudeList');
    }
}