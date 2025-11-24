import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className="loader-container">
      <div className={styles.bounce}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
