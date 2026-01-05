// Mock integration point for third-party delivery partners.
// In production, replace with real provider SDK or REST API.

export interface DeliveryRequest {
  userId: string;
  category: "GROCERIES" | "MEDICINES" | "MEALS";
  items: string[];
}

export interface DeliveryResponse {
  externalOrderId: string;
  etaMinutes: number;
}

export async function placeDeliveryOrder(
  _payload: DeliveryRequest
): Promise<DeliveryResponse> {
  // Simulate async third-party call.
  return {
    externalOrderId: "MOCK-" + Date.now().toString(),
    etaMinutes: 45
  };
}



