import styles from "./skeleton.module.css";

export default function JobOfferCardSkeleton() {
  return (
    <div className={styles["skeleton-card"]}>
      <div className={`${styles.skeleton} ${styles["skeleton-image"]}`} style={{ height: "80px", width: "80px", marginBottom: "16px" }} />
      <div className={`${styles.skeleton} ${styles["skeleton-text"]} ${styles["skeleton-title"]}`} />
      <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "70%" }} />
      <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "50%" }} />
    </div>
  );
}
