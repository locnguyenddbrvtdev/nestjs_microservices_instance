import { Public } from '@decorators';
import { Controller, Get, HttpException } from '@nestjs/common';

@Public()
@Controller()
export class TestController {
  constructor() {}

  @Get()
  test() {
    if (Math.random() < 0.5) {
      return 'Heads';
    } else {
      throw new HttpException({ message: 'Some thing went wrong' }, 502);
    }
  }
}
