// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
	apiKey: self.NEXT_PUBLIC_apiKey,
	authDomain: self.NEXT_PUBLIC_authDomain,
	projectId: self.NEXT_PUBLIC_projectId,
	storageBucket: self.NEXT_PUBLIC_storageBucket,
	messagingSenderId: self.NEXT_PUBLIC_messagingSenderId,
	appId: self.NEXT_PUBLIC_appId,
	measurementId: self.NEXT_PUBLIC_measurementId,
};
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
