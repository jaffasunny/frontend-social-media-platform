import React from "react";

type Props = {};

const Skeleton = (props: Props) => {
	return (
		<div className='flex animate-pulse'>
			<div className='ms-4 mt-2 w-full'>
				<h3 className='h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[40%]'></h3>

				<ul className='mt-5 space-y-3'>
					<li className='w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700'></li>
					<li className='w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700'></li>
					<li className='w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700'></li>
					<li className='w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700'></li>
				</ul>
			</div>
		</div>
	);
};

export default Skeleton;
