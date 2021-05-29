import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Game } from './game.model';
import { GameFunctions } from './utils/gameFunctions';

@Injectable()
export class GamesService {
  constructor(@InjectModel('Game') private readonly gameModel: Model<Game>) {}

  async createGame(creator: string) {
    const newSetup = GameFunctions.buildGame();
    const newGame = new this.gameModel({
      creator,
      murderer: newSetup.murderer,
      victim: newSetup.victim,
      scene: newSetup.scene,
      weapon: newSetup.weapon,
      locations: newSetup.locations,
    });
    const result = await newGame.save();
    return result.id as string;
  }

  async getGame(gameId: string) {
    let game;
    try {
      game = await this.gameModel.findById(gameId).exec();
    } catch (error) {
      throw new NotFoundException('Could not find game');
    }
    if (!game) {
      throw new NotFoundException('Could not find game');
    }
    return game;
  }

  async deleteGame(gameId: string) {
    let result;
    try {
      result = await this.gameModel.deleteOne({ _id: gameId }).exec();
    } catch {
      throw new NotFoundException('Could not find game');
    }
    if (result.n === 0) {
      throw new NotFoundException('Could not find game');
    } else {
      return { removed: 1 };
    }
  }
}
