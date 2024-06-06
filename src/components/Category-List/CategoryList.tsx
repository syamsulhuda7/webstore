import { useEffect, useState } from "react";
import styles from "./categorylist.module.scss";
import axios from "axios";
import Loading from "../Loading/Loading";

interface CategoryProps {
  sendCategory: (category: string) => void;
}

export default function CategoryList({ sendCategory }: CategoryProps) {
  const [category, setCategory] = useState<Array<string>>([]);
  const [isActive, setIsActive] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Array<string>>(
          `https://fakestoreapi.com/products/categories`
        );
        setCategory(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleClick = (category: string) => {
    setIsActive(category);
    sendCategory(category);
  };

  const handleReset = () => {
    setIsActive("");
    sendCategory("");
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            onClick={handleReset}
            style={{ border: "3px solid black", color: "black" }}
            className={styles.container}
          >
            x Reset
          </div>
          {category.map((category, index) => (
            <div
              onClick={() => handleClick(category)}
              style={{
                backgroundColor:
                  isActive === category ? "#EEF7FF" : "transparent",
              }}
              key={index}
              className={styles.container}
            >
              {category}
            </div>
          ))}
        </>
      )}
    </>
  );
}
