import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Address extends Document {
  @Prop()
  "side": string;

  @Prop()
  "town": string;
}
export const AddressSchema = SchemaFactory.createForClass(Address);
