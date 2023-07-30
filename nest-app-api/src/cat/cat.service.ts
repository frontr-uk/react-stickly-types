import { Injectable } from '@nestjs/common';
import { Cat } from './model/cat.model';

const cats = [
  { id: 1, firstName: 'Brown', lastName: 'Smith', owner: 1 },
  { id: 2, firstName: 'Coco', lastName: 'Channel', owner: 1 },
];

@Injectable()
export class CatService {
  private cats: Array<Cat & { ownerId?: number }> = cats;

  // constructor(catsData = cats) {
  //   this.cats = catsData;
  // }

  findOneById(id: number) {
    return this.cats.find((user) => user.id === Number(id));
  }
  findAll(): Cat[] {
    return this.cats;
  }
}
