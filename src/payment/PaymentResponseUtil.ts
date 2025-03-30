export interface RawPGResponse {
  success: boolean;
  transactionId?: string;
  errorCode?: string;
}

export function validateResponse(response: RawPGResponse): boolean {
  return !(response.success && !response.transactionId);
}

export function mapResponseToStatus(
  response: RawPGResponse,
): 'COMPLETED' | 'FAILED' {
  return response.success ? 'COMPLETED' : 'FAILED';
}
