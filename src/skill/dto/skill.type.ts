import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SkillType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}
