import { Sponsor } from "@/config/editions/types";
import Image from "next/image";

export const SponsorGroup = ({ title, items, sizeClass }: { title: string; items: Sponsor[] | null; sizeClass: string }) => {
  if (!items || items.length === 0) return null;

  const sizeMap: Record<string, string> = {
    top: "5.775rem",
    premium: "5.25rem",
  };
  const imageHeight = sizeMap[title.toLowerCase()] || "5rem";

  return (
    <>
      <div className="row">
        <div className="col-12 text-center mb-4 mt-4">
          <h5 className="sponsor-category-title">{title}</h5>
        </div>
      </div>
      <div className="row justify-content-center align-items-center mb-5">
        {items.map((item) => (
          <div key={item.name} className={sizeClass}>
            <div className="sponsor-card">
              <a href={item.website} target="_blank" rel="noopener noreferrer" className="w-100 d-block text-center">
                <div style={{ position: "relative", width: "100%", height: imageHeight }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
