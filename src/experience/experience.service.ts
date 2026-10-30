import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Experience } from '@prisma/client';

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  async getAllExperience(): Promise<Experience[]> {
    return this.prisma.experience.findMany();
  }
}
