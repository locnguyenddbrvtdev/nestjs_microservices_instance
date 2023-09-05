import { Module } from '@nestjs/common';
import { AppConfigModule } from '@modules/config/config.module';
import { TcpModule } from '@modules/tcp/tcp.module';

@Module({
  imports: [AppConfigModule, TcpModule],
})
export class AppModule {}
