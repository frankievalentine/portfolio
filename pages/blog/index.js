import Link from 'next/link';
import Head from 'next/head';
import {getDatabase} from '@/lib/notion';
import {Text} from './[id]';
import styles from '@/styles/blog.module.css';

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Blog({posts}) {
  return (
    <div>
      <Head>
        <title>My Notion Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <h1>Next.js blog powered by Notion API</h1>
        </header>

        <h2 className={styles.heading}>All Posts</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              'en-US',
              {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              }
            );
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/blog/${post.id}`}>
                    <a>
                      <Text text={post.properties.Name.title} />
                    </a>
                  </Link>
                </h3>
                <p className={styles.postDescription}>{date}</p>
                <Link href={`/blog/${post.id}`}>
                  <a>Read post →</a>
                </Link>
              </li>
            );
          })}
        </ol>
        <h2 className={styles.heading}></h2>
        <Link href="/">
          <a className={styles.block}>← Home</a>
        </Link>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
