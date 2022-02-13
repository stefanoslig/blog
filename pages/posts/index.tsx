import Link from "next/link";
import Container from "../../components/container";
import DateFormatter from "../../components/date-formatter";
import { getAllPosts } from "../../lib/api";
import Post from "../../types/post";

type Props = {
  allPosts: Post[];
};

function Index({ allPosts }: Props) {
  const mainPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <Container>
        <div className="flex flex-col items-center">
          {allPosts.length ? (
            allPosts.map((post) => (
              <article key={post.slug} className="xs:11/12 sm:9/12 lg:w-6/12 mt-8">
                <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                  <a className="text-xl leading-6 font-bold text-orange-500">{post.title}</a>
                </Link>
                <p className="text-lg">{post.excerpt}</p>
                <div className="text-gray-400 flex justify-between text-lg">
                  <DateFormatter dateString={post.date} />
                  <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                    <a className="text-orange-500">read more...</a>
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <p>No blog posted yet :/</p>
          )}
        </div>
      </Container>
    </>
  );
}

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
