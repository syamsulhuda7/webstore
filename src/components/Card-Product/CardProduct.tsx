import styles from "./cardproduct.module.scss";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface CardProductProps {
  item: Product;
  sendId: (id: number) => void;
  sendPopUp: (popUp: boolean) => void;
}
export default function CardProduct({ item, sendId, sendPopUp }: CardProductProps) {
  
    const handleClick = (id: number):void => {
        sendId(id);
        sendPopUp(true);
    }
  
    return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={item.image} alt="" />
      </div>
      <p>{`${item.title.slice(0, 16)}...`}</p>
      <div>
        <p className={styles.category}>$ {item.price}</p>
        <div className={styles.category}>{item.category}</div>
      </div>
      <button onClick={()=>handleClick(item.id)}>Detail</button>
    </div>
  );
}
