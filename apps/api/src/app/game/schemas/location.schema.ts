import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address, AddressSchema } from './address.schema';
import { Character, CharacterSchema } from './character.schema';
import { Weapon, WeaponSchema } from './weapon.schema';

@Schema()
export class Location extends Document {
  @Prop()
  "name": string;

  @Prop({ type: AddressSchema })
  "address": Address;

  @Prop({ type: [CharacterSchema]})
  "occupants": [Character];

  @Prop({ type: WeaponSchema })
  "weapon": Weapon;
}
export const LocationSchema = SchemaFactory.createForClass(Location);
