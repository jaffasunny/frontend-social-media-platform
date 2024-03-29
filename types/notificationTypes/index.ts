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

export type TNoti = {
	body: string;
	title: string[];
};

export type INotification =
	| {
			userId: string;
			notifications: TNoti[];
			isViewed: boolean;
			_id: string;
	  }[];

export type TNotificationResponse = {
	data: INotification;
	message: string;
	statusCode: number;
	success: boolean;
};

export type NotificationState = {
	notifications: TNotificationResponse | null;
	loading: boolean;
	error: null | string | object | unknown;
	apiResponse: object | null | string;
};

export type NotificationAction = {
	getNotifications: () => Promise<void>;
	// viewNotifications: () => Promise<void>;
};
