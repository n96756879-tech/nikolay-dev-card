import { Test, TestingModule } from '@nestjs/testing';
import { SkillService } from './skill.service';
import { PrismaService } from '../prisma/prisma.service';
import { Skill } from '@prisma/client';
import { vi } from 'vitest';

const mockSkill: Skill = {
  id: 1,
  name: 'TypeScript',
  profileId: 1,
};

describe('SkillService', () => {
  let service: SkillService;

  beforeEach(async () => {
    const mockPrismaService = {
      skill: {
        findMany: vi.fn().mockResolvedValue([mockSkill]),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<SkillService>(SkillService);
    
    // Manually inject the mock since private property isn't being set
    (service as any).prisma = mockPrismaService;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all skills', async () => {
    const result = await service.getAllSkills();
    expect(result).toEqual([mockSkill]);
  });
});