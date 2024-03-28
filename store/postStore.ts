import { GetSinglePost } from "./../utils/Apis";
import {
	CompletelyRemoveItemFromCart,
	LikePost,
	PostComment,
	RemoveItemFromCartApi,
} from "../utils/Apis";
import { useAuthStore } from "@/store/authStore";
import { DEFAULT_VALUES } from "../utils/constant";
import { create } from "zustand";
import { PostState, PostAction } from "@/types";
import { persist } from "zustand/middleware";
import { GetAllPosts } from "@/utils/Apis";

export const usePostStore = create<PostState & PostAction>()(
	persist(
		(set, get) => ({
			post: null,
			singlePost: null,
			postCount: 0,
			loading: false,
			processLoading: false,
			error: null,
			apiResponse: null,
			likeLoading: false,
			singlePostLoading: false,

			getAllPosts: async () => {
				try {
					set({ loading: true, error: null });

					let response = await GetAllPosts(useAuthStore.getState().user);

					if (response) {
						set({
							loading: false,
							post: response,
							error: {},
						});
					} else {
						set({
							loading: false,
							post: null,
							error: response,
						});
					}
				} catch (error) {
					console.log({ error });
				}
			},

			getPost: async (postId) => {
				try {
					set({ singlePostLoading: true, error: null });

					let response = await GetSinglePost(
						useAuthStore.getState().user,
						postId
					);

					if (response) {
						set({
							singlePostLoading: false,
							singlePost: response,
							error: {},
						});
					} else {
						set({
							singlePostLoading: false,
							singlePost: null,
							error: response,
						});
					}
				} catch (error) {
					console.log({ error });
				}
			},

			likePost: async (postId: string) => {
				try {
					set({ likeLoading: true, error: null });

					let response = await LikePost(useAuthStore.getState().user, postId);

					if (response) {
						set({
							likeLoading: false,
							// post: response,
							error: {},
						});
					} else {
						set({
							likeLoading: false,
							// post: null,
							error: response,
						});
					}
				} catch (error) {
					console.log({ error });
				}
			},

			postComment: async (postId, body) => {
				try {
					set({ processLoading: true, error: null });

					let response = await PostComment(
						useAuthStore.getState().user,
						postId,
						body
					);

					if (response === "Network Error") {
						set({
							processLoading: false,
							post: null,
							error: response,
						});
					} else {
						set({
							processLoading: false,
							error: {},
							apiResponse: response,
						});
					}
				} catch (error) {
					console.log({ error });
				}
			},

			clearApiResponse: () => set({ apiResponse: null }),
		}),
		{
			name: "post", // name of the item in the storage (must be unique)
			skipHydration: true,
		}
	)
);
