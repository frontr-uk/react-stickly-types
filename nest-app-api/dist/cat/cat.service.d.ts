import { Cat } from './model/cat.model';
export declare class CatService {
    private cats;
    findOneById(id: number): Cat & {
        ownerId?: number;
    };
    findAll(): Cat[];
}
