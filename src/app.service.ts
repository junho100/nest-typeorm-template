import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './entity/test.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Test) private readonly testRepository: Repository<Test>,
  ) {}

  sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }
  async getHello() {
    await this.sleep(3000);
    const date = new Date();
    const newTest = this.testRepository.create({
      title: date.toString(),
    });
    await this.testRepository.save(newTest);
    return 'hello world!';
  }
}
