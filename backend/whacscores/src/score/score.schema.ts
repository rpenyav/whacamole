import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Score extends Document {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  score: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
