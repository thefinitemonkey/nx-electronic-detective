import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameController } from './game.controller';
import { GameCreatorService } from './game-creator.service';
import { Game, GameSchema } from './schemas/game.schema';



@Module({
  imports: [MongooseModule.forFeature([{ name: Game.name, schema: GameSchema}])],
  controllers: [GameController],
  providers: [GameCreatorService],
})
export class GameModule { }
