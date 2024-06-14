// DetailProduct.tsx

import { useEffect, useState } from "react";
import styles from "./detailproduct.module.scss";
import axios from "axios";
import Loading from "../Loading/Loading";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/Counter/actions";

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
  const [buttonValue, setButtonValue] = useState<number>(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Product>(
          `https://fakestoreapi.com/products/${sendIdProduct}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [sendIdProduct]);

  const handleClose = () => {
    sendPopUp(false)
  };

  const handleAddProduct = () => {
    dispatch(addProduct({
      id: data?.id,
      image: data?.image,
      title: data?.title,
      price: data?.price,
      qty: buttonValue,
    }))
    sendPopUp(false)
  }

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
                <Button sendValue={setButtonValue} lcValue={0}/>
                <button onClick={handleAddProduct} className={styles.addproduct}>+ Add Product</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
