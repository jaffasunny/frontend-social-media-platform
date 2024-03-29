export type TItemType = {
	product: {
		_id: string;
		productName: string;
		category: string[];
		description: string;
		image: string;
		rating: {
			average: number;
			count: number;
			_id: string;
		};
		sellerId: string;
		price: number;
		quantity: number;
		createdAt: Date;
		updatedAt: Date;
		__v: number;
	};
	totalPrice: number;
	quantity: number;
	_id: string;
};

export type TComment = {
	authorId: string;
	content: string;
	_id: string;
	createdAt: string;
	updatedAt: string;
};

export type TUser = {
	_id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	roles: string[];
	isProfileComplete: false;
	createdAt: string;
	updatedAt: string;
	__v: 75;
	refreshTokens: [
		{
			token: string;
			_id: string;
		},
		{
			token: string;
			_id: string;
		}
	];
};

export type TPostData = {
	_id: string;
	authorId: TUser;
	title: string;
	description: string;
	image: { public_id: string; url: string };
	likes: string[];
	comments: TComment[];
	createdAt: Date;
	updatedAt: Date;
	__v: number;
};

export type TCommentArray = {
	authorId: TUser;
	content: string;
	createdAt?: string;
	updatedAt?: string;
	_id?: string;
};

export type TSinglePostData = {
	_id: string;
	authorId: TUser;
	title: string;
	description: string;
	image: { public_id: string; url: string };
	likes: TUser[];
	comments: TCommentArray[];
	createdAt: Date;
	updatedAt: Date;
	__v: number;
};

export type TPostType = {
	data: TPostData[];
	message: string;
	statusCode: number | null;
	success: boolean;
} | null;

export type TSinglePostType = {
	data: TSinglePostData;
	message: string;
	statusCode: number | null;
	success: boolean;
} | null;

export type PostState = {
	post: TPostType;
	singlePost: TSinglePostType;
	loading: boolean;
	processLoading: boolean;
	error:
		| {
				data: object;
				message: string;
				statusCode: number;
				success: boolean;
		  }
		| unknown;
	apiResponse: {
		data: object;
		message: string;
		statusCode: number;
		success: boolean;
	} | null;
	postCount: number;
	likeLoading: boolean;
	singlePostLoading: boolean;
};

export type TAddToCartAPIBody = {
	product: string;
	quantity: number;
};

export type PostAction = {
	getAllPosts: () => Promise<void>;
	likePost: (postId: string) => Promise<void>;
	postComment: (postId: string, body: { content: string }) => Promise<void>;
	createPost: (body: FormData) => Promise<void>;
	getPost: (postId: string) => Promise<void>;
	clearApiResponse: () => void;
	clearError: () => void;
};
