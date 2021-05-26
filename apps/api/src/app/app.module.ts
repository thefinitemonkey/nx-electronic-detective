import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GameController } from './game/game.controller';
import { AppService } from './app.service';
import { GameCreatorService } from './game/game-creator.service';


@Module({
  imports: [],
  controllers: [AppController, GameController],
  providers: [AppService, GameCreatorService],
})
export class AppModule {}
