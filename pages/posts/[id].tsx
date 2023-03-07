import { getAllPosts, getOnePost, Post } from '@/services/posts';
import { GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface propsType {
	post: Post
}
export default function PostCard({ post }: propsType) {
	const { query, back } = useRouter();
	// const goBack = (event: MouseEventHandler<HTMLButtonElement>) => back()
	return (
		<div>
			<Head>
				<title>{`${post.title}`}</title>
			</Head>
			<div>Id: {query.id}</div>
			<div>
				<div>Title: { post.title }</div>
				<div>Body: { post.body }</div>
				<div>Id from post: { post.id }</div>
				<Image src={`https://source.unsplash.com/random/200x200?sig=${query.id}`} alt={`Random Image`}
				width={150}
				height={150}
				quality={50}
				/>
				<button onClick={back}>Go Back</button>
			</div>
		</div>
	)
}

// export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{post: Post}>> {
// 	const post = await getOnePost(Number(context!.params!.id));
// 	return {
// 		props: { post }
// 	}
// }

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<{post: Post}> & { revalidate: number }> {
	const post = await getOnePost(Number(context!.params!.id));
	return {
		props: { post },
		revalidate: 10
	}
}


export async function getStaticPaths() {
	const posts = await getAllPosts();

	return {
		paths: posts.map((post) => ({ params: { id: post.id.toString() }})),
		fallback: false
	}
}
