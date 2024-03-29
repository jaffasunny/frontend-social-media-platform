import { DEFAULT_VALUES } from "./../utils/constant";
import { create } from "zustand";
import { NotificationState, NotificationAction } from "@/types";
import { persist } from "zustand/middleware";
import { GetNotifications, LoginAPI } from "@/utils/Apis";
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
					console.log("🚀 ~ getNotifications: ~ response:", response);

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

			// viewNotifications: async () => {
			// 	try {
			// 		set({ loading: true, error: null });

			// 		let response = await LoginAPI(emailOrUsername, password, fcmToken);

			// 		if (typeof response !== "string" && response) {
			// 			set({
			// 				loading: false,
			// 				user: {
			// 					data: response.data,
			// 					message: response.message,
			// 					statusCode: response.statusCode,
			// 					success: response.success,
			// 				},
			// 				isAuthenticated: true,
			// 			});
			// 		} else {
			// 			set({
			// 				loading: false,
			// 				user: DEFAULT_VALUES.user,
			// 				error: response,
			// 				isAuthenticated: false,
			// 			});

			// 			return response;
			// 		}
			// 	} catch (error) {
			// 		set({ error: error || "An error occurred" });
			// 	}
			// },

			clearApiResponse: () => set({ apiResponse: null }),
		}),
		{
			name: "notification", // name of the item in the storage (must be unique)
			skipHydration: true,
		}
	)
);
