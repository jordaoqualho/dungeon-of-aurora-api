import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users', timestamps: true })
export class UserDto {
  @Prop()
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
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

export type UserEntity = UserDto & Document;

export const UserSchema = SchemaFactory.createForClass(UserDto);
