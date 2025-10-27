import { notFound } from "next/navigation";

async function fetchData() {
  const res = await fetch(
    "https://newsapi.timesmed.com/WebAPI/getnewslist?siteId=31&language=Kannada",
    { next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error("Failed to fetch blog data");
  return res.json();
}

export default async function BlogDetail({
  params,
}: {
  params: { slug: string };
}) {
  const json = await fetchData();
  const blogs = json?.data?.blogs || [];
  const blog = blogs.find(
    (b: any) => (b.slug || String(b.blog_id)) === params.slug
  );

  if (!blog) return notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">{blog.blog_Title}</h1>
      {blog.image && (
        // plain img fallback for safety; next/image can be used if domain configured
        <img
          src={blog.image}
          alt={blog.blog_Title}
          className="w-full h-auto mb-4 rounded"
        />
      )}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.blog_Content }}
      />
    </article>
  );
}
