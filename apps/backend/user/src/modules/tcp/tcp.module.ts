import { Module, Global, Provider } from '@nestjs/common';
import { TcpController } from '@modules/tcp/tcp.controller';
import { TcpService } from '@modules/tcp/tcp.service';
import { Transport, ClientProxyFactory } from '@nestjs/microservices';
import { AppConfigService } from '@modules/config/config.service';
import { SERVICE_LIST } from '@enums';

const providerServiceInstance = (service: SERVICE_LIST): Provider => ({
  provide: service,
  useFactory: (appConfigService: AppConfigService) => {
    const isDevelopment = appConfigService.isDevelopment();
    return ClientProxyFactory.create({
      options: {
        port: appConfigService.getServiceTCPPort(service),
        host: isDevelopment ? '127.0.0.1' : service.toLocaleLowerCase(),
      },
      transport: Transport.TCP,
    });
  },
  inject: [AppConfigService],
});

@Global()
@Module({
  controllers: [TcpController],
  providers: [
    ...Object.values(SERVICE_LIST).map((service) =>
      providerServiceInstance(service),
    ),
    TcpService,
  ],
  exports: Object.values(SERVICE_LIST),
})
export class TcpModule {}
