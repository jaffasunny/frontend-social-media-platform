"use client";

import withHeaderFooter from "@/components/HOC/withHeaderFooter";
import isNotAuth from "@/components/Auth/isNotAuth";
import { useAuthStore } from "@/store/authStore";
import { usePostStore } from "@/store/postStore";
import { TPostData, TSinglePostType } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Spinners from "@/components/Spinners";

import Link from "next/link";
import Skeleton from "@/components/Skeleton";
import TextLabelInput from "@/components/Inputs/TextLabelInput";
import SimpleButton from "@/components/Button/SimpleButton";
import SinglePost from "@/components/SinglePost";

type Props = {};

const Product = (Props: Props) => {
	const singlePostLoading = usePostStore((state) => state.singlePostLoading);
	const post = usePostStore((state) => state.singlePost);
	const GetPost = usePostStore((state) => state.getPost);
	const { slug } = useParams();

	useEffect(() => {
		GetPost(slug as string);
	}, []);

	return (
		<section className='text-gray-600 body-font overflow-hidden'>
			<div className='container px-5 py-24 mx-auto'>
				{singlePostLoading ? (
					<Skeleton />
				) : post?.data ? (
					<SinglePost data={post.data} />
				) : (
					""
				)}
			</div>
		</section>
	);
};

export default isNotAuth(withHeaderFooter(Product));
