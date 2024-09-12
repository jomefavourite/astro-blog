import postFilter from "./postFilter";
import type { Post } from "lib/schema";

interface Tag {
  tag: string;
  tagName: string;
}

const getUniqueTags = (posts: Post[]) => {
  console.log("tags", posts[0]);
  const tags: Tag[] = posts
    .filter(postFilter)
    .flatMap(post => post.tags)
    .map(tag => ({ tag: tag.slug, tagName: tag.name }))
    .filter(
      (value, index, self) =>
        self.findIndex(tag => tag.tag === value.tag) === index
    )
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
  return tags;
};

export default getUniqueTags;
