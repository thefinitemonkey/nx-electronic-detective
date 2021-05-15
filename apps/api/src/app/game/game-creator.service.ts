import { Injectable } from '@nestjs/common';
import { Game } from '@electronic-detective/api-interfaces';
import * as addresses from '../../assets/addresses.json';
import * as characters from '../../assets/characters.json';
import * as locations from '../../assets/locations.json';
import * as weapons from '../../assets/weapons.json';

@Injectable()
export class GameCreatorService {
  createGame(name: strng): Game {


    return {name: "", id: ""};
  }
}
