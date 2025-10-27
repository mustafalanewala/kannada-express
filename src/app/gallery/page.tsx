import Image from "next/image";

function normalizeUrl(url?: string) {
  if (!url) return null;
  // some API values may omit the leading 'h' (e.g. 'ttps://...') or be protocol-relative
  if (url.startsWith("ttps://")) return "h" + url;
  if (url.startsWith("//")) return "https:" + url;
  return url;
}

async function fetchData() {
  const res = await fetch(
    "https://newsapi.timesmed.com/WebAPI/getnewslist?siteId=31&language=Kannada",
    { next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error("Failed to fetch gallery data");
  return res.json();
}

export default async function Page() {
  const json = await fetchData();
  const galleries = json?.data?.galleries || [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">ಗ್ಯಾಲರಿ</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries.map((g: any) => (
          <article
            key={g.galleryMaster_id}
            className="bg-white rounded shadow p-4"
          >
            <div className="w-full h-48 relative mb-3 bg-gray-100">
              {normalizeUrl(g.image) ? (
                <Image
                  src={normalizeUrl(g.image)!}
                  alt={g.galleryMaster_Title}
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  ಚಿತ್ರ ಲಭ್ಯವಿಲ್ಲ
                </div>
              )}
            </div>
            <h2 className="font-medium text-lg">{g.galleryMaster_Title}</h2>
            <p className="text-sm text-gray-600 mt-2">
              {Array.isArray(g.galleryDetailList)
                ? g.galleryDetailList.length
                : 0}{" "}
              ಚಿತ್ರಗಳು
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
