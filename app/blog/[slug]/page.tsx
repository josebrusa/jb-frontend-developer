import Link from "next/link";
import { notFound } from "next/navigation";

import { getBlogPost, getBlogPosts } from "../../../src/server/db/queries";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  return {
    title: post ? `${post.title} | Jose Brusa` : "Blog | Jose Brusa",
    description: post?.excerpt ?? "Artículo del blog de Jose Brusa.",
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main id="main-content" className="min-h-screen px-6 py-20 text-white">
      <article className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm font-semibold text-[#29F3C3] transition hover:text-white">
          Volver al blog
        </Link>
        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/58">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-6 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">{post.title}</h1>
        <p className="mt-6 text-xl leading-8 text-white/62">{post.excerpt}</p>
        <div className="mt-12 space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-lg leading-9 text-white/72 backdrop-blur-xl md:p-10">
          {post.content.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
