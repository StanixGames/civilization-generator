import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {Nation} from '../types/Nation';

firebase.initializeApp({
  apiKey: "AIzaSyBbcZSxy-K_LdSktzxdq04u1AnFbzUg4Fw",
  authDomain: "civfans-e15ab.firebaseapp.com",
  databaseURL: "https://civfans-e15ab.firebaseio.com",
  projectId: "civfans-e15ab",
  storageBucket: "civfans-e15ab.appspot.com",
  messagingSenderId: "427071358827",
  appId: "1:427071358827:web:e95a515682b7fbd5f82e2e"
});

export const db = firebase.firestore();

class Users {
  async register(email: string, password: string): Promise<boolean> {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      
      await db.collection("users").doc(email).set({
        email,
        firstName: 'Empty',
        lastName: 'Empty',
      });
      
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async login(nickname: string, password: string): Promise<boolean> {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(nickname, password);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getMe(email: string): Promise<{} | undefined> {
    try {
      const data = await db
        .collection('users')
        .doc(email)
        .get();
      console.log(data.exists);
      return data.data();
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  async getSize(): Promise<number> {
    try {
      const {size} = await db
        .collection("users")
        .get();
      return size;
    } catch (e) {
      console.log(e);
      return -1;
    }
  }
}

class Nations {
  async getAll(): Promise<firebase.firestore.DocumentData[]> {
    try {
      const snapshot = await firebase
        .firestore()
        .collection('nations')
        .get();
      return snapshot.docs.map(doc => doc.data());
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

export const users = new Users();
export const nations = new Nations();