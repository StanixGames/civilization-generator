import * as firebase from 'firebase';

export interface FBDraftModel {
  name: string;
  users: {
    accepted: boolean;
    userRef: firebase.firestore.DocumentReference,
  }[],
}