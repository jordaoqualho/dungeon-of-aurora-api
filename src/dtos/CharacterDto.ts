import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CharacterRaces, Classes, SkillType } from 'src/types';

export type CharacterDocument = Character & Document;

@Schema()
export class Character {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Player' })
  playerId: string;

  @Prop({ required: true, enum: Classes })
  class: Classes;

  @Prop({ required: true, enum: CharacterRaces })
  race: CharacterRaces;

  @Prop({ required: true, enum: SkillType, type: [String] })
  skills: SkillType[];

  @Prop({ type: [String] })
  equipment: string[];

  @Prop({ required: true })
  gold: number;

  @Prop({ type: [String] })
  quests: string[];

  @Prop({ required: true, min: 1, max: 20 })
  inspiration: number;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
