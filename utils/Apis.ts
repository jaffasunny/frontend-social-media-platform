import {
	LOGIN_API_TYPES,
	SIGNUP_API_TYPES,
	TAddToCartAPIBody,
	TEditProfileBody,
	TGetProductAPI,
	TGetSingleProductAPI,
	TRefreshTokenResponse,
	TUserType,
} from "@/types";
import { DEV_BASE_URL, PROD_BASE_URL } from "@/utils/constant";
import axios from "axios";

// AUTHENTICATION API'S
export const LoginAPI: LOGIN_API_TYPES["fnType"] = async (
	emailOrUsername,
	password
) => {
	try {
		const response = await axios.post(
			DEV_BASE_URL + "/users/login",
			{
				emailOrUsername,
				password,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error("Login error:", error);
	}
};

export const RefreshAccessTokenAPI = async (user: TUserType) => {
	try {
		const response = await axios.post<TRefreshTokenResponse>(
			DEV_BASE_URL + "/users/refreshToken",
			{
				refreshToken: user?.data?.refreshToken,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${user.data.accessToken}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.log("🚀 ~ RefreshAccessTokenAPI ~ error:", error);
	}
};

export const LogoutAPI = async (user: TUserType) => {
	try {
		const response = await axios.post(DEV_BASE_URL + "/users/logout", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${user.data.accessToken}`,
			},
		});

		return response;
	} catch (error) {
		return error;
	}
};

export const SignupAPI: SIGNUP_API_TYPES["fnType"] = async (
	firstName,
	lastName,
	username,
	email,
	password
) => {
	try {
		const response = await axios.post(
			DEV_BASE_URL + "/users/register",
			{
				firstName,
				lastName,
				username,
				email,
				password,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		);

		return response.data;
	} catch (error) {
		return error;
	}
};

export const ResetPasswordToken = async (email: string) => {
	try {
		const response = await axios.post(
			DEV_BASE_URL + "/users/reset-password",
			{ email },
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		);

		return response.data;
	} catch (error: any) {
		return error;
	}
};

export const ResetPassword = async (
	password: string,
	confirmPassword: string,
	userId: string,
	tokenId: string
) => {
	try {
		const response = await axios.post(
			DEV_BASE_URL + `/users/reset-password/${userId}/${tokenId}`,
			{ password, confirmPassword },
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		);

		return response.data;
	} catch (error: any) {
		return error;
	}
};

export const EditProfile = async (user: TUserType, body: TEditProfileBody) => {
	try {
	} catch (error: any) {
		if (error.response.status === 401) {
			const response = await RefreshAccessTokenAPI(user);

			return response;
		}
		console.log(error);
	}
};

// PRODUCT API'S
export const GetProductAPI = async (user: TUserType) => {
	try {
		const response = await axios.get<TGetProductAPI>(
			DEV_BASE_URL + "/products",
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${user.data.accessToken}`,
				},
			}
		);

		return response.data;
	} catch (error: any) {
		if (error.response.status === 401) {
			const response = await RefreshAccessTokenAPI(user);

			return response;
		}
		console.log(error);
	}
};

export const GetSingleProductAPI = async (
	user: TUserType,
	id: string | string[]
) => {
	try {
		const response = await axios.get<TGetSingleProductAPI>(
			DEV_BASE_URL + `/products/${id}`,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${user.data.accessToken}`,
				},
			}
		);

		return response.data;
	} catch (error: any) {
		if (error.response.status === 401) {
			const response = await RefreshAccessTokenAPI(user);

			return response;
		}
		console.log(error);
	}
};

export const GetAllPosts = async (user: TUserType) => {
	try {
		const response = await axios.get(DEV_BASE_URL + "/posts", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${user.data.accessToken}`,
			},
		});

		return response.data;
	} catch (error: any) {
		if (error.response.status === 401) {
			const response = await RefreshAccessTokenAPI(user);

			return response;
		}
		console.log(error);
	}
};

export const GetSinglePost = async (user: TUserType, postId: string) => {
	try {
		const response = await axios.get(DEV_BASE_URL + "/posts/" + postId, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${user.data.accessToken}`,
			},
		});

		return response.data;
	} catch (error: any) {
		if (error.response.status === 401) {
			const response = await RefreshAccessTokenAPI(user);

			return response;
		}
		console.log(error);
	}
};

export const LikePost = async (user: TUserType, postId: string) => {
	try {
		const response = await axios.patch(
			DEV_BASE_URL + "/posts/" + postId + "/like",
			{},
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${user.data.accessToken}`,
				},
			}
		);

		return response.data;
	} catch (error: any) {
		if (error.response.status === 401) {
			const response = await RefreshAccessTokenAPI(user);

			return response;
		}
		console.log(error);
	}
};

export const PostComment = async (
	user: TUserType,
	postId: string,
	body: { content: string }
) => {
	try {
		const response = await axios.patch(
			DEV_BASE_URL + "/posts/" + postId + "/comment",
			body,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${user.data.accessToken}`,
				},
			}
		);

		return response.data;
	} catch (error: any) {
		if (error.response.status === 401) {
			const response = await RefreshAccessTokenAPI(user);

			return response;
		}
		console.log(error);
	}
};

export const RemoveItemFromCartApi = async (
	user: TUserType,
	cartItemId: string
) => {
	try {
		const response = await axios.delete(DEV_BASE_URL + "/carts/" + cartItemId, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${user.data.accessToken}`,
			},
		});

		return response.data;
	} catch (error: any) {
		if (error.response.status === 401) {
			const response = await RefreshAccessTokenAPI(user);

			return response;
		}
		console.log(error);
	}
};

export const CompletelyRemoveItemFromCart = async (
	user: TUserType,
	itemId: string,
	cartItem: string
) => {
	try {
		const response = await axios.get(
			DEV_BASE_URL + "/carts/removeItem/" + itemId + "/" + cartItem,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${user.data.accessToken}`,
				},
			}
		);

		return response.data;
	} catch (error: any) {
		if (error.response.status === 401) {
			const response = await RefreshAccessTokenAPI(user);

			return response;
		}
		console.log(error);
	}
};

export const ClearCartApi = async (user: TUserType) => {
	try {
		const response = await axios.get(DEV_BASE_URL + "/carts/clearCart", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${user.data.accessToken}`,
			},
		});

		return response.data;
	} catch (error: any) {
		if (error.response.status === 401) {
			const response = await RefreshAccessTokenAPI(user);

			return response;
		}
		console.log(error);
	}
};
