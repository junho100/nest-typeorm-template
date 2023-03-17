import { Controller, Headers, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

const idempotencyResponses = new Map();

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //DB에 create 요청을 보내는 API
  @Post('/test')
  async getHello(
    @Headers('Idempotency-Key') key: string,
    @Res() res: Response,
  ) {
    // 요청이 이미 한번 실행된 경우 -> 200 success, 저장 실행 X
    if (idempotencyResponses.has(key) && idempotencyResponses.get(key) !== '') {
      const response = idempotencyResponses.get(key);
      return res.status(200).json(response);
    }

    //최초 요청이 실행 중인 경우 -> 409 conflict, 저장 실행 X
    if (idempotencyResponses.has(key) && idempotencyResponses.get(key) === '') {
      return res.status(409);
    }

    //최초 요청 -> 201 created, 저장 실행 O
    if (key != null) {
      idempotencyResponses.set(key, '');
    }
    const msg = await this.appService.getHello();
    const result = {
      msg,
    };

    idempotencyResponses.set(key, result);

    return res.status(201).json(result);
  }
}
