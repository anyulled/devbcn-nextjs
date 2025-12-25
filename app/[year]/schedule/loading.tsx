import ScheduleItemSkeleton from "@/components/skeletons/ScheduleItemSkeleton";
import styles from "@/components/skeletons/skeleton.module.css";

export default function Loading() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <div className={styles["skeleton-list"]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ScheduleItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
