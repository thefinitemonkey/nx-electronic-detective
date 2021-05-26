import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Character extends Document {
  @Prop()
  "id": string;

  @Prop()
  "name": string;

  @Prop()
  "gender": string;

  @Prop()
  "occupation": string;

  @Prop()
  "relationshipID": string;

  @Prop()
  "relationshipStatus": string;

  @Prop()
  "availableQuestions": [string];

  @Prop(raw({
    portrait: { type: String },
    profile: { typd: String }
  }))
  images: Record<string, unknown>;
}
export const CharacterSchema = SchemaFactory.createForClass(Character);
