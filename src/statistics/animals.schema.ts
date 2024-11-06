import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Animal extends Document {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ default: 0 })
  consultationCount: number;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);