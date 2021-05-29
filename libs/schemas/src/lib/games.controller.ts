import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post('create')
  async createGame(@Body('creator') creator: string) {
    const gameId = await this.gamesService.createGame(creator);
    return { id: gameId };
  }

  @Get(':id')
  async getProduct(@Param('id') gameId: string) {
    const game = await this.gamesService.getGame(gameId);
    return game;
  }

  @Delete(':id')
  async deleteGame(@Param('id') gameId: string) {
    const result = await this.gamesService.deleteGame(gameId);
    return result;
  }
}
