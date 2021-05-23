import { Controller, Query, Post } from '@nestjs/common';

import { GameCreatorService }  from './game-creator.service';
import { GameAction } from '@electronic-detective/api-interfaces';


@Controller('game')
export class GameController {
  constructor(private readonly gameCreatorService: GameCreatorService) {}

  @Post('create')
  async getData(@Query("name") name: string) {
    // Create the game setup and return the ID for the game
    console.log('Starting request to create game');
    const result: GameAction = await this.gameCreatorService.createGame(name);
    console.log('Received response for creating game: ' + result);
    return result;
  }
}
