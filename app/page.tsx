"use client";

import isNotAuth from "@/components/Auth/isNotAuth";
import React from "react";
import withHeaderFooter from "../components/HOC/withHeaderFooter";
import HeroSection from "@/components/Home/HeroSection";
import PostSection from "@/components/Home/PostSection/page";

type Props = {};

const Home = (props: Props) => {
	return (
		<div className='min-h-screen h-full mt-5'>
			{/* <HeroSection /> */}

			<PostSection />
		</div>
	);
};

export default isNotAuth(withHeaderFooter(Home));
