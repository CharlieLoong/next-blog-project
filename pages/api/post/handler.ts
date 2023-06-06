import prisma from '@/lib/db';
import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === 'POST') {
    const { title, content } = req.body;
    if (session) {
      let user = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
      });
      if (user == null) {
        user = await prisma.user.create({
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
          authorId: user?.id
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
