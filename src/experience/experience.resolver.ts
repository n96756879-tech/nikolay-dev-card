import { Resolver, Query } from '@nestjs/graphql';
import { ExperienceType } from './dto/experience.type';
import { ExperienceService } from './experience.service';
import { Experience } from '@prisma/client';

@Resolver(() => ExperienceType)
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @Query(() => [ExperienceType], { name: 'experience' })
  async getExperience(): Promise<Experience[]> {
    return this.experienceService.getAllExperience();
  }
}
