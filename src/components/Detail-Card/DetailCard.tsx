import styles from "./detailcard.module.scss";

interface DetailCardProps {
  sendProps: string | number;
}

export default function DetailCard({ sendProps }: DetailCardProps) {
  return <div className={styles.detail}>{typeof sendProps === 'number' && '$ '}{sendProps}</div>;
}
