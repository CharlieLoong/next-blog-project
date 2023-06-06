import prisma from '@/lib/db';
import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (req.method === 'POST') {
    const { title, content } = req.body;
    if (session) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
      });
      if (user == null) {
        const newUser: User = await prisma.user.create({
          data: {
            email: session?.user?.email as string,
            name: session?.user?.name,
          },
        });
      }
      const result = await prisma.post.create({
        data: {
          title: title,
          content: content,
          authorId: user?.id || newUser.id,
        },
      });
      return res.json(result);
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    console.log('delete post with id: ', id);
      //TODO: check user permissions
      const result = await prisma.post.delete({
        where: {
          id: id,
        },
      });
      return res.json(result);
    } 
  
}
