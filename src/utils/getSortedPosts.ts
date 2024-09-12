import postFilter from "./postFilter";
import type { Post } from "lib/schema";

const getSortedPosts = (posts: Post[]) => {
  return posts
    .filter(postFilter)
    .sort(
      (a, b) =>
        Math.floor(new Date(b.updatedAt ?? b.publishedAt).getTime() / 1000) -
        Math.floor(new Date(a.updatedAt ?? a.publishedAt).getTime() / 1000)
    );
};

export default getSortedPosts;
