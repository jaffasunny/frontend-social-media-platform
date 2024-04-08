import React from "react";

type Props = {};

const LatestMessage = (props: Props) => {
	return (
		<section className='flex items-center gap-2 font-satoshi bg-white px-4 py-5 rounded-lg'>
			<div className='hover:opacity-85 cursor-pointer w-max'>
				<img
					className='inline-block size-[40px] rounded-full'
					src='https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
					alt='Image Description'
				/>
			</div>
			<div className='flex flex-col gap-1 flex-1'>
				<h3 className='text-black font-semibold text-base'>Name</h3>
				<p className='text-gray-600 text-base font-normal'>Recent Message</p>
			</div>
			<div>time passed</div>
		</section>
	);
};

export default LatestMessage;
