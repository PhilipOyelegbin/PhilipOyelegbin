import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  cover_image: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  tag: string;

  @Prop()
  project_url: string;

  @Prop()
  github_url: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
