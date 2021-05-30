import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Location } from '@electronic-detective/interfaces';


export type GameDocument = Game & Document;

@Schema()
export class Game {
  @Prop()
  locations: Location[];

  @Prop()
  creator: string;

  @Prop()
  scene: string;

  @Prop()
  victim: string;

  @Prop()
  murderer: string;

  @Prop()
  weapon: string;
}
export const GameSchema = SchemaFactory.createForClass(Game);

export interface Game extends Document {
  id: string,
  creator: string,
  scene: string,
  victim: string,
  murcerer: string,
  weapon: string,
  locations: Location[]
}
