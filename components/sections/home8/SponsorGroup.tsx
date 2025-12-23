import { Sponsor } from "@/config/editions/types";

export const SponsorGroup = ({ title, items, sizeClass }: { title: string; items: Sponsor[] | null; sizeClass: string }) => {
  if (!items || items.length === 0) return null;

  return (
    <>
      <div className="row">
        <div className="col-12 text-center mb-4 mt-4">
          <h5 className="sponsor-category-title">{title}</h5>
        </div>
      </div>
      <div className="row justify-content-center align-items-center mb-5">
        {items.map((item, index) => (
          <div key={index} className={sizeClass}>
            <div className="sponsor-card">
              <a href={item.website} target="_blank" rel="noopener noreferrer" className="w-100 d-block text-center">
                <img src={item.image} alt={item.name} className="img-fluid" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
