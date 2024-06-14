import { useState } from "react";
import Button from "../Button/Button";
import styles from "./cardcart.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearProduct } from "../../redux/Counter/actions";

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  qty: number;
}

interface ProductData {
  product: {
    productData: Product[];
  };
}

export default function CardCart() {
  const [buttonValue, setButtonValue] = useState<number>(0);
  console.log(buttonValue);

  const dispatch = useDispatch();

  const data: Product[] = useSelector(
    (state: ProductData) => state.product.productData
  );

  const handleClick = (id: number) => {
    dispatch(clearProduct({ id }));
  };

  return (
    <>
      {data?.length == 0 ? (
        <div className={styles.unDisplay}>
          <p>- - No Product in Cart - -</p>
        </div>
      ) : (
        <>
          <div className={styles.wrapper}>
            {data?.map((item) => (
              <div key={item.id} className={styles.container}>
                <div className={styles.incontainer}>
                  <div className={styles.image}>
                    <img src={item?.image} alt="" />
                  </div>
                  <div className={styles.description}>
                    <p>
                      {item?.title
                        ? item?.title?.length > 20
                          ? `${item?.title?.slice(0, 20)}...`
                          : item?.title
                        : ""}
                    </p>
                    <p>${item?.price}</p>
                    <div className={styles.button}>
                      <div>
                        <Button
                          lcValue={item?.qty}
                          sendValue={setButtonValue}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <i
                  onClick={() => handleClick(item.id)}
                  className="fa-regular fa-trash-can"
                ></i>
                <div className={styles.total}>$Total</div>
              </div>
            ))}
          </div>
          <div className={styles.checkout}>Checkout</div>
        </>
      )}
    </>
  );
}
