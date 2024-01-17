import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  ArmorClass,
  Content,
  Cost,
  EquipmentDamage,
  Range,
  Speed,
} from 'src/classes';

@Schema({ collection: 'equipments', timestamps: true, versionKey: false })
export class EquipmentDto {
  @Prop({ type: String })
  name: string;

  @Prop({ type: Cost })
  cost: Cost;

  @Prop({ type: String })
  category: string;

  @Prop({ type: [String] })
  description?: string[];

  @Prop({ type: [String] })
  special?: string[];

  @Prop({ type: [String] })
  properties?: string[];

  @Prop({ type: Number, default: 1 })
  weight?: number;

  @Prop({ type: Number })
  minimumStrength?: number;

  @Prop({ type: Content })
  contents?: Content[];

  @Prop({ type: Number })
  quantity?: number;

  @Prop({ type: Boolean })
  stealthDisadvantage?: boolean;

  @Prop({ type: String })
  armorCategory?: string;

  @Prop({ type: String })
  categoryRange?: string;

  @Prop({ type: String })
  weaponRange?: string;

  @Prop({ type: String })
  weaponCategory?: string;

  @Prop({ type: String })
  vehicleCategory?: string;

  @Prop({ type: String })
  toolCategory?: string;

  @Prop({ type: String })
  capacity?: string;

  @Prop({ type: ArmorClass })
  armorClass?: ArmorClass;

  @Prop({ type: Range })
  range?: Range;

  @Prop({ type: Range })
  throwRange?: Range;

  @Prop({ type: Speed })
  speed?: Speed;

  @Prop({ type: EquipmentDamage })
  damage?: EquipmentDamage;

  @Prop({ type: EquipmentDamage })
  twoHandedDamage?: EquipmentDamage;
}

export type EquipmentEntity = EquipmentDto & Document;
export const EquipmentSchema = SchemaFactory.createForClass(EquipmentDto);
