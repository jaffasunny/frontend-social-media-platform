import { TPostData } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import ProfileIcon from "@/public/icons/ProfileIcon.svg";
import HeartIcon from "@/public/icons/HeartIcon.svg";
import HeartIconFilled from "@/public/icons/HeartIconFilled.svg";
import CommentIcon from "@/public/icons/CommentIcon.svg";
import { useAuthStore } from "@/store/authStore";
import { usePostStore } from "@/store/postStore";

type Props = {
	data: TPostData;
};

const Post = ({ data }: Props) => {
	const {
		authorId: authorInformation,
		comments,
		description,
		likes,
		title,
		image,
		_id: postId,
	} = data;

	const user = useAuthStore((state) => state.user.data.user);
	const likePost = usePostStore((state) => state.likePost);

	const _allLikes = likes;
	let iLiked = _allLikes?.includes(user._id);

	const [isLiked, setIsLiked] = useState(iLiked);
	const [allLikes, setAllLikes] = useState(likes);

	return (
		<div className='group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 rounded-xl p-5 dark:border-gray-700 dark:hover:border-transparent dark:hover:shadow-black/[.4] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 bg-white'>
			<div>
				<div className='aspect-w-16 aspect-h-11 mb-4'>
					<img
						className='w-full object-cover rounded-xl'
						src={image.url}
						alt='Image Description'
					/>
				</div>

				<div className='flex gap-2 mb-2'>
					<button
						onClick={async () => {
							setIsLiked(!isLiked);

							if (isLiked) {
								let likes = allLikes;
								likes = likes.filter((id) => id !== user._id);
								setAllLikes(likes);
							} else {
								let likes = allLikes;
								likes.push(user._id);
								setAllLikes(likes);
							}

							await likePost(postId);
						}}>
						{!isLiked ? (
							<HeartIcon className='w-5 h-5' />
						) : (
							<HeartIconFilled className='w-5 h-5' />
						)}
					</button>

					<Link href={`/post/${postId}`}>
						<CommentIcon className='w-5 h-5' />
					</Link>
				</div>

				{allLikes?.length ? (
					<p className='text-sm text-gray-800 font-bold'>
						{allLikes?.length.toLocaleString()} likes
					</p>
				) : (
					""
				)}
			</div>
			<div className='my-6'>
				<h3 className='text-xl font-semibold text-gray-800 dark:text-gray-300 dark:group-hover:text-white'>
					{title}
				</h3>
				<p className='mt-5 text-gray-600 dark:text-gray-400'>{description}s.</p>
			</div>

			{comments?.length ? (
				<Link
					href={`/post/${postId}`}
					className='text-md text-gray-500 font-semiBold mb-2'>
					View all {comments?.length.toLocaleString()} comments
				</Link>
			) : (
				""
			)}

			<div className='mt-auto flex items-center gap-x-3'>
				{/* <img
					className='size-8 rounded-full'
					src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80'
					alt='Image Description'
				/> */}
				<ProfileIcon className='w-4 h-4' />
				<div>
					<h5 className='text-sm text-gray-800 dark:text-gray-200'>
						By {authorInformation.firstName + " " + authorInformation.lastName}
					</h5>
				</div>
			</div>
		</div>
	);
};

export default Post;
