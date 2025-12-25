import styles from "./skeleton.module.css";

export default function ScheduleItemSkeleton() {
  return (
    <div className={styles["skeleton-card"]}>
      <div style={{ display: "flex", gap: "16px" }}>
        <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "80px", height: "60px" }} />
        <div style={{ flex: 1 }}>
          <div className={`${styles.skeleton} ${styles["skeleton-text"]} ${styles["skeleton-title"]}`} />
          <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "60%" }} />
          <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "40%" }} />
        </div>
      </div>
    </div>
  );
}
