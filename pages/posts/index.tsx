/* eslint-disable react/jsx-key */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { getAllPosts, Post } from '@/services/posts';
import Link from 'next/link';
import Head from 'next/head';

interface PropsType {
	posts: Post[]
}
export default function Main({ posts }: PropsType) {
	const [filterValue, setFilterValue] = useState<string>('');
	const onChangeFilterValue = (event: ChangeEvent<HTMLInputElement>) => setFilterValue(event.target.value);
	
	return (
		<div>
			<Head>
				<title>All Posts</title>
			</Head>
			<h1>
				Posts
			</h1>
			<input type={'text'} placeholder={'search'} value={filterValue} onChange={onChangeFilterValue}/>
			<div>{posts.filter((item) => item.title.includes(filterValue)).map((item) =>
			<div><Link href={`/posts/${item.id}`}>{item.title}</Link></div>
			)}
			</div>
		</div>
	)
}

export async function getServerSideProps() {
	const posts = await getAllPosts();

	return {
		props: { posts }
	}
}
