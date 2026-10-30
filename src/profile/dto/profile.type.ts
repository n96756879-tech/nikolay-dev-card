import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SkillType } from '../../skill/dto/skill.type';
import { ExperienceType } from '../../experience/dto/experience.type';
import { ProjectType } from '../../project/dto/project.type';

@ObjectType()
export class ProfileType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String, { nullable: true })
  email?: string | null;

  @Field(() => String, { nullable: true })
  github?: string | null;

  @Field(() => String, { nullable: true })
  linkedin?: string | null;

  @Field(() => [SkillType])
  skills: SkillType[];

  @Field(() => [ExperienceType])
  experience: ExperienceType[];

  @Field(() => [ProjectType])
  projects: ProjectType[];
}
