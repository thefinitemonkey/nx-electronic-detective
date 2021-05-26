import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameController } from './game.controller';
import { GameCreatorService } from './game-creator.service';



@Module({
  imports: [],
  controllers: [GameController],
  providers: [GameCreatorService],
})
export class GameModule { }
