import { AuthUser } from "@/types/user";
import { ApiClient } from "../client";
import { UpdateProfileRequest } from "@/types/api/profile";

export const createProfileService = (client: ApiClient) => ({
  show: async (): Promise<AuthUser | undefined> => {
    const response = await client.get<AuthUser>(`/api/profile`);
    return response.data;
  },

  update: async (data: UpdateProfileRequest): Promise<void> => {
    await client.put<AuthUser>(`/api/profile`, data);
  },
});

export type ProfileService = ReturnType<typeof createProfileService>;
