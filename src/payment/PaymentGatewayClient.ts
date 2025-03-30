import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PaymentGatewayClient {
  private readonly logger = new Logger(PaymentGatewayClient.name);

  async requestPayment(
    orderId: number,
    amount: number,
  ): Promise<{ success: boolean; transactionId?: string; errorCode?: string }> {
    this.logger.log(`PG API 호출: orderId=${orderId}, amount=${amount}`);
    await this.requestPgApi(); // Simulate network delay
    return {
      success: true,
      transactionId: 'PGTX-12345',
    };
  }

  private async requestPgApi() {
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
}
