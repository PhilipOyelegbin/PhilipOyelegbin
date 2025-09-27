import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTestimonialDto } from './create-testimonial.dto';
import { IsBoolean } from 'class-validator';

export class UpdateTestimonialDto extends PartialType(CreateTestimonialDto) {
  @ApiProperty({
    example: true,
    description: 'Approve the given testimonial',
    required: true,
  })
  @IsBoolean({ message: 'Approved must be a boolean' })
  approved: boolean;
}
