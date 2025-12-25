import styles from "./skeleton.module.css";

export default function SpeakerCardSkeleton() {
  return (
    <div className={styles["skeleton-card"]}>
      <div className={`${styles.skeleton} ${styles["skeleton-image"]}`} style={{ height: "200px" }} />
      <div className={`${styles.skeleton} ${styles["skeleton-text"]} ${styles["skeleton-title"]}`} />
      <div className={`${styles.skeleton} ${styles["skeleton-text"]} ${styles["skeleton-subtitle"]}`} />
      <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "40%" }} />
    </div>
  );
}
