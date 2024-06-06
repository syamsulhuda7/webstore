import { useEffect, useState } from "react";
import styles from "./detailproduct.module.scss";
import axios from "axios";
import Loading from "../Loading/Loading";
import Button from "../Button/Button";

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating?: Rating;
}

interface DetailProductProps {
  sendIdProduct: number | undefined;
  sendPopUp: (popUp: boolean) => void;
}

export default function DetailProduct({ sendIdProduct, sendPopUp }: DetailProductProps) {
  const [data, setData] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Product>(
          `https://fakestoreapi.com/products/${sendIdProduct}`
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [sendIdProduct]);

  //   if (!data) {
  //     return <Loading />;
  //   }

  const handleClose = () => {
    sendPopUp(false)
  };

  return (
    <div className={styles.container}>
      <div className={styles.incontainer}>
        {!data ? (
          <Loading />
        ) : (
          <>
            <div className={styles.image}>
              <img src={data.image} alt="" />
            </div>
            <button onClick={handleClose} className={styles.close}>
              x
            </button>
            <div className={styles.deskripsi}>
              <p>{data.title}</p>
              <p style={{ fontWeight: "bold" }}>
                Description :
                <br />
                <span style={{ fontWeight: "normal" }}>{data.description}</span>
              </p>
              <p>Price : ${data.price}</p>
              <p>
                Rating : {data.rating?.rate} ({data.rating?.count})
              </p>
              <p>Category : {data.category}</p>
              <div className={styles.button}>
                <Button />
                <button className={styles.addproduct}>+ Add Product</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
