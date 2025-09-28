import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/auth.guard';

@ApiBadRequestResponse({ description: 'Bad request' })
@ApiUnauthorizedResponse({ description: 'Unathorized' })
@ApiNotFoundResponse({ description: 'Not found' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@Controller('testimonial')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @ApiOperation({
    summary: 'add a new testimonial',
    description: 'Add a new testimonial',
  })
  @ApiCreatedResponse({ description: 'Created' })
  @Post()
  create(@Body() dto: CreateTestimonialDto) {
    return this.testimonialService.create(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'view all testimonials',
    description: 'View all testimonials',
  })
  @ApiOkResponse({ description: 'Ok' })
  @Get()
  @UseGuards(JwtGuard)
  findAll() {
    return this.testimonialService.findAll();
  }

  @ApiOperation({
    summary: 'view all approved testimonials',
    description: 'View all approved testimonials',
  })
  @ApiOkResponse({ description: 'Ok' })
  @Get('approved')
  findAllApproved() {
    return this.testimonialService.findAllApproved();
  }

  @ApiOperation({
    summary: 'view a testimonial by id',
    description: 'View a testimonial by id',
  })
  @ApiOkResponse({ description: 'Ok' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testimonialService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'update a testimonial by id',
    description: 'Update a testimonial by id',
  })
  @ApiAcceptedResponse({ description: 'Accepted' })
  @Patch(':id')
  @UseGuards(JwtGuard)
  update(@Param('id') id: string) {
    return this.testimonialService.update(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'delete a testimonial by id',
    description: 'Delete a testimonial by id',
  })
  @ApiNoContentResponse({ description: 'No content' })
  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string) {
    return this.testimonialService.remove(id);
  }
}
