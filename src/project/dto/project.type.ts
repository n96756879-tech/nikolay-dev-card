import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProjectType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String, { nullable: true })
  url?: string | null;
}
