import { CatService } from './cat.service';

describe('CatsController', () => {
  let catService: CatService;

  beforeEach(() => {
    catService = new CatService();
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = [
        { id: 1, firstName: 'Brown', lastName: 'Smith', owner: 1 },
      ];

      jest.spyOn(catService, 'findAll').mockImplementation(() => result);

      expect(await catService.findAll).toBe(result);
    });
  });
});
