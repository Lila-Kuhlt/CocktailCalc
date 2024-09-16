import {Logger, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {loggingMiddleware, PrismaModule} from 'nestjs-prisma';
import {CalcModule} from "@/controller/calc.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'debug',
          }),
        ],
      },
    }),
    CalcModule
  ],
})
export class AppModule {
}
