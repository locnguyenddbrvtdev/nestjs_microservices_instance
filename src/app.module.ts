import { Module } from '@nestjs/common';
import { AppConfigModule } from '@modules/config/config.module';
import { TcpModule } from '@modules/tcp/tcp.module';
import { AuthModule } from '@modules/auth/auth.module';
import { TestModule } from '@modules/test/test.module';
import { FilterModule } from '@common/filter';
import { InterceptorModule } from '@common/interceptor';

@Module({
  imports: [
    AppConfigModule,
    FilterModule,
    InterceptorModule,
    TcpModule,
    AuthModule,
    TestModule,
  ],
})
export class AppModule {}
