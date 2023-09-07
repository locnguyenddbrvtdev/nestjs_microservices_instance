import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TcpService } from './tcp.service';

@Controller('tcp')
export class TcpController {
  constructor(private readonly tcpService: TcpService) {}

  @MessagePattern('your-tcp-pattern')
  handleTcpRequest(data: any) {
    return this.tcpService.handleTcpRequest(data);
  }
}
