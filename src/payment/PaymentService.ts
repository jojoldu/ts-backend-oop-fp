import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './Payment.entity';
import { PaymentStatus } from './PaymentStatus';
import { PaymentGatewayClient } from './PaymentGatewayClient';
import { RawPGResponse } from './PaymentResponseUtil';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly pgClient: PaymentGatewayClient,
  ) {}

  async processPayment(orderId: number, amount: number): Promise<Payment> {
    let payment = this.paymentRepository.create({
      orderId,
      amount,
      status: PaymentStatus.PENDING,
    });
    payment = await this.paymentRepository.save(payment);

    const pgResponse: RawPGResponse = await this.pgClient.requestPayment(
      orderId,
      amount,
    );

    if (!pgResponse.success || !pgResponse.transactionId) {
      payment.fail();
      await this.paymentRepository.save(payment);
      throw new Error('Invalid PG Response');
    }

    if (pgResponse.success) {
      payment.complete(pgResponse.transactionId);
    } else {
      payment.fail();
    }

    const result = await this.paymentRepository.save(payment);
    this.logger.log(
      `결제 처리 완료: Payment ID=${result.id}, Status=${result.status}`,
    );
    return result;
  }
}
