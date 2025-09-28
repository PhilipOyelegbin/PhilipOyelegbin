import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlacklistDocument = HydratedDocument<Blacklist>;

@Schema({ timestamps: true })
export class Blacklist {
  @Prop({ required: true })
  token: string;
}

export const BlacklistSchema = SchemaFactory.createForClass(Blacklist);
