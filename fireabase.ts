import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { getToken } from "firebase/messaging";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_apiKey,
	authDomain: process.env.NEXT_PUBLIC_authDomain,
	projectId: process.env.NEXT_PUBLIC_projectId,
	storageBucket: process.env.NEXT_PUBLIC_storageBucket,
	messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
	appId: process.env.NEXT_PUBLIC_appId,
	measurementId: process.env.NEXT_PUBLIC_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
	try {
		const permission = await Notification.requestPermission();
		console.log(process.env.NEXT_PUBLIC_vapid_id);

		if (permission === "granted") {
			const token = await getToken(messaging, {
				vapidKey: process.env.NEXT_PUBLIC_vapid_id,
			});

			return token;
		}
	} catch (error) {
		console.log({ error });
	}
};
