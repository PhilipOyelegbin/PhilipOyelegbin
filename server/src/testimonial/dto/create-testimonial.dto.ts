import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTestimonialDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the person giving the testimonial',
    required: true,
  })
  @IsNotEmpty({ message: 'Full name can not be blank' })
  @IsString({ message: 'Full name must be a string' })
  full_name: string;

  @ApiProperty({
    example: 'jd@gmail.com',
    description: 'Email of the person giving the testimonial',
    required: true,
  })
  @IsNotEmpty({ message: 'Email can not be blank' })
  @IsString({ message: 'Emal must be a string' })
  email: string;

  @ApiProperty({
    example: 'Very satisfied with the service provided.',
    description: 'Comment of the given testimonial',
    required: true,
  })
  @IsNotEmpty({ message: 'Comment can not be blank' })
  @IsString({ message: 'Comment must be a string' })
  comment: string;

  @ApiProperty({
    example: 5,
    description: 'Rating of the person giving the testimonial',
    required: true,
  })
  @IsNotEmpty({ message: 'Rating can not be blank' })
  @IsNumber({}, { message: 'Rating must be a number' })
  rating: number;
}
