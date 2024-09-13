import type { APIRoute } from "astro";
import { generateOgImageForPost } from "@utils/generateOgImages";
import { fetchAllPosts } from "lib/clients";
import type { Post } from "lib/schema";

export async function getStaticPaths() {
  const posts = await fetchAllPosts().then(p =>
    p.filter(post => !post.coverImage?.url)
  );

  return posts.map(post => ({
    params: { slug: post.slug },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(await generateOgImageForPost(props as Post), {
    headers: { "Content-Type": "image/png" },
  });
