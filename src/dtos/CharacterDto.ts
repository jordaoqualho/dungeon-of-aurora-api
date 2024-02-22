import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Features } from 'src/classes';
import { CharacterRaces, Classes, SkillType } from 'src/types';
import { EntityDto } from './EntityDto';

@Schema({ collection: 'characters', timestamps: true, versionKey: false })
export class CharacterDto extends EntityDto {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ enum: Classes })
  class: Classes;

  @Prop({ enum: CharacterRaces })
  race: CharacterRaces;

  @Prop({ enum: SkillType, type: [String] })
  skills: SkillType[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'EquipmentDto' }] })
  equipments: Types.ObjectId[];

  @Prop({ type: Number, default: 0 })
  gold: number;

  @Prop({ type: [String] })
  quests: string[];

  @Prop({ type: Number, max: 1, default: 0 })
  inspiration: number;

  @Prop()
  features: Features[];

  @Prop()
  picture?: string;
}

export type CharacterEntity = CharacterDto & Document;
export const CharacterSchema = SchemaFactory.createForClass(CharacterDto);
