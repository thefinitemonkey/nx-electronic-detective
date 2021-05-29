import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GamesModule } from '@electronic-detective/schemas';

import { secrets } from '../environments/secrets';

@Module({
  imports: [GamesModule, MongooseModule.forRoot(secrets.mongoPrimary)],
  controllers: [],
  providers: [],
})
export class AppModule {}
