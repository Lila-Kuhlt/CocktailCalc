import { Controller, Get } from '@nestjs/common';
import { CalcService } from '@/controller/calc.service';

@Controller()
export class CalcController {
  constructor(private readonly appService: CalcService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
