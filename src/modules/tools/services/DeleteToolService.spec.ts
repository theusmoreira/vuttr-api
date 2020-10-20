import AppError from '@shared/errors/AppError';
import FakeToolRepository from '../repositories/fakes/FakeToolRepository';
import DeleteToolService from './DeleteToolService';

describe('DeleteToolService', () => {
  it('should be able to delete a tool', async () => {
    const fakeToolRepository = new FakeToolRepository();
    const deleteToolService = new DeleteToolService(fakeToolRepository);

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
    const fakeToolRepository = new FakeToolRepository();
    const deleteToolService = new DeleteToolService(fakeToolRepository);

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
