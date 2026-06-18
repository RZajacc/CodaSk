import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot() {
    return {
      name: 'Codask API',
      version: '0.5',
      docs: '/docs',
    };
  }
}
