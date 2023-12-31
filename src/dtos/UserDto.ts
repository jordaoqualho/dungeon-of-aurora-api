import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users', timestamps: true, versionKey: false })
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
}

export type UserEntity = UserDto & Document;

export const UserSchema = SchemaFactory.createForClass(UserDto);
