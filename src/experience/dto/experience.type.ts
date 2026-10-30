import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ExperienceType {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  company?: string | null;

  @Field(() => String, { nullable: true })
  position?: string | null;

  @Field(() => String, { nullable: true })
  period?: string | null;

  @Field(() => String, { nullable: true })
  description?: string | null;
}
