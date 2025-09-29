/* eslint-disable no-useless-catch */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDetailsDto } from './dto/update-details.dto';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './../schemas/project.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProjectService {
  public readonly config: ConfigService;
  private readonly s3Client: S3Client;

  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    config: ConfigService,
  ) {
    this.config = config;
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: this.config.getOrThrow('BUCKET_PRIVATE_ENDPOINT'),
      credentials: {
        accessKeyId: this.config.getOrThrow('BUCKET_ACCESS_KEY'),
        secretAccessKey: this.config.getOrThrow('BUCKET_SECRET_KEY'),
      },
    });
  }

  async create(dto: CreateProjectDto, fileName: string, file: Buffer) {
    try {
      await this.uploadProjectImage(fileName, file);

      const createdProject = new this.projectModel({
        ...dto,
        cover_image: `${this.config.getOrThrow('BUCKET_PUBLIC_ENDPOINT')}/${fileName}`,
      });
      await createdProject.save();

      return { data: createdProject };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const projects = await this.projectModel.find();
      if (projects.length === 0) {
        throw new NotFoundException('No project found');
      }

      return { data: projects, count: projects.length };
    } catch (error) {
      throw error;
    }
  }

  async findAllWebProjects() {
    try {
      const webprojects = await this.projectModel.find({ tag: 'Web' });
      if (webprojects.length === 0) {
        throw new NotFoundException('No web project found');
      }

      return { data: webprojects, count: webprojects.length };
    } catch (error) {
      throw error;
    }
  }

  async findAllCloudProjects() {
    try {
      const cloudprojects = await this.projectModel.find({ tag: 'Cloud' });
      if (cloudprojects.length === 0) {
        throw new NotFoundException('No cloud project found');
      }

      return { data: cloudprojects, count: cloudprojects.length };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Project ID is required');
      }

      const projects = await this.projectModel.findById(id);
      if (!projects) {
        throw new NotFoundException('Project not found');
      }

      return { data: projects };
    } catch (error) {
      throw error;
    }
  }

  async updateImage(id: string, fileName: string, file: Buffer) {
    try {
      if (!id) {
        throw new BadRequestException('Project ID is required');
      }

      const existingProject = await this.projectModel.findById(id);
      if (!existingProject) {
        throw new NotFoundException('Project not found');
      }

      await this.deleteProjectImage(
        existingProject.cover_image.split('/').pop() || 'null',
      );
      await this.uploadProjectImage(fileName, file);
      const updatedProject = await this.projectModel.findByIdAndUpdate(
        existingProject._id,
        {
          cover_image: `${this.config.getOrThrow('BUCKET_PUBLIC_ENDPOINT')}/${fileName}`,
        },
        {
          new: true,
        },
      );

      return { data: updatedProject };
    } catch (error) {
      throw error;
    }
  }

  async updateDetails(id: string, dto: UpdateProjectDetailsDto) {
    try {
      if (!id) {
        throw new BadRequestException('Project ID is required');
      }

      const project = await this.projectModel.findByIdAndUpdate(id, dto, {
        new: true,
      });
      if (!project) {
        throw new NotFoundException('Project not found');
      }

      return { message: 'Project details updated successfully' };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Project ID is required');
      }

      const project = await this.projectModel.findByIdAndDelete(id);
      if (!project) {
        throw new NotFoundException('Project not found');
      }

      await this.deleteProjectImage(
        project.cover_image.split('/').pop() || 'null',
      );

      return { message: 'Project deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  // Internal functions
  private uploadProjectImage(fileName: string, file: Buffer) {
    return this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.config.getOrThrow('BUCKET_NAME'),
        Key: fileName,
        Body: file,
        ACL: 'public-read',
      }),
    );
  }

  private deleteProjectImage(fileName: string) {
    return this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.config.getOrThrow('BUCKET_NAME'),
        Key: fileName || 'null',
      }),
    );
  }
}
