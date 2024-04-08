"use client";

import { TNotificationResponse } from "@/types";
import React, { useEffect, useState } from "react";
import NotificationBell from "@/public/icons/NotificationBelIcon.svg";
import { useNotificationStore } from "@/store/notificationStore";

type Props = {
	notifications: TNotificationResponse | null;
};

const NotificationDropdown = ({ notifications }: Props) => {
	const viewNotifications = useNotificationStore(
		(state) => state.viewNotifications
	);

	const [isOpen, setIsOpen] = useState(false);

	// useEffect(() => {
	// 	if (isOpen) {
	// 		let timeout = setTimeout(() => {
	// 			if (notifications && notifications.data[0]?.notifications?.length)
	// 				viewNotifications();
	// 			setIsOpen(!isOpen);
	// 			console.log("clearing notifications", isOpen);
	// 		}, 10000);
	// 		return () => clearTimeout(timeout);
	// 	}
	// }, [isOpen]);

	return (
		<div className='hs-dropdown relative inline-flex md:ps-6'>
			<button
				id='hs-dropdown-default'
				type='button'
				className='hs-dropdown-toggle inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
				<NotificationBell className='text-lg w-4 h-4' />
				{notifications && notifications.data[0]?.notifications?.length > 0 ? (
					<span className='absolute top-[-10px] right-[-10px] w-4 h-4 bg-red-300 rounded-full text-xs text-white flex items-center justify-center'>
						{notifications?.data[0]?.notifications?.length}
					</span>
				) : null}
			</button>

			<div
				className='hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full'
				aria-labelledby='hs-dropdown-default'>
				{notifications && notifications?.data[0]?.notifications?.length ? (
					<div className='flex justify-end'>
						<button
							className='hover:bg-red-200 p-1 rounded-lg'
							onClick={async () => {
								await viewNotifications();
							}}>
							seen
						</button>
					</div>
				) : (
					""
				)}

				{notifications && notifications?.data[0]?.notifications?.length ? (
					notifications?.data[0]?.notifications?.map((notification, index) => (
						<div key={index}>
							<p className='flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700'>
								{notification.body}
							</p>
						</div>
					))
				) : (
					<p className='flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700'>
						No notifications
					</p>
				)}
			</div>
		</div>
	);
};

export default NotificationDropdown;
