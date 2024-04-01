import { DEFAULT_VALUES } from "./../utils/constant";
import { create } from "zustand";
import { NotificationState, NotificationAction } from "@/types";
import { persist } from "zustand/middleware";
import { GetNotifications, LoginAPI, ViewNotifications } from "@/utils/Apis";
import { useAuthStore } from "./authStore";

export const useNotificationStore = create<
	NotificationState & NotificationAction
>()(
	persist(
		(set, get) => ({
			notifications: null,
			loading: false,
			error: null,
			apiResponse: null,

			getNotifications: async () => {
				try {
					set({ loading: true, error: null });

					let response = await GetNotifications(useAuthStore.getState().user);

					if (response) {
						set({
							loading: false,
							notifications: response,
							error: {},
						});
					} else {
						set({
							loading: false,
							notifications: null,
							error: response,
						});
					}
				} catch (error) {
					console.log({ error });
				}
			},

			viewNotifications: async () => {
				try {
					set({ loading: true, error: null });

					let response = await ViewNotifications(useAuthStore.getState().user);

					if (response) {
						set({
							loading: false,
							notifications: null,
							error: {},
						});
					} else {
						set({
							loading: false,
							notifications: null,
							error: response,
						});
					}
				} catch (error) {
					console.log({ error });
				}
			},

			clearApiResponse: () => set({ apiResponse: null }),
		}),
		{
			name: "notification", // name of the item in the storage (must be unique)
			skipHydration: true,
		}
	)
);
