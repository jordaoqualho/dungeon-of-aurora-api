import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Damage } from 'src/classes';
import { CastingTime, Duration, Range, SchoolOfMagic } from 'src/types';

@Schema({ collection: 'spells', timestamps: true, versionKey: false })
export class SpellDto {
  @Prop({ type: String })
  name: string;

  @Prop({ type: Number })
  level: number;

  @Prop({ type: [String] })
  description: string[];

  @Prop({ type: [String] })
  upgrade: string[];

  @Prop({ type: String })
  school: SchoolOfMagic;

  @Prop({ type: String })
  castingTime: CastingTime;

  @Prop({ type: String })
  range: Range;

  @Prop({ type: String })
  duration: Duration;

  @Prop({ type: Boolean })
  ritual: boolean;

  @Prop({ type: Boolean })
  concentration: boolean;

  @Prop({ type: String })
  classes: string;

  @Prop({ type: Damage })
  damage: Damage;
}

export type SpellEntity = SpellDto & Document;
export const SpellSchema = SchemaFactory.createForClass(SpellDto);
