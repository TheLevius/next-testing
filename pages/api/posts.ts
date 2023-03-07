import { NextApiRequest, NextApiResponse } from 'next';

type Post = {
	title: string;
	body: string;
};
export default function PostsApi(req: NextApiRequest, res: NextApiResponse) {
	// communication with Prisma
	res.status(200).json([
		{
			title: 'hello',
			body: 'world',
		},
	]);
}
