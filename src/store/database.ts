import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {Nation} from '../types/Nation';
import {UserShort} from '../types';

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

interface AuthResponse {
  success: boolean;
  error?: {
    code: string;
    message: string;
  }
}

class Users {
  async register(email: string, password: string, nickName: string): Promise<AuthResponse> {
    return new Promise((resolve) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          // res.user?.updateProfile({
          //   displayName: nickName,
          // });
          // resolve({ success: true });
          firebase
            .firestore()
            .collection('users')
            .doc(email)
            .set({
              email,
              nickName,
              avatarUrl: `https://api.adorable.io/avatars/136/${email}`
            })
            .then((res) => {
              resolve({ success: true });
            })
            .catch((e) => {
              console.error(e);
              resolve({ success: false });
            });
        })
        .catch((e) => {
          console.log(e);
          const { code, message } = e;

          resolve({
            success: false,
            error: {
              code,
              message,
            }
          });
        });
    });
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    return new Promise((resolve) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          resolve({ success: true });
        })
        .catch((e) => {
          console.log(e);
          const { code, message } = e;

          resolve({
            success: false,
            error: {
              code,
              message,
            }
          });
        })
    });
  }

  async logout(): Promise<boolean> {
    return new Promise((resolve) => {
      firebase
        .auth()
        .signOut()
        .then(function() {
          resolve(true);
        })
        .catch(function(error) {
          console.log(error);
          resolve(false);
        });
    });
  }

  async getAll(): Promise<UserShort[]> {
    return new Promise((resolve) => {
      firebase
        .firestore()
        .collection('users')
        .get()
        .then((snapshot) => {
          const users = snapshot.docs.map((doc) => {
            const { nickName, avatarUrl } = doc.data();
            return {
              id: doc.id,
              nickName,
              avatarUrl,
            }
          });
          resolve(users);
        })
        .catch((e) => {
          console.log(e);
          resolve([]);
        });
    });
  }

  async getDataByEmail(email: string): Promise<UserShort | null> {
    return new Promise((resolve) => {
      firebase
        .firestore()
        .collection('users')
        .doc(email)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            if (userData) {
              const {nickName, avatarUrl} = userData;
              resolve({
                id: email,
                nickName,
                avatarUrl,
              });
            } else {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        })
        .catch((e) => {
          console.log(e);
          resolve(null);
        });
    });
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