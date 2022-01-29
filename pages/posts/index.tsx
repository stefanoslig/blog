import Container from "../../components/container";
import MainPost from "../../components/main-post";
import MoreStories from "../../components/more-stories";
import { getAllPosts } from "../../lib/api";
import Post from "../../types/post";

type Props = {
  allPosts: Post[]
}

function Index({ allPosts }: Props) {
  const mainPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  return (
    <>
      <Container>
        {mainPost && (
          <MainPost
            title={mainPost.title}
            coverImage={mainPost.coverImage}
            date={mainPost.date}
            author={mainPost.author}
            slug={mainPost.slug}
            excerpt={mainPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </>
  );
}

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}