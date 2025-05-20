import { api } from "@/lib/api";
import { UpdateProfileRequest } from "@/types/api/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: api.profile.show,
  });
};

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => api.profile.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export { useGetProfile, useUpdateProfile };
