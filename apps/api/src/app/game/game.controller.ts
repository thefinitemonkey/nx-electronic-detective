import { Controller, Get, Param, Query, Post } from '@nestjs/common';

import { GameCreatorService }  from './game-creator.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameCreatorService: GameCreatorService) {}

  @Post('create')
  getData(@Query("name") name: string) {
    // Create the game setup and return the ID for the game
    return this.gameCreatorService.createGame(name);
  }
}
