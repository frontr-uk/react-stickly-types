import { Args, Query, Resolver } from '@nestjs/graphql';
import { CatService } from './cat.service';
import { ParseIntPipe } from '@nestjs/common';

@Resolver('Cat')
export class CatResolver {
  constructor(private catService: CatService) {}

  @Query('cats')
  async getCats() {
    return this.catService.findAll();
  }

  @Query('cat')
  async findOneById(@Args('id', ParseIntPipe) id: number) {
    console.error('dd', id);
    return this.catService.findOneById(id);
  }
}
