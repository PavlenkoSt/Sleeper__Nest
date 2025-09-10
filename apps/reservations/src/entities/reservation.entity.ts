import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Reservation extends AbstractDocument {
  @Prop({ required: true })
  timestamp: Date;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  invoiceId: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
