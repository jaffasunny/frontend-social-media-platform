"use client";

import isNotAuth from "@/components/Auth/isNotAuth";
import withHeaderFooter from "@/components/HOC/withHeaderFooter";
import Spinners from "@/components/Spinners";
import CloudIcon from "@/public/icons/CloudIcon.svg";
import { usePostStore } from "@/store/postStore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {};

const CreatePost = (props: Props) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
		null
	);

	const createPost = usePostStore((state) => state.createPost);
	const loading = usePostStore((state) => state.processLoading);
	const apiResponse = usePostStore((state) => state.apiResponse);
	const error = usePostStore((state) => state.error);
	const clearApiResponse = usePostStore((state) => state.clearApiResponse);
	const clearError = usePostStore((state) => state.clearError);

	useEffect(() => {
		handlePreview();
	}, [selectedFile]);

	useEffect(() => {
		if (apiResponse?.message) {
			toast.success("Post Created Successfully");
		}
		if (error) {
			toast.error("Post creation failed!");
		}
	}, [apiResponse]);

	useEffect(() => {
		clearApiResponse();
		clearError();
	}, []);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const _selectedFile = event.target.files[0];
			setSelectedFile(_selectedFile);
		}
	};

	const handlePreview = () => {
		if (!selectedFile) return;

		const reader = new FileReader();
		reader.readAsDataURL(selectedFile);
		reader.onloadend = () => {
			setImagePreview(reader.result);
		};
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			if (e.target) {
				const formData = new FormData(e.target as HTMLFormElement);
				console.log({ formData });

				await createPost(formData);
			}
		} catch (error) {
			console.log({ error });
		}
	};

	return (
		<div className='max-w-[36rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
			{loading ? (
				<Spinners backgroundColor='bg-transparent' />
			) : (
				<div className='bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900'>
					<div className='mb-8'>
						<h2 className='text-xl font-bold text-gray-800 dark:text-gray-200'>
							Create new post
						</h2>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							Post what you feel and don't forget to add image.
						</p>
					</div>

					<form onSubmit={handleFormSubmit}>
						<div className='grid sm:grid-cols-12 gap-2 sm:gap-6'>
							<div className='sm:col-span-3'>
								<label
									htmlFor='af-submit-app-upload-images'
									className='inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200'>
									Preview image
								</label>
							</div>

							<div className='sm:col-span-9'>
								<div className='flex flex-col items-center gap-5 w-full'>
									<div className='space-y-2 w-full'>
										<label
											htmlFor='af-submit-app-upload-images'
											className='group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-gray-700'>
											<input
												id='af-submit-app-upload-images'
												name='file'
												type='file'
												accept='image/*'
												className='sr-only'
												onChange={handleChange}
											/>
											<CloudIcon className='size-10 mx-auto text-gray-400 dark:text-gray-600' />
											<span className='mt-2 block text-sm text-gray-800 dark:text-gray-200'>
												Browse your device or{" "}
												<span className='group-hover:text-blue-700 text-blue-600'>
													drag 'n drop'
												</span>
											</span>
											<span className='mt-1 block text-xs text-gray-500'>
												Maximum file size is 2 MB
											</span>
										</label>
									</div>

									{imagePreview && (
										<img
											className='w-full'
											src={imagePreview as string}
											alt='Selected Image Preview'
										/>
									)}
								</div>
							</div>

							<div className='sm:col-span-3'>
								<label
									htmlFor='af-account-title'
									className='inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200'>
									Title
								</label>
							</div>

							<div className='sm:col-span-9'>
								<div className='sm:flex'>
									<input
										id='af-account-title'
										type='text'
										className='py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600'
										placeholder='Enter Title'
										// value={
										// 	typeof EditProfile === "object" &&
										// 	"firstName" in EditProfile
										// 		? EditProfile.firstName
										// 		: "Maria"
										// }
										name='title'
										// onChange={handleInputChange}
									/>
								</div>
							</div>

							<div className='sm:col-span-3'>
								<label
									htmlFor='af-account-desc'
									className='inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200'>
									Description
								</label>
							</div>

							<div className='sm:col-span-9'>
								<textarea
									id='af-account-desc'
									className='py-2 px-3 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600'
									rows={6}
									placeholder='Type your description...'
									// value={
									// 	(typeof EditProfile === "object" &&
									// 		"bio" in EditProfile &&
									// 		EditProfile.bio) ||
									// 	""
									// }
									name='description'
									// onChange={(e) =>
									// 	setEditProfile({
									// 		...EditProfile,
									// 		[e.target.name]: e.target.value,
									// 	})
									// }
								></textarea>
							</div>
						</div>

						<div className='mt-5 flex justify-end gap-x-2'>
							<button
								type='button'
								className='py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
								Cancel
							</button>
							<button
								type='submit'
								className='py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
								Add post
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default isNotAuth(withHeaderFooter(CreatePost));
