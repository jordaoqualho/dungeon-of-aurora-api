import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'players', timestamps: true })
export class PlayerDto extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  avatarUrl: string;

  @Prop({ type: Number, default: 0 })
  totalGamesPlayed: number;

  @Prop({ type: [{ type: String }] })
  quests: string[];

  @Prop({ type: Number, max: 1, default: 0 })
  inspiration: number;
}

export const PlayerSchema = SchemaFactory.createForClass(PlayerDto);

export class LoginDto {
  email: string;
  password: string;
}
