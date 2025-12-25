import SpeakerCardSkeleton from "@/components/skeletons/SpeakerCardSkeleton";
import styles from "@/components/skeletons/skeleton.module.css";

export default function Loading() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <div className={styles["skeleton-grid"]}>
        {Array.from({ length: 12 }).map((_, i) => (
          <SpeakerCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
