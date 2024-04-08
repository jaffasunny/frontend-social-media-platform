"use client";

import isNotAuth from "@/components/Auth/isNotAuth";
import withHeaderFooter from "@/components/HOC/withHeaderFooter";
import React from "react";
import IncomingMessages from "./components/IncomingMessages";

type Props = {};

const Chat = (props: Props) => {
	return (
		<div className='pt-8 pb-5 px-4 sm:px-6 lg:px-8'>
			{/* Left side */}
			<IncomingMessages />
		</div>
	);
};

export default isNotAuth(withHeaderFooter(Chat));
