import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Profile } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile(): Promise<Profile | null> {
    return this.prisma.profile.findFirst({
      include: {
        skills: true,
        experience: true,
        projects: true,
      },
    });
  }

  async getSkills(profileId: number) {
    return this.prisma.skill.findMany({
      where: { profileId },
    });
  }

  async getExperience(profileId: number) {
    return this.prisma.experience.findMany({
      where: { profileId },
    });
  }

  async getProjects(profileId: number) {
    return this.prisma.project.findMany({
      where: { profileId },
    });
  }
}
