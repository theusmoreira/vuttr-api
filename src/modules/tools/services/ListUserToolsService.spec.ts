import FakeToolRepository from '../repositories/fakes/FakeToolRepository';
import ListUserTools from './ListUserToolsService';

let fakeToolRepository: FakeToolRepository;
let listUserTools: ListUserTools;

describe('ListToolsService', () => {
  beforeEach(() => {
    fakeToolRepository = new FakeToolRepository();
    listUserTools = new ListUserTools(fakeToolRepository);
  });
  it('should be able to list tools', async () => {
    const tool1 = await fakeToolRepository.create({
      title: 'Test',
      description: 'description-test',
      link: 'http://test.com',
      tags: ['test', 'test1'],
      user_id: 'user-id',
    });

    const tool2 = await fakeToolRepository.create({
      title: 'Test',
      description: 'description-test',
      link: 'http://test.com',
      tags: ['test', 'test1'],
      user_id: 'user-id',
    });

    const tool3 = await fakeToolRepository.create({
      title: 'Test',
      description: 'description-test',
      link: 'http://test.com',
      tags: ['test', 'test1'],
      user_id: 'user-id',
    });

    const tools = await listUserTools.execute({
      user_id: 'user-id',
    });

    expect(tools).toEqual([tool1, tool2, tool3]);
  });

  it('should not be able to list another user tools', async () => {
    const tool1 = await fakeToolRepository.create({
      title: 'Test',
      description: 'description-test',
      link: 'http://test.com',
      tags: ['test', 'test1'],
      user_id: 'user-id',
    });

    const tool2 = await fakeToolRepository.create({
      title: 'Test',
      description: 'description-test',
      link: 'http://test.com',
      tags: ['test', 'test1'],
      user_id: 'user-id',
    });

    const tool3 = await fakeToolRepository.create({
      title: 'Test',
      description: 'description-test',
      link: 'http://test.com',
      tags: ['test', 'test1'],
      user_id: 'user-id',
    });

    const tools = await listUserTools.execute({
      user_id: 'another-id',
    });

    expect(tools).not.toEqual([tool1, tool2, tool3]);
  });
});
