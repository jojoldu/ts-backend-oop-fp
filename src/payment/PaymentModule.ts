import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './Payment.entity';
import { PaymentService } from './PaymentService';
import { PaymentGatewayClient } from './PaymentGatewayClient';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [PaymentService, PaymentGatewayClient],
  exports: [PaymentService],
})
export class PaymentModule {}
