// eslint-disable-next-line no-undef
importScripts(
	"https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js"
);
// eslint-disable-next-line no-undef
importScripts(
	"https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
	apiKey: "AIzaSyCDg_XFrsAwiSfrgZg5iHPW_zusovRS-XM",
	authDomain: "social-media-notificatio-4bb57.firebaseapp.com",
	projectId: "social-media-notificatio-4bb57",
	storageBucket: "social-media-notificatio-4bb57.appspot.com",
	messagingSenderId: "783709613560",
	appId: "1:783709613560:web:8ba41b3a0f9fafd48b7a0d",
	measurementId: "G-KGK9VZJFM2",
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
