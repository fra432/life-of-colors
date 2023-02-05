import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "tdq96y0q",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export const urlFor = (source) => {
  return imageUrlBuilder(client).image(source);
};
