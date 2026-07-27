import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ServiceRequest, ShippingOrder, UserProfile } from "../backend.d";
import type { Variant_cancelled_pending_out_for_delivery_in_transit_delivered_processing } from "../backend.d";
import { useActor } from "./useActor";

export function useMyOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<ShippingOrder[]>({
    queryKey: ["my-orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyShippingOrders();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}

export function useCallerProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["caller-profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateShippingOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (order: ShippingOrder) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.createShippingOrder(order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      queryClient.invalidateQueries({ queryKey: ["all-orders"] });
    },
  });
}

export function useRegisterUser() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerUser(profile);
    },
  });
}

export function useSaveProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["caller-profile"] });
    },
  });
}

export function useAllOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<ShippingOrder[]>({
    queryKey: ["all-orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllShippingOrders();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: {
      orderId: string;
      status: Variant_cancelled_pending_out_for_delivery_in_transit_delivered_processing;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.updateOrderStatus(orderId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-orders"] });
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
}

export function useGetOrder(orderId: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<ShippingOrder | null>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!actor || !orderId) return null;
      try {
        return await actor.getShippingOrder(orderId);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!orderId,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["is-admin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllServiceRequests() {
  const { actor, isFetching } = useActor();
  return useQuery<ServiceRequest[]>({
    queryKey: ["all-service-requests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServiceRequests();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}

export function useMyServiceRequests() {
  const { actor, isFetching } = useActor();
  return useQuery<ServiceRequest[]>({
    queryKey: ["my-service-requests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyServiceRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitServiceRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: ServiceRequest) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.submitServiceRequest(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["my-service-requests"] });
    },
  });
}
