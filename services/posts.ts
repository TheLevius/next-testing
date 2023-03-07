import { API_URL } from '.';

export interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export async function getAllPosts(): Promise<Post[]> {
	const response = await fetch(`${API_URL}/posts`);
	return response.json();
}

export async function getOnePost(id: number): Promise<Post> {
	const response = await fetch(`${API_URL}/posts/${id}`);
	return response.json();
}
