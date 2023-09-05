import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SERVICE_LIST } from '@enums';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  isDevelopment(): boolean {
    return this.configService.get('NODE_ENV') === 'development';
  }

  thisService(): SERVICE_LIST {
    return this.configService.get('THIS_SERVICE');
  }

  getThisTCPPort(): number {
    return +this.configService.get(`${this.thisService()}_TCP_PORT`);
  }

  getThisHTTPPort(): number {
    return +this.configService.get(`${this.thisService()}_HTTP_PORT`);
  }

  getThisSecrectAccessToken(): string {
    return this.configService.get<string>(
      `${this.thisService()}_SECRECT_ACCESS_TOKEN`,
    );
  }

  getServiceTCPPort(service: SERVICE_LIST): number {
    return +this.configService.get(`${service}_TCP_PORT`);
  }
}
