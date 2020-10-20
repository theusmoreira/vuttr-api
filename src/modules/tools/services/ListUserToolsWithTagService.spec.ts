import FakeToolRepository from '../repositories/fakes/FakeToolRepository';
import ListUserToolsWithTagService from './ListUserToolsWithTagService';

describe('ListToolWithTagService', () => {
  it('should be able to list tools with tag', async () => {
    const fakeToolRepository = new FakeToolRepository();
    const listToolsWithTag = new ListUserToolsWithTagService(
      fakeToolRepository,
    );

    await fakeToolRepository.create({
      title: 'Test',
      description: 'description-test',
      link: 'http://test.com',
      tags: ['test'],
      user_id: 'user-id',
    });

    const tool2 = await fakeToolRepository.create({
      title: 'Test',
      description: 'description-test',
      link: 'http://test.com',
      tags: ['test1'],
      user_id: 'user-id',
    });

    const tool3 = await fakeToolRepository.create({
      title: 'Test',
      description: 'description-test',
      link: 'http://test.com',
      tags: ['test', 'test1'],
      user_id: 'user-id',
    });

    const tools = await listToolsWithTag.execute({
      user_id: 'user-id',
      tag: 'test1',
    });

    expect(tools).toEqual([tool2, tool3]);
  });
});
