import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Skill } from '@prisma/client';

@Injectable()
export class SkillService {
  constructor(private prisma: PrismaService) {}

  async getAllSkills(): Promise<Skill[]> {
    return this.prisma.skill.findMany();
  }
}
