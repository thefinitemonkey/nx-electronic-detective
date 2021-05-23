import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { GameController } from './game/game.controller';
import { AppService } from './app.service';
import { GameCreatorService } from './game/game-creator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../environments/environment';


@Module({
  imports: [MongooseModule.forRoot(environment.mongoPrimary, {connectionName: 'electronic-detective',})],
  controllers: [AppController, GameController],
  providers: [AppService, GameCreatorService],
})
export class AppModule {}
