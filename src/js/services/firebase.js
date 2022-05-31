import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  connectFirestoreEmulator,
  getFirestore,
} from 'firebase/firestore';
import { firebaseConfig } from '../../../firebase-config';


/**
 * emulator information
 */
const EMULATOR = {
  LOCALHOST: 'localhost',
  IP: '0.0.0.0',
  PORT: 8081
};

/**
 * Firebase
 */
const FIREBASE = {
  STATS_COLLECTION: 'project_collection',
};

/**
 * FirebaseService.
 * Will handle connection with firebase from the app.
 */
class FirebaseService {
  /**
   * Constructor for the class.
   */
  constructor() {}

  /**
   * Initializes service.
   */
  initialize() {
    let config = firebaseConfig;

    if (location.hostname === EMULATOR.LOCALHOST) {
      console.info('Using local emulator');
      config = {
        projectId: EMULATOR.LOCALHOST
      };
    }

    this.app = initializeApp(config);
    this.db = getFirestore(this.app);

    if (location.hostname === EMULATOR.LOCALHOST) {
      connectFirestoreEmulator(this.db, EMULATOR.IP, EMULATOR.PORT);
    }
  }

  /**
   * Sample function to add a document in firebase.
   * TODO: Update function with the final implementation
   */
  async addDocument() {
    try {
      const docRef = await addDoc(collection(this.db, FIREBASE.STATS_COLLECTION), {
        // TODO: Update data with the final implementation
        data: 'TBD',
        user_agent: window.navigator.userAgent,
        created_at: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
}

const firebaseService = new FirebaseService();

export { firebaseService };
