"use client";

import React, { useEffect } from "react";
import { toast, ToastContainer, ToastContent } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMessaging, onMessage } from "firebase/messaging";
import { useNotificationStore } from "@/store/notificationStore";
import { app } from "@/fireabase";

type Props = {
	children:
		| string
		| JSX.Element
		| JSX.Element[]
		| (() => JSX.Element)
		| React.ReactNode;
};

const ToastifyWrapper = ({ children }: Props) => {
	const getNotifications = useNotificationStore(
		(state) => state.getNotifications
	);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (typeof window !== "undefined" && "serviceWorker" in navigator) {
			const messaging = getMessaging(app);
			const unsubscribe = onMessage(messaging, async (payload) => {
				console.log("Foreground push notification received:", payload);
				await getNotifications();
				toast(payload.notification?.body);
				// Handle the received push notification while the app is in the foreground
				// You can display a notification or update the UI based on the payload
			});
			return () => {
				unsubscribe(); // Unsubscribe from the onMessage event
			};
		}
	}, []);

	return (
		<>
			<ToastContainer />

			{children}
		</>
	);
};

export default ToastifyWrapper;
