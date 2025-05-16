import { Device } from "@/types/user";
import ApiClient from "../client";

class UserService {
  constructor(private readonly client: ApiClient) {}

  async getDevices(): Promise<Device[]> {
    const response = await this.client.get<Device[]>(`/api/devices`);
    return response.data || [];
  }

  async revokeDevice(uuid: string): Promise<void> {
    await this.client.delete(`/api/devices/${uuid}`);
  }
}

export default UserService;
