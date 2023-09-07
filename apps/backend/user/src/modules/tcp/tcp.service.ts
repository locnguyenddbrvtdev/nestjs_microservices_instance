import { Injectable } from '@nestjs/common';

@Injectable()
export class TcpService {
  handleTcpRequest(data: any): string {
    // Xử lý và trả về kết quả cho yêu cầu TCP
    return 'TCP response';
  }
}
