export interface RawPGResponse {
  success: boolean;
  transactionId?: string;
  errorCode?: string;
}

export function validateResponse(response: RawPGResponse): boolean {
  return !(response.success && !response.transactionId);
}
