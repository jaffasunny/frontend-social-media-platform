"use client";

import isNotAuth from "@/components/Auth/isNotAuth";
import React from "react";
import withHeaderFooter from "../components/HOC/withHeaderFooter";
import PostSection from "@/components/Home/PostSection/page";

type Props = {};

const Home = (props: Props) => {
	return (
		<div className='min-h-screen h-full mt-5'>
			<PostSection />
		</div>
	);
};

export default isNotAuth(withHeaderFooter(Home));
