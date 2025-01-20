import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Twoje dane konfiguracyjne Firebase
const firebaseConfig = {
	apiKey: "AIzaSyAjmzmee4iCozJ_OrU2Od4-5UsJ2ATYPEg",
	authDomain: "dishly0.firebaseapp.com",
	projectId: "dishly0",
	storageBucket: "dishly0.firebasestorage.app",
	messagingSenderId: "196014819992",
	appId: "1:196014819992:web:df660b06e30e07d40ddeed",
	measurementId: "G-FN7B7YT0S8"
};

// Inicjalizacja aplikacji Firebase
const app = initializeApp(firebaseConfig);
// Inicjalizacja usług Firebase
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider()
const db = getFirestore(app);

export { app, auth, googleAuthProvider, db }