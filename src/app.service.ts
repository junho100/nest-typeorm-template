import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './entity/test.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Test) private readonly testRepository: Repository<Test>,
  ) {}

  async getHello() {
    return await this.testRepository.findOne({
      where: {
        id: 1,
      },
    });
  }
}
