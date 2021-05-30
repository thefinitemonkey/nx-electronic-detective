import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GamesModule } from '@electronic-detective/schemas-games';

import { secrets } from '../environments/secrets';

@Module({
  imports: [GamesModule, MongooseModule.forRoot(secrets.mongoPrimary)],
  controllers: [],
  providers: [],
})
export class AppModule {}
