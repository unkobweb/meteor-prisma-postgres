import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

Meteor.methods({
  'tasks.insert'(title) {
    return prisma.task.create({
      data: {
        title,
      },
    });
  },
  'tasks.list'() {
    return prisma.task.findMany();
  },
  'tasks.complete'(id) {
    return prisma.task.update({
      where: { id },
      data: {
        completed: true,
      },
    });
  }
});