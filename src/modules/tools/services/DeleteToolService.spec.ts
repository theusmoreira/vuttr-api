import AppError from '@shared/errors/AppError';
import FakeToolRepository from '../repositories/fakes/FakeToolRepository';
import DeleteToolService from './DeleteToolService';

let fakeToolRepository: FakeToolRepository;
let deleteToolService: DeleteToolService;

describe('DeleteToolService', () => {
  beforeEach(() => {
    fakeToolRepository = new FakeToolRepository();
    deleteToolService = new DeleteToolService(fakeToolRepository);
  });

  it('should be able to delete a tool', async () => {
    const tool = await fakeToolRepository.create({
      title: 'Test',
      description: 'description-test',
      link: 'http://test.com',
      tags: ['test', 'test1'],
      user_id: 'user-id',
    });

    await deleteToolService.execute({
      id: tool.id,
      user_id: tool.user_id,
    });

    const tools = await fakeToolRepository.findToolsByUserId('user_id');

    expect(tools).not.toBe(tool);
  });

  it('should not be able to delete a tool with a non-existent id', async () => {
    await fakeToolRepository.create({
      title: 'Test',
      description: 'description-test',
      link: 'http://test.com',
      tags: ['test', 'test1'],
      user_id: 'user-id',
    });

    await expect(
      deleteToolService.execute({
        id: 'non-existent-id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
