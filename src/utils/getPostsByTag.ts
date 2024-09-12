import type { Post } from "lib/schema";
import getSortedPosts from "./getSortedPosts";

const getPostsByTag = (posts: Post[], tag: string) =>
  getSortedPosts(
    posts.filter(post => post.tags.map(tag => tag.slug).includes(tag))
  );

export default getPostsByTag;
