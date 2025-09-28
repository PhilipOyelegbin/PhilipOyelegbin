import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Multer } from 'multer';

export class CreateProjectDto {
  @ApiProperty({
    description: 'The cover image of the project uploaded as a file',
    type: 'string',
    format: 'binary',
    example: 'blogpreview.png',
  })
  cover_image: Multer.File;

  @ApiProperty({
    description: 'The title of the project',
    example: 'Blog Website',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the project',
    example: 'A blog website built with NestJS and MongoDB',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The tag of the project',
    example: 'Web',
  })
  @IsString()
  @IsNotEmpty()
  tag: string;

  @ApiProperty({
    description: 'The project link of the project',
    example: 'https://sampleblog-website.com',
  })
  @IsString()
  @IsNotEmpty()
  project_url: string;

  @ApiPropertyOptional({
    description: 'The github link of the project',
    example: 'https://github.com/username/sampleblog-website',
  })
  @IsString()
  @IsOptional()
  github_url: string;
}
