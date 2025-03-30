// src/payment/payment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PaymentStatus } from './PaymentStatus';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({ nullable: true })
  externalTransactionId: string;

  complete(transactionId: string) {
    if (this.status !== PaymentStatus.PENDING) {
      throw new Error(`이미 결제 완료/실패 상태입니다.`);
    }
    this.status = PaymentStatus.COMPLETED;
    this.externalTransactionId = transactionId;
  }

  fail() {
    if (this.status !== PaymentStatus.PENDING) {
      throw new Error(`이미 완료/실패 상태는 fail() 불가`);
    }
    this.status = PaymentStatus.FAILED;
  }
}
