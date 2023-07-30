import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MonsterRaces } from '../types';

@Schema()
export class MonsterEntity {
  @Prop({ enum: MonsterRaces, required: true })
  race: MonsterRaces;

  @Prop({ type: Number, required: true })
  challengeRating: number;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: [String] }) // Mongoose will automatically create an array of strings
  senses: string[];

  @Prop({ type: Number, required: true })
  passivePerception: number;

  @Prop({ type: Number, required: true })
  challengeExperience: number;
}

export type MonsterEntityDocument = MonsterEntity & Document;
export const MonsterEntitySchema = SchemaFactory.createForClass(MonsterEntity);
