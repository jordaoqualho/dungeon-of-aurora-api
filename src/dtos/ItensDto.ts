import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EquipmentType } from '../types';

@Schema({ collection: 'itens', timestamps: true, versionKey: false })
export class ItensDto {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ enum: EquipmentType, required: true })
  type: EquipmentType;

  @Prop({ type: Number })
  damage?: number;

  @Prop({ type: String })
  description?: string;
}

export type EquipmentEntityDocument = ItensDto & Document;
export const EquipmentEntitySchema = SchemaFactory.createForClass(ItensDto);
