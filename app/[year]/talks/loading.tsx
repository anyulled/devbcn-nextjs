import TalkCardSkeleton from "@/components/skeletons/TalkCardSkeleton";
import styles from "@/components/skeletons/skeleton.module.css";

export default function Loading() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <div className={styles["skeleton-grid"]}>
        {Array.from({ length: 9 }).map((_, i) => (
          <TalkCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
