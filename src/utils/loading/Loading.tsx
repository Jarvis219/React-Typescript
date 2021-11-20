import styles from "./Loading.module.css";
import clsx from "clsx";

export const Loading = () => {
  return (
    <div className={styles["body-loading"]}>
      <div className={clsx(styles["spinner-box_loading"])}>
        <div
          className={clsx(styles["blue-orbit_loading"], styles["leo_loading"])}
        />
        <div
          className={clsx(styles["green-orbit_loading"], styles["leo_loading"])}
        />
        <div
          className={clsx(styles["red-orbit_loading"], styles["leo_loading"])}
        />
        <div
          className={clsx(
            styles["white-orbit_loading"],
            styles["leo_loading"],
            styles["w1_loading"]
          )}
        />
        <div
          className={clsx(
            styles["white-orbit_loading"],
            styles["leo_loading"],
            styles["w2_loading"]
          )}
        />
        <div
          className={clsx(
            styles["white-orbit_loading"],
            styles["leo_loading"],
            styles["w3_loading"]
          )}
        />
      </div>
    </div>
  );
};
