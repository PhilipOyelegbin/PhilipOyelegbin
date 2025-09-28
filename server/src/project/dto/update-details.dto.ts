import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProjectDetailsDto {
  @ApiPropertyOptional({
    description: 'The title of the project',
    example: 'Blog Website',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiPropertyOptional({
    description: 'The description of the project',
    example: 'A blog website built with NestJS and MongoDB',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    description: 'The tag of the project',
    example: 'Web',
  })
  @IsString()
  @IsOptional()
  tag: string;

  @ApiPropertyOptional({
    description: 'The project link of the project',
    example: 'https://sampleblog-website.com',
  })
  @IsString()
  @IsOptional()
  project_url: string;

  @ApiPropertyOptional({
    description: 'The github link of the project',
    example: 'https://github.com/username/sampleblog-website',
  })
  @IsString()
  @IsOptional()
  github_url: string;
}
