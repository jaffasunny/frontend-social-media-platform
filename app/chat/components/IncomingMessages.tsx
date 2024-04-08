import React from "react";
import PlusIcon from "@/public/icons/PlusIcon.svg";
import SearchInput from "@/components/Inputs/SearchInput";
import LatestMessage from "./LatestMessage";

type Props = {};

const IncomingMessages = (props: Props) => {
	return (
		<div className='md:w-3/12 min-w-80 bg-red-200'>
			<div className='flex items-center justify-between mb-5'>
				<h2 className='font-satoshi text-black font-bold text-lg'>Messages</h2>

				<button>
					<PlusIcon className='w-4 h-4' />
				</button>
			</div>

			<div className='mb-5'>
				<SearchInput />
			</div>

			<LatestMessage />
		</div>
	);
};

export default IncomingMessages;
