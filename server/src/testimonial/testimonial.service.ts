/* eslint-disable no-useless-catch */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback, FeedbackDocument } from 'src/schemas/feedback.schema';
import { Model } from 'mongoose';

@Injectable()
export class TestimonialService {
  constructor(
    @InjectModel(Feedback.name)
    private testimonialModel: Model<FeedbackDocument>,
  ) {}

  async create(dto: CreateTestimonialDto) {
    try {
      const createdTestimonial = new this.testimonialModel(dto);
      await createdTestimonial.save();

      return { data: createdTestimonial };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const testimonials = await this.testimonialModel.find();
      if (testimonials.length === 0) {
        throw new NotFoundException('No testimonial found');
      }

      return { data: testimonials, count: testimonials.length };
    } catch (error) {
      throw error;
    }
  }

  async findAllApproved() {
    try {
      const testimonials = await this.testimonialModel.find({ approved: true });
      if (testimonials.length === 0) {
        throw new NotFoundException('No approved testimonial found');
      }

      return { data: testimonials, count: testimonials.length };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Testimonial ID is required');
      }

      const testimonial = await this.testimonialModel.findById(id);
      if (!testimonial) {
        throw new NotFoundException('No testimonial found');
      }

      return { data: testimonial };
    } catch (error) {
      throw error;
    }
  }

  async update(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Testimonial ID is required');
      }

      const updatedTestimonial = await this.testimonialModel.findByIdAndUpdate(
        id,
        { approved: true },
        { new: true },
      );
      if (!updatedTestimonial) {
        throw new NotFoundException('No testimonial found');
      }

      return { data: updatedTestimonial };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Testimonial ID is required');
      }

      const deletedTestimonial =
        await this.testimonialModel.findByIdAndDelete(id);
      if (!deletedTestimonial) {
        throw new NotFoundException('No testimonial found');
      }

      return { message: 'Testimonial deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}
