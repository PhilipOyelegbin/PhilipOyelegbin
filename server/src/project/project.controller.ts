/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-useless-catch */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from './../auth/guard/auth.guard';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDetailsDto } from './dto/update-details.dto';
import { File as MulterFile } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiNotFoundResponse({ description: 'Not found' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'add a new project',
    description: 'Add a new project',
  })
  @ApiCreatedResponse({ description: 'Created' })
  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('cover_image'))
  create(@Body() dto: CreateProjectDto, @UploadedFile() file?: MulterFile) {
    try {
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }).transform(file);

      return this.projectService.create(dto, file.originalname, file.buffer);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({
    summary: 'view all projects',
    description: 'View all projects',
  })
  @ApiOkResponse({ description: 'Ok' })
  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @ApiOperation({
    summary: 'view all web projects',
    description: 'View all web projects',
  })
  @ApiOkResponse({ description: 'Ok' })
  @Get('/web')
  findAllWebProjects() {
    return this.projectService.findAllWebProjects();
  }

  @ApiOperation({
    summary: 'view all cloud projects',
    description: 'View all cloud projects',
  })
  @ApiOkResponse({ description: 'Ok' })
  @Get('/cloud')
  findAllCloudProjects() {
    return this.projectService.findAllCloudProjects();
  }

  @ApiOperation({
    summary: 'view a project by id',
    description: 'View a project by id',
  })
  @ApiOkResponse({ description: 'Ok' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @ApiOperation({
    summary: 'update a project image',
    description: 'Update a project image',
  })
  @ApiBody({
    description: 'The fields to update in the project.',
    schema: {
      type: 'object',
      properties: {
        cover_image: {
          type: 'string',
          format: 'binary',
          description: 'The file of the cover image to update.',
          example: 'newblogpreview.jpg',
        },
      },
      required: ['cover_image'],
    },
  })
  @ApiAcceptedResponse({ description: 'Accepted' })
  @ApiBearerAuth()
  @Patch('image/:id')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('cover_image'))
  updateImage(@Param('id') id: string, @UploadedFile() file?: MulterFile) {
    return this.projectService.updateImage(id, file.originalname, file.buffer);
  }

  @ApiOperation({
    summary: 'update a project details',
    description: 'Update a project details',
  })
  @ApiAcceptedResponse({ description: 'Accepted' })
  @ApiBearerAuth()
  @Patch('details/:id')
  @UseGuards(JwtGuard)
  updateDetails(@Param('id') id: string, @Body() dto: UpdateProjectDetailsDto) {
    return this.projectService.updateDetails(id, dto);
  }

  @ApiOperation({
    summary: 'delete a project',
    description: 'Delete a project',
  })
  @ApiNoContentResponse({ description: 'No content' })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
