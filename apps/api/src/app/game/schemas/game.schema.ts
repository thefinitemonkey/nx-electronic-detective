import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LocationSchema } from './location.schema';


export type GameDocument = Game & Document;

@Schema()
export class Game {
  @Prop(raw({
    "A": { type: LocationSchema },
    "B": { type: LocationSchema },
    "C": { type: LocationSchema },
    "D": { type: LocationSchema },
    "E": { type: LocationSchema },
    "F": { type: LocationSchema },
  }))
  locations: Record<string, unknown>;

  @Prop()
  scene: string;

  @Prop()
  victim: string;

  @Prop()
  murderer: string;

  @Prop()
  weapon: string;
}
