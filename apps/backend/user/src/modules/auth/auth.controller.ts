import { Public } from '@decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Public()
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor() {}

  @Post('sign-up')
  async userSignUp(@Body() userSignUpPayload: any) {}
}
