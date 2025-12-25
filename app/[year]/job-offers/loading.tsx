import JobOfferCardSkeleton from "@/components/skeletons/JobOfferCardSkeleton";
import styles from "@/components/skeletons/skeleton.module.css";

export default function Loading() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <div className={styles["skeleton-grid"]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <JobOfferCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
