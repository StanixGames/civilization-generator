import * as firebase from 'firebase';
import {FBDraftModel} from './FBDraft';

export interface FBUserModel {
  nickName: string;
  email: string;
  avatarUrl: string;
  drafts: firebase.firestore.DocumentReference<FBDraftModel>[];
}
