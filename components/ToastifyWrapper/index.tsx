"use client";

import { messaging } from "@/fireabase";
import { TNoti } from "@/types";
import { onMessage } from "firebase/messaging";
import React, { useEffect } from "react";
import { toast, ToastContainer, ToastContent } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
	children:
		| string
		| JSX.Element
		| JSX.Element[]
		| (() => JSX.Element)
		| React.ReactNode;
};

const ToastifyWrapper = ({ children }: Props) => {
	useEffect(() => {
		if ("serviceWorker" in navigator) {
			window.addEventListener("load", () => {
				navigator.serviceWorker
					.register("/firebase-messaging-sw.js")
					.then((registration) => {
						console.log("Service worker registered: ", registration);
					})
					.catch((registrationError) => {
						console.error(
							"Service worker registration failed: ",
							registrationError
						);
					});
			});
		}

		onMessage(messaging, (payload) => {
			toast(payload.notification as ToastContent<unknown>);
		});
	}, []);

	return (
		<>
			<ToastContainer />

			{children}
		</>
	);
};

export default ToastifyWrapper;
