import styles from "@/components/skeletons/skeleton.module.css";

export default function Loading() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <div className={styles["skeleton-card"]} style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>
          <div className={`${styles.skeleton} ${styles["skeleton-image"]}`} style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
          <div style={{ flex: 1 }}>
            <div className={`${styles.skeleton} ${styles["skeleton-text"]} ${styles["skeleton-title"]}`} style={{ width: "60%" }} />
            <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "40%" }} />
            <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "50%" }} />
          </div>
        </div>
        <div className={`${styles.skeleton} ${styles["skeleton-text"]}`} style={{ width: "100%", height: "80px" }} />
      </div>
    </div>
  );
}
