import { Metadata } from "next";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Layout } from "@/components/Layout";

/**
 * This component renders your homepage.
 *
 * Use Next's generateMetadata function to render page metadata.
 *
 * Use the SliceZone to render the content of the page.
 */

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: prismic.asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title || undefined,
      images: [
        {
          url: home.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Index() {
  /**
   * The client queries content from the Prismic API
   */
  const client = createClient();
  const home = await client.getByUID("page", "home");
  const settings = await client.getSingle("settings");
  const navigation = await client.getSingle("menu");

  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
    >
      <SliceZone slices={home.data.slices} components={components} />
    </Layout>
  );
}
