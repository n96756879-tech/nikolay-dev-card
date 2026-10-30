import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { ProfileType } from './dto/profile.type';
import { ProfileService } from './profile.service';
import { SkillType } from '../skill/dto/skill.type';
import { ExperienceType } from '../experience/dto/experience.type';
import { ProjectType } from '../project/dto/project.type';
import type { Profile } from '@prisma/client';

@Resolver(() => ProfileType)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileType, { nullable: true, name: 'profile' })
  async getProfile(): Promise<Profile | null> {
    return this.profileService.getProfile();
  }

  @ResolveField(() => [SkillType])
  async skills(@Parent() profile: Profile): Promise<SkillType[]> {
    if ('skills' in profile) {
      return (profile as any).skills;
    }
    return await this.profileService.getSkills(profile.id);
  }

  @ResolveField(() => [ExperienceType])
  async experience(@Parent() profile: Profile): Promise<ExperienceType[]> {
    if ('experience' in profile) {
      return (profile as any).experience;
    }
    return await this.profileService.getExperience(profile.id);
  }

  @ResolveField(() => [ProjectType])
  async projects(@Parent() profile: Profile): Promise<ProjectType[]> {
    if ('projects' in profile) {
      return (profile as any).projects;
    }
    return await this.profileService.getProjects(profile.id);
  }
}
