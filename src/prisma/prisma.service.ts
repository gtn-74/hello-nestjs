import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // onModuleInitによって、このAPIとRDBを接続してくれているとのこと
  async onModuleInit() {
    await this.$connect();
  }
}
