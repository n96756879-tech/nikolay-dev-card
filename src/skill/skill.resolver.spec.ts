import { Test, TestingModule } from '@nestjs/testing';
import { SkillResolver } from './skill.resolver';
import { SkillService } from './skill.service';
import { Skill } from '@prisma/client';
import { vi } from 'vitest';

const mockSkill: Skill = {
  id: 1,
  name: 'TypeScript',
  profileId: 1,
};

describe('SkillResolver', () => {
  let resolver: SkillResolver;

  beforeEach(async () => {
    const mockSkillService = {
      getAllSkills: vi.fn().mockResolvedValue([mockSkill]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillResolver,
        { provide: SkillService, useValue: mockSkillService },
      ],
    }).compile();

    resolver = module.get<SkillResolver>(SkillResolver);
    
    // Manually inject the mock since private property isn't being set
    (resolver as any).skillService = mockSkillService;
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return all skills', async () => {
    const result = await resolver.getSkills();
    expect(result).toEqual([mockSkill]);
  });
});