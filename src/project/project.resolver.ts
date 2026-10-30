import { Resolver, Query } from '@nestjs/graphql';
import { ProjectType } from './dto/project.type';
import { ProjectService } from './project.service';
import { Project } from '@prisma/client';

@Resolver(() => ProjectType)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [ProjectType], { name: 'projects' })
  async getProjects(): Promise<Project[]> {
    return this.projectService.getAllProjects();
  }
}
