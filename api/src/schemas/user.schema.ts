import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: 'LOCAL' })
  provider: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  telegramChatId: string;
  
  @Prop()
  telegramCode: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
