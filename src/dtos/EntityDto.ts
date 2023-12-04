import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Attributes, SavingThrow, Spells, defaultAttribute } from 'src/classes';
import { Alignment, Language, Status } from 'src/types';

@Schema({ collection: 'entities', timestamps: true, versionKey: false })
export class EntityDto {
  @Prop({ type: String })
  name: string;

  @Prop({ type: Attributes, default: defaultAttribute })
  attributes: Attributes;

  @Prop({ type: Number, default: 10 })
  armorClass: number;

  @Prop({ type: Number, default: 30 })
  speed: number;

  @Prop({ type: String, enum: Alignment })
  alignment: Alignment;

  @Prop({ type: Number, min: 1, max: 20, default: 1 })
  level: number;

  @Prop({ type: Number, default: 0 })
  experience: number;

  @Prop({ type: Number, default: 6 })
  hitPoints: number;

  @Prop({ type: Number, default: 6 })
  maxHitPoints: number;

  @Prop({ type: [String], enum: Status })
  status: Status[];

  @Prop({ type: [String], enum: Language })
  languages: Language[];

  @Prop({ type: SavingThrow })
  savingThrow: SavingThrow;

  @Prop()
  spells: Spells[];
}

export type EntityEntity = EntityDto & Document;
export const EntitySchema = SchemaFactory.createForClass(EntityDto);
