import { useAuthStore } from "@/store/authStore";
import { usePostStore } from "@/store/postStore";
import { TSinglePostData } from "@/types";
import React, { useState } from "react";
import SimpleButton from "../Button/SimpleButton";
import TextLabelInput from "../Inputs/TextLabelInput";
import ProfileIcon from "@/public/icons/ProfileIcon.svg";
import HeartIcon from "@/public/icons/HeartIcon.svg";
import HeartIconFilled from "@/public/icons/HeartIconFilled.svg";
import CommentIcon from "@/public/icons/CommentIcon.svg";
import { TCommentArray, TUser } from "@/types/postTypes";

type Props = {
	data: TSinglePostData;
};

const SinglePost = ({ data }: Props) => {
	const {
		authorId: authorInformation,
		comments,
		description,
		likes,
		title,
		image,
		_id: postId,
	} = data;

	const PostComment = usePostStore((state) => state.postComment);
	const user = useAuthStore((state) => state.user.data.user);
	const likePost = usePostStore((state) => state.likePost);

	const _allLikes = likes;
	let iLiked = _allLikes.filter((like) => like._id === user._id);

	const [isLiked, setIsLiked] = useState<boolean>(iLiked.length ? true : false);
	const [allLikes, setAllLikes] = useState(likes);

	const [showTextInputLabel, setShowTextInputLabel] = useState(false);
	const [comment, setComment] = useState("");
	const [commentArr, setCommentArr] = useState<TCommentArray[]>(comments || []);

	return (
		<div className='group flex flex-col border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 rounded-xl p-5 dark:border-gray-700 dark:hover:border-transparent dark:hover:shadow-black/[.4] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 bg-white w-2/6 h-2/6 mx-auto'>
			<div className='h-full'>
				<div className='aspect-w-16 aspect-h-11 mb-4'>
					<img
						className='w-full h-full object-cover rounded-xl'
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
								likes = likes?.filter((like) => like._id !== user._id);
								setAllLikes(likes);
							} else {
								let likes = allLikes;
								likes.push(user as TUser);
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

					<button onClick={() => setShowTextInputLabel((prev) => !prev)}>
						<CommentIcon className='w-5 h-5' />
					</button>
				</div>

				{allLikes?.length ? (
					<p className='text-sm text-gray-800 font-bold'>
						{allLikes?.length?.toLocaleString()} likes
					</p>
				) : (
					""
				)}
			</div>
			<div className='my-2'>
				<h3 className='text-xl font-semibold text-gray-800 dark:text-gray-300 dark:group-hover:text-white'>
					{title}
				</h3>
				<p className='mt-5 text-gray-600 dark:text-gray-400'>{description}</p>
			</div>

			{commentArr
				? commentArr.map((_comment, index) => (
						<div className='flex gap-2' key={index}>
							<p className='font-bold text-blue-950'>
								{_comment.authorId.firstName + " " + _comment.authorId.lastName}{" "}
							</p>
							<p className='font-semibold text-blue-600'>{_comment.content}</p>
						</div>
				  ))
				: ""}

			{showTextInputLabel ? (
				<div className='flex gap-2 w-full justify-end items-end mt-4'>
					<TextLabelInput
						name='comment'
						title='Add a comment'
						inputType='text'
						containerStyles='w-full'
						handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setComment(e.target.value)
						}
					/>
					<SimpleButton
						title='Add'
						buttonStyles='h-12'
						onClick={async () => {
							setCommentArr([
								...commentArr,
								{
									authorId: user as TUser,
									content: comment,
								},
							]);

							await PostComment(postId, {
								content: comment,
							});
						}}
					/>
				</div>
			) : (
				""
			)}

			<div className='flex items-center gap-x-3 mt-4'>
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

export default SinglePost;
