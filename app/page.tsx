"use client";

import isNotAuth from "@/components/Auth/isNotAuth";
import React, { useEffect, useState } from "react";
import withHeaderFooter from "../components/HOC/withHeaderFooter";
import PostSection from "@/components/Home/PostSection/page";
import { io } from "socket.io-client";
import { useAuthStore } from "@/store/authStore";

type Props = {};

// implementing socket

const ENDPOINT = "http://localhost:8000";
let socket, selectedChatCompare;

const Home = (props: Props) => {
	// const user = useAuthStore((state) => state.user);

	// const [socketConnected, setSocketConnected] = useState(false);

	// useEffect(() => {
	// 	socket = io(ENDPOINT);

	// 	socket.emit("setup", user.data.user);

	// 	socket.on("connection", () => setSocketConnected(true));
	// }, []);

	return (
		<div className='min-h-screen h-full mt-5'>
			<PostSection />
		</div>
	);
};

export default isNotAuth(withHeaderFooter(Home));
