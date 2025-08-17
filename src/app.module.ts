import { Module } from '@nestjs/common';
// import { CatsController } from './cats/cats.controller';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  // controllers: [CatsController],
  providers: [AppService],
})
export class AppModule {}
