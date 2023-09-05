import { Module, Global, Provider } from '@nestjs/common';
import { TcpController } from '@modules/tcp/tcp.controller';
import { TcpService } from '@modules/tcp/tcp.service';
import {
  ClientsModule,
  Transport,
  ClientProxyFactory,
} from '@nestjs/microservices';
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
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: process.env.THIS_SERVICE.toLowerCase(),
          useFactory: (configService: AppConfigService) => {
            const serviceName = configService.thisService();
            const TCP_Port = configService.getThisTCPPort();
            console.log(`${serviceName}_TCP is listening on port ${TCP_Port}`);
            return {
              transport: Transport.TCP,
              options: {
                host: '0.0.0.0',
                port: TCP_Port,
              },
            };
          },
          inject: [AppConfigService],
        },
      ],
    }),
  ],
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
