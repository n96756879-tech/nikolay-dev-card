import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const profileEmail = 'nikt0lmachev@yandex.ru';

  const existingProfile = await prisma.profile.findFirst({
    where: { email: profileEmail },
  });

  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: {
        name: 'Николай Толмачев',
        description: 'Начинающий AI Full-Stack Developer / Vibe Coder',
        github: 'https://github.com/n96756879-tech',
        linkedin: null,
      },
    });

    const skills = [
      'TypeScript',
      'Node.js',
      'NestJS',
      'PostgreSQL',
      'Prisma',
      'GraphQL',
      'Docker',
      'Next.js',
      'React',
      'Supabase',
    ];

    for (const skillName of skills) {
      const existingSkill = await prisma.skill.findFirst({
        where: { profileId: existingProfile.id, name: skillName },
      });

      if (!existingSkill) {
        await prisma.skill.create({
          data: { name: skillName, profileId: existingProfile.id },
        });
      }
    }

    const projects = [
      {
        name: 'ORAKUL AI',
        description:
          'AI-сервис для анализа футбольных матчей. Самостоятельная разработка с использованием AI coding agents. Технологии: Next.js, React, TypeScript, Supabase.',
        url: 'https://orakul-ai-jet.vercel.app/',
      },
    ];

    for (const projectData of projects) {
      const existingProject = await prisma.project.findFirst({
        where: { profileId: existingProfile.id, name: projectData.name },
      });

      if (existingProject) {
        await prisma.project.update({
          where: { id: existingProject.id },
          data: projectData,
        });
      } else {
        await prisma.project.create({
          data: { ...projectData, profileId: existingProfile.id },
        });
      }
    }
  } else {
    await prisma.profile.create({
      data: {
        name: 'Николай Толмачев',
        description: 'Начинающий AI Full-Stack Developer / Vibe Coder',
        email: profileEmail,
        github: 'https://github.com/n96756879-tech',
        linkedin: null,
        skills: {
          create: [
            { name: 'TypeScript' },
            { name: 'Node.js' },
            { name: 'NestJS' },
            { name: 'PostgreSQL' },
            { name: 'Prisma' },
            { name: 'GraphQL' },
            { name: 'Docker' },
            { name: 'Next.js' },
            { name: 'React' },
            { name: 'Supabase' },
          ],
        },
        projects: {
          create: [
            {
              name: 'ORAKUL AI',
              description:
                'AI-сервис для анализа футбольных матчей. Самостоятельная разработка с использованием AI coding agents. Технологии: Next.js, React, TypeScript, Supabase.',
              url: 'https://orakul-ai-jet.vercel.app/',
            },
          ],
        },
      },
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
