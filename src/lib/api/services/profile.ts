import { Profile } from "@/types/user";
import { ApiClient } from "../client";
import { UpdateProfileRequest } from "@/types/api/profile";
import { ApiResponse } from "@/types/api/common";

export const createProfileService = (client: ApiClient) => ({
  show: async (): Promise<Profile> => {
    const response = await client.get<ApiResponse<Profile>>(`/api/profile`);
    return response.data;
  },

  update: async (data: UpdateProfileRequest): Promise<void> => {
    await client.put<void>(`/api/profile`, data);
  },
});

export type ProfileService = ReturnType<typeof createProfileService>;
