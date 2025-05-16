import { Device } from "@/types/user";
import ApiClient from "../client";

class UserService {
  constructor(private readonly client: ApiClient) {}

  getDevices = async (id: number): Promise<Device[]> => {
    const response = await this.client.get<Device[]>(
      `/api/users/${id}/devices`
    );
    return response.data || [];
  };
}

export default UserService;
