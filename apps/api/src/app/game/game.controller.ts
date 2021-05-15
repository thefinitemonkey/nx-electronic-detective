import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('game')
export class GameController {
  @Post('create')
  getData(@Param("name") name: string) {
    // Create the game setup and return the ID for the game
  }
}
