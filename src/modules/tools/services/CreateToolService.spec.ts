import FakeToolRepository from '../repositories/fakes/FakeToolRepository';
import CreateToolService from './CreateToolService';

describe('CreateToolService', () => {
  it('should be able to create a new tool', async () => {
    const fakeToolRepository = new FakeToolRepository();
    const createToolService = new CreateToolService(fakeToolRepository);

    const tool = await createToolService.execute({
      title: 'Test',
      description: 'description-test',
      link: 'http://test.com',
      tags: ['test', 'test1'],
      user_id: 'user-id',
    });
    expect(tool).toHaveProperty('title');
    expect(tool.user_id).toBe('user-id');
  });
});
