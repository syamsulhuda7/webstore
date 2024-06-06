import { useState } from "react";
import styles from "./button.module.scss";

export default function Button () {
    const [value, setValue] = useState<number>(0);

    const add = () => {
        setValue(value + 1);
    }
    const min = () => {
        if (value > 0) {
            setValue(value - 1);
        }
    }
  return (
    <div className={styles.container}>
      <button onClick={min}>-</button>
      <p>{value}</p>
      <button onClick={add}>+</button>
    </div>
  );
}
