import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export async function findUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export async function CreateNewUser(name, email, password) {
  await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
}

export async function CreateNewProject(userId, title, description, imageUrl) {
  await prisma.project.create({
    data: {
      title,
      description,
      imageUrl,
      userId,
    },
  });
}

export async function ListAllProjects(userId) {
  const projects = await prisma.project.findMany({
    where: {
      userId: userId,
    },
  });
  return projects;
}

export async function ChangePassword(userId, newPassword) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      password: newPassword,
    },
  });
}
