import Link from "next/link";

import { getBlogPosts } from "../../src/server/db/queries";

export const revalidate = 3600;

export const metadata = {
  title: "Blog | Jose Brusa",
  description: "Artículos sobre React, frontend, arquitectura web y desarrollo full stack.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen px-6 py-20 text-white">
      <section className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-semibold text-[#29F3C3] transition hover:text-white">
          Volver al portfolio
        </Link>
        <div className="mt-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-[#29F3C3]">Blog</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">Ideas sobre frontend</h1>
          <p className="mt-6 text-lg leading-8 text-white/58">
            Notas prácticas sobre React, Next.js, UI, performance, arquitectura y herramientas que uso en proyectos reales.
          </p>
        </div>

        <div className="mt-12 grid gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#29F3C3]/40 hover:bg-white/[0.07]"
            >
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/58">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white group-hover:text-[#29F3C3]">
                {post.title}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/58">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
