import { createProfileService } from "./services/profile";
import { createAuthService } from "./services/auth";
import { createDeviceService } from "./services/device";
import { createApiClient } from "./client";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

const createApi = () => {
  const client = createApiClient(BASE_URL);

  return {
    profile: createProfileService(client),
    auth: createAuthService(client),
    devices: createDeviceService(client),
  };
};

// Create a singleton instance
export const api = createApi();
