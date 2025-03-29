import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [__dirname + '/../**/*.entity.{ts,js}'],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
