import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// import {Nation} from '../types/Nation';
import {UserShort, Nation, Draft} from '../types';
import {FBDraftModel, FBUserModel} from '../types/models';

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

  async getUserAllRatings(email: string): Promise<Nation[]> {
    return new Promise((resolve) => {
      firebase
        .firestore()
        .collection(`users/${email}/ratings`)
        .get()
        .then((snapshot) => {
          const ratingsList: Nation[] = [];
          snapshot.forEach((doc) => {
            ratingsList.push({
              name: doc.id,
              coeff: doc.data().rating,
            });
          });
          resolve(ratingsList);
        })
        .catch((e) => {
          console.log(e);
          resolve([]);
        });
    });
  }

  async updateUserAllRatings(email: string, ratingsList: {nation: string, rating: number}[]): Promise<boolean> {
    return new Promise((resolve) => {
      const promises: Promise<boolean>[] = [];
      ratingsList.forEach(({nation, rating}) => {
        promises.push(this.updateUserRating(email, nation, rating));
      });

      Promise.all(promises)
        .then((results) => {
          if (results.filter((res) => !res).length === 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((e) => {
          console.log(e);
          resolve(false);
        })
    });
  }

  async updateUserRating(email: string, nation: string, rating: number): Promise<boolean> {
    return new Promise((resolve) => {
      firebase
        .firestore()
        .collection(`users/${email}/ratings`)
        .doc(nation)
        .set({rating})
        .then(() => {
          resolve(true);
        })
        .catch((e) => {
          console.log(e);
          resolve(false);
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
  async getAll(): Promise<Nation[]> {
    return new Promise((resolve) => {
      firebase
        .firestore()
        .collection('nations')
        .get()
        .then((snapshot) => {
          const nations = snapshot.docs.map((doc) => {
            const {coeff, key} = doc.data();
            return {
              name: key,
              coeff,
            }
          });
          resolve(nations);
        })
        .catch((e) => {
          console.log(e);
          resolve([]);
        });
    });
  }
}

class Drafts {
  // TODO: add promise all
  async getAllByUserId(userId: string): Promise<Draft[]> {
    return new Promise((resolve) => {
      console.log('.')
      firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            if (userData) {
              const {drafts} = userData;
              const draftPromises: Promise<Draft | null>[] = [];

              drafts.forEach((draftId: string) => {
                draftPromises.push(
                  this.getDraftById(draftId)
                );
              });

              Promise.all(draftPromises)
                .then((data) => {
                  const draftList: Draft[] = data.filter((it) => it !== null) as any;
                  resolve(draftList);
                })
                .catch((e) => {
                  resolve([]);
                });
            } else {
              resolve([]);
            }
          } else {
            resolve([]);
          }
        })
        .catch((e) => {
          console.log(e);
          resolve([]);
        });
    });
  }

  async getDraftById(draftId: string): Promise<Draft | null> {
    return new Promise((resolve) => {
      firebase
        .firestore()
        .collection('drafts')
        .doc(draftId)
        .get()
        .then((draftDoc) => {
          if (draftDoc.exists) {
            const draftData = draftDoc.data();
            const {name, users} = draftData as FBDraftModel;
            const usersData: { accepted: boolean; user: UserShort}[] = [];

            users.forEach(async (userData) => {
              console.log(userData);
              if (userData.userRef) {
                try {
                  const doc = await userData.userRef.get();
                  if (doc.exists) {
                    console.log('user doc', doc.data());
                    const {nickName, avatarUrl} = doc.data() as FBUserModel;
                    usersData.push({
                      accepted: userData.accepted,
                      user: {
                        id: doc.id,
                        nickName,
                        avatarUrl,
                      }
                    });
                  }
                } catch (e) {
                  console.log(e);
                }
              }
            });

            resolve({
              name,
              users: usersData,
            });
          }
        })
        .catch((e) => {
          console.log(e);
          resolve(null);
        });
    });
  }
}

export const users = new Users();
export const nations = new Nations();
export const drafts = new Drafts();