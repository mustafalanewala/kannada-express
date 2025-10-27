import Image from "next/image";
import Link from "next/link";

async function fetchData() {
  const res = await fetch(
    "https://newsapi.timesmed.com/WebAPI/getnewslist?siteId=31&language=Kannada",
    { next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error("Failed to fetch video data");
  return res.json();
}

export default async function Page() {
  const json = await fetchData();
  const videos = json?.data?.videos || [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">ವೀಡಿಯೊ</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((v: any) => (
          <article
            key={v.videoDetail_id}
            className="bg-white rounded shadow p-4"
          >
            <div className="w-full h-48 relative mb-3 bg-gray-100">
              <Image
                src={v.image}
                alt={v.videoTitle}
                fill
                className="object-cover rounded"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority={false}
              />
            </div>
            <h2 className="font-medium text-lg">{v.videoTitle}</h2>
            <div className="mt-3">
              <Link
                href={v.fileName}
                className="text-orange-600 hover:underline"
                target="_blank"
              >
                ವೀಕ್ಷಣೆ ಮಾಡಿ
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
