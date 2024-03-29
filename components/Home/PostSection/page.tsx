import SimpleButton from "@/components/Button/SimpleButton";
import Post from "@/components/Post";
import Skeleton from "@/components/Skeleton";
import { usePostStore } from "@/store/postStore";
import Link from "next/link";
import React, { useEffect } from "react";

type Props = {};

const PostSection = (props: Props) => {
	const posts = usePostStore((state) => state.post);
	const getPosts = usePostStore((state) => state.getAllPosts);
	const isLoading = usePostStore((state) => state.loading);

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<section className='bg-[#F2F0F1] py-5 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8'>
			<div className='flex justify-end'>
				<Link href='/createPost'>
					<SimpleButton
						title='Create Post'
						buttonStyles='mb-4 bg-gray-600 hover:bg-gray-500'
					/>
				</Link>
			</div>
			<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{isLoading ? (
					<>
						<Skeleton />
						<Skeleton />
						<Skeleton />
					</>
				) : (
					posts?.data?.map((post) => <Post data={post} />)
				)}
			</div>
		</section>
	);
};

export default PostSection;
