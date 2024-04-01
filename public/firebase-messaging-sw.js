// eslint-disable-next-line no-undef
importScripts(
	"https://www.gstatic.com/firebasejs/<v9+>/firebase-app-compat.js"
);
// eslint-disable-next-line no-undef
importScripts(
	"https://www.gstatic.com/firebasejs/<v9+>/firebase-messaging-compat.js"
);

const firebaseConfig = {
	apiKey: NEXT_PUBLIC_apiKey,
	authDomain: NEXT_PUBLIC_authDomain,
	projectId: NEXT_PUBLIC_projectId,
	storageBucket: NEXT_PUBLIC_storageBucket,
	messagingSenderId: NEXT_PUBLIC_messagingSenderId,
	appId: NEXT_PUBLIC_appId,
	measurementId: NEXT_PUBLIC_measurementId,
};
console.log({ firebaseConfig });
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: "./logo.png",
	};
	self.registration.showNotification(notificationTitle, notificationOptions);
});
