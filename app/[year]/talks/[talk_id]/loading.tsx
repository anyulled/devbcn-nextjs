import styles from "@/components/skeletons/skeleton.module.css";

export default function Loading() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <div className={styles["skeleton-card"]} style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div className={`${styles.skeleton} ${styles["skeleton-text"]} ${styles["skeleton-title"]}`} style={{ width: "80%", height: "32px" }} />
        <div style={{ display: "flex", gap: "16px", margin: "24px 0" }}>
          <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "120px", height: "24px" }} />
          <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "100px", height: "24px" }} />
          <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "80px", height: "24px" }} />
        </div>
        <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "100%", height: "120px" }} />
        <div style={{ marginTop: "24px" }}>
          <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "40%", height: "20px" }} />
          <div
            className={`${styles.skeleton} ${styles["skeleton-image"]}`}
            style={{ width: "100px", height: "100px", borderRadius: "50%", marginTop: "16px" }}
          />
        </div>
      </div>
    </div>
  );
}
