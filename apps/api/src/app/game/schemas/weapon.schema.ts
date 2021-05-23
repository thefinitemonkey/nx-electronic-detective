import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Weapon extends Document {
  @Prop()
  "id": string;

  @Prop()
  "type": string;

  @Prop()
  "fingerprint": string;
}
export const WeaponSchema = SchemaFactory.createForClass(Weapon);
