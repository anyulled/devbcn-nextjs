import styles from "@/components/skeletons/skeleton.module.css";

export default function Loading() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <div className={styles["skeleton-card"]} style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>
          <div className={`${styles.skeleton} ${styles["skeleton-image"]}`} style={{ width: "120px", height: "120px" }} />
          <div style={{ flex: 1 }}>
            <div className={`${styles.skeleton} ${styles["skeleton-text"]} ${styles["skeleton-title"]}`} style={{ width: "70%" }} />
            <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "50%" }} />
          </div>
        </div>
        <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "100%", height: "100px" }} />
        <div style={{ marginTop: "24px" }}>
          <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "30%", height: "20px" }} />
          <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "40%", marginTop: "8px" }} />
        </div>
      </div>
    </div>
  );
}
