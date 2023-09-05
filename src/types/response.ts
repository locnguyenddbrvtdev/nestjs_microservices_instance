import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';

export interface IResponseHttp<T> {
  code: number;
  message: string;
  success: boolean;
  data: T;
}

export class IResponseHttpException<T> {
  @ApiProperty({
    description: 'Application code',
  })
  code: number;
  @ApiProperty({
    description: 'Can be success or error message',
  })
  message: string;
  @ApiProperty({
    description: 'Is API success',
  })
  success: boolean;
  @ApiProperty({
    description: 'Result data if exist',
  })
  data: T;
  @ApiProperty()
  path: string;
  @ApiProperty()
  timestamp: Date;
}
