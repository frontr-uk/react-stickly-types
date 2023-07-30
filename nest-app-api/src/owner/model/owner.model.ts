import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Owner {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;
}
