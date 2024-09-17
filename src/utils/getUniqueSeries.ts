import postFilter from "./postFilter";
import type { Post, Serie } from "lib/schema";

const getUniqueSeries = (posts: Post[]) => {
  const postsWithSeries = posts.filter(post => post.series !== null);
  const series: Serie[] = postsWithSeries
    .filter(postFilter)
    .flatMap(post => post.series)
    .filter(
      (serie, index, self) =>
        self.findIndex(s => s.slug === serie.slug) === index
    );
  return series;
};

export default getUniqueSeries;
