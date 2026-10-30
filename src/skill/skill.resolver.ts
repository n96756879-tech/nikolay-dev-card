import { Resolver, Query } from '@nestjs/graphql';
import { SkillType } from './dto/skill.type';
import { SkillService } from './skill.service';
import { Skill } from '@prisma/client';

@Resolver(() => SkillType)
export class SkillResolver {
  constructor(private readonly skillService: SkillService) {}

  @Query(() => [SkillType], { name: 'skills' })
  async getSkills(): Promise<Skill[]> {
    return this.skillService.getAllSkills();
  }
}
