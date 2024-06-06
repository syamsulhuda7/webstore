import { useEffect, useState } from "react";
import CardProduct from "../../components/Card-Product/CardProduct";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./dashboard.module.scss";
import axios from "axios";
import DetailProduct from "../../components/Detail-Product/DetailProduct";
import Loading from "../../components/Loading/Loading";
import CategoryList from "../../components/Category-List/CategoryList";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export default function Dashboard() {
  const [data, setData] = useState<Product[]>([]);
  const [popUpDetailProduk, setPopUpDetailProduk] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [id, setId] = useState<number>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (searchValue !== "") {
        const filteredProducts = data.filter((product) =>
          product.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        setData(filteredProducts);
        return;
      } else {
        try {
          let url = "https://fakestoreapi.com/products";
          if (searchValue !== "") {
            url += `title=${searchValue}`;
          } else if (searchCategory !== "") {
            url = `https://fakestoreapi.com/products/category/${searchCategory}`;
          }
          const response = await axios.get<Product[]>(url);
          setData(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [searchValue, searchCategory]);

  return (
    <>
      <Navbar sendSearch={setSearchValue} />
      <div className={styles.categorylist}>
        <CategoryList sendCategory={setSearchCategory} />
      </div>
      {popUpDetailProduk && (
        <DetailProduct sendPopUp={setPopUpDetailProduk} sendIdProduct={id} />
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          {data.map((item: Product) => (
            <CardProduct
              key={item.id}
              item={item}
              sendId={setId}
              sendPopUp={setPopUpDetailProduk}
            />
          ))}
        </div>
      )}
    </>
  );
}
