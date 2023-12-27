import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Cost } from 'src/classes';

@Schema({ collection: 'equipments', timestamps: true, versionKey: false })
export class EquipmentDto {
  @Prop({ type: String })
  name: string;

  @Prop({ type: [String] })
  description: string[];

  @Prop({ type: Number, default: 1 })
  weight: number;

  @Prop({ type: Number })
  quantity?: number;

  @Prop({ type: Cost })
  cost: Cost;

  // @Prop({ type: Cost })
  // range?: Cost;
}

export type EquipmentEntity = EquipmentDto & Document;
export const EquipmentSchema = SchemaFactory.createForClass(EquipmentDto);
