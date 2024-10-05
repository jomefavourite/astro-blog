import { gql, GraphQLClient } from "graphql-request";
import type { AllPostsData, PostData, Post } from "./schema";

export const getClient = () => {
  return new GraphQLClient("https://gql.hashnode.com");
};

const myHashnodeURL = "blog.favouritejome.dev";

const getPostsAtCursor = async (cursor = "") => {
  const client = getClient();

  const allPosts = await client.request<AllPostsData>(
    gql`
      query allPosts {
        publication(host: "${myHashnodeURL}") {
          title
          posts(first: 10, after: "${cursor}") {
            pageInfo{
              hasNextPage
              endCursor
            }
            edges {
              node {
                author{
                  name
                  profilePicture
                }
                title
                subtitle
                brief
                slug
                canonicalUrl
                coverImage {
                  url
                }
                tags {
                  name
                  slug
                }
                series {
                  name
                  slug
                }
                publishedAt
                updatedAt
                readTimeInMinutes
                content {
                  html
                }
                seo {
                  description
                }
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    `
  );

  return allPosts;
};

export const fetchAllPosts = async (): Promise<Post[]> => {
  let cursor = "";
  let hasNextPage = true;
  const postList = [];

  while (hasNextPage) {
    const data = await getPostsAtCursor(cursor);

    postList.push(
      ...data.publication.posts.edges.map(({ node }: { node: Post }) => node)
    );

    cursor = data.publication.posts.pageInfo.endCursor;
    hasNextPage = data.publication.posts.pageInfo.hasNextPage;
  }

  return postList;
};

export const getPreviewPosts = async (cursor = "") => {
  const client = getClient();

  const allPosts = await client.request<AllPostsData>(
    gql`
      query allPosts {
        publication(host: "${myHashnodeURL}") {
          title
          posts(first: 3) {
            pageInfo{
              hasNextPage
              endCursor
            }
            edges {
              node {
                author{
                  name
                  profilePicture
                }
                title
                subtitle
                brief
                slug
                canonicalUrl
                coverImage {
                  url
                }
                tags {
                  name
                  slug
                }
                series {
                  name
                  slug
                }
                publishedAt
                updatedAt
                readTimeInMinutes
                content {
                  html
                }
                seo {
                  description
                }
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    `
  );

  return allPosts;
};

export const getPost = async (slug: string) => {
  const client = getClient();

  const data = await client.request<PostData>(
    gql`
      query postDetails($slug: String!) {
        publication(host: "${myHashnodeURL}") {
          post(slug: $slug) {
            author{
              name
              profilePicture
            }
            publishedAt
            updatedAt
            title
            subtitle
            readTimeInMinutes
            slug
            content{
              html
              markdown
            }
            tags {
              name
              slug
            }
            series {
              name
              slug
            }
            coverImage {
              url
            }
            seo {
              description
            }
          }
        }
      }
    `,
    { slug: slug }
  );

  return data.publication.post;
};
