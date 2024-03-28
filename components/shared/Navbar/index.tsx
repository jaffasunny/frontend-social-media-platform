"use client";

import React, { useEffect } from "react";
import SearchInput from "@/components/Inputs/SearchInput";
import LogoutIcon from "@/public/icons/logoutIcon.svg";
import ProfileIcon from "@/public/icons/ProfileIcon.svg";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { usePostStore } from "@/store/postStore";
import NotificationBell from "@/public/icons/NotificationBelIcon.svg";

type Props = {};

const Navbar = (props: Props) => {
	const logout = useAuthStore((state) => state.logout);
	const postCount = usePostStore((state) => state.postCount);

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.log({ error });
		}
	};

	// useEffect(() => {
	// 	getCart();
	// }, []);

	return (
		<nav
			className='shadow-md relative max-w-[85rem] backdrop-blur-md bg-white/30 border border-gray-200 rounded-[36px] py-3 px-4 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 dark:bg-gray-800 dark:border-gray-700 w-full'
			aria-label='Global'>
			<div className='flex items-center justify-between'>
				<Link
					className='flex-none text-2xl dark:text-white font-integralCF font-bold'
					href='/'
					aria-label='Brand'>
					Brand
				</Link>
				<div className='md:hidden'>
					<button
						type='button'
						className='hs-collapse-toggle w-8 h-8 flex justify-center items-center text-sm font-semibold rounded-full border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
						data-hs-collapse='#navbar-collapse-with-animation'
						aria-controls='navbar-collapse-with-animation'
						aria-label='Toggle navigation'>
						<svg
							className='hs-collapse-open:hidden flex-shrink-0 w-4 h-4'
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'>
							<line x1='3' x2='21' y1='6' y2='6' />
							<line x1='3' x2='21' y1='12' y2='12' />
							<line x1='3' x2='21' y1='18' y2='18' />
						</svg>
						<svg
							className='hs-collapse-open:block hidden flex-shrink-0 w-4 h-4'
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'>
							<path d='M18 6 6 18' />
							<path d='m6 6 12 12' />
						</svg>
					</button>
				</div>
			</div>
			<div
				id='navbar-collapse-with-animation'
				className='hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block font-satoshi'>
				<div className='flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:ps-7 md:py-3'>
					{/* Search */}
					<SearchInput />

					{/* Login & Logout */}
					<div className='md:border-s md:border-gray-300 flex items-center h-4'>
						<Link
							className='flex items-center font-regular text-sm text-gray-500 hover:text-blue-600 md:my-6 md:ps-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 relative'
							href='/cart'>
							<NotificationBell className='text-lg w-4 h-4' />
							{postCount > 0 ? (
								<span className='absolute top-[-10px] right-[-10px] w-4 h-4 bg-red-300 rounded-full text-xs text-white flex items-center justify-center'>
									{postCount}
								</span>
							) : null}
						</Link>
						<Link
							className='flex items-center font-regular text-sm text-gray-500 hover:text-blue-600 md:my-6 md:ps-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500'
							href='/profile'>
							<ProfileIcon className='text-lg w-4 h-4' />
						</Link>
						<button
							className='flex items-center font-regular text-sm text-gray-500 hover:text-blue-600 md:my-6 md:ps-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500'
							onClick={handleLogout}>
							<LogoutIcon className='text-lg w-4 h-4' />
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
