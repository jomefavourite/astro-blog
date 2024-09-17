import type { Post } from "lib/schema";
import getSortedPosts from "./getSortedPosts";

const getPostsBySerieSlug = (posts: Post[], serieSlug: string) =>
  getSortedPosts(
    posts
      .filter(post => {
        if (post.series !== null) return post;
        return null;
      })
      .filter(Boolean)
      .filter(post => post.series.slug === serieSlug)
  );

export default getPostsBySerieSlug;
