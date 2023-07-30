import { CatService } from './cat.service';
export declare class CatResolver {
    private catService;
    constructor(catService: CatService);
    getCats(): Promise<import("./model/cat.model").Cat[]>;
    findOneById(id: number): Promise<import("./model/cat.model").Cat & {
        ownerId?: number;
    }>;
}
