import { initializeApp } from "firebase/app";

export const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_apiKey,
	authDomain: process.env.NEXT_PUBLIC_authDomain,
	projectId: process.env.NEXT_PUBLIC_projectId,
	storageBucket: process.env.NEXT_PUBLIC_storageBucket,
	messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
	appId: process.env.NEXT_PUBLIC_appId,
	measurementId: process.env.NEXT_PUBLIC_measurementId,
};

console.log({ firebaseConfig });

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
