import { Module } from '@nestjs/common';
import { CalcController } from './calc.controller';
import { CalcService } from './calc.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  imports: [],
  controllers: [CalcController],
  providers: [CalcService, PrismaService],
})
export class CalcModule {}
