import styles from "./skeleton.module.css";

export default function TalkCardSkeleton() {
  return (
    <div className={styles["skeleton-card"]}>
      <div className={`${styles.skeleton} ${styles["skeleton-text"]} ${styles["skeleton-title"]}`} />
      <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "90%" }} />
      <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "70%" }} />
      <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
        <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "80px", height: "24px" }} />
        <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "100px", height: "24px" }} />
      </div>
    </div>
  );
}
