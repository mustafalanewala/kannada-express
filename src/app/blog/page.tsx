import Link from "next/link";

async function fetchData() {
  const res = await fetch(
    "https://newsapi.timesmed.com/WebAPI/getnewslist?siteId=31&language=Kannada",
    { next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error("Failed to fetch blog data");
  return res.json();
}

export default async function Page() {
  const json = await fetchData();
  const blogs = json?.data?.blogs || [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">ಬ್ಲಾಗ್</h1>

      <div className="space-y-6">
        {blogs.map((b: any) => (
          <article key={b.blog_id} className="bg-white rounded shadow p-4">
            <h2 className="font-medium text-lg mb-2">{b.blog_Title}</h2>
            <div className="text-sm text-gray-700 mb-3">
              <div dangerouslySetInnerHTML={{ __html: b.blog_Summary }} />
            </div>
            <Link
              href={`/blog/${b.slug || b.blog_id}`}
              className="text-orange-600 hover:underline"
            >
              ಓದಿ ಮುಂದುವರಿಸಿ
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
