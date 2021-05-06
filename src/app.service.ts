import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {
    console.log('App Init....');
    console.log(this.configService);
  }
  getHello(): string {
    return 'Hello Gresh!';
  }
}
