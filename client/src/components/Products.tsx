import styled from "styled-components";
import Product from "./Product";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
interface productProps {
  category: string;
  filters: object;
  sort: string;
}
function Products({ category, filters, sort }: productProps) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          category ? `/products?category=${category}` : `/products`
        );
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) => {
            const itemValue: Array<String> = item[key];
            if (Array.isArray(itemValue)) {
              return itemValue.some((val) => String(val).includes(value));
            } else {
              return String(itemValue).includes(value);
            }
          })
        )
      );
  }, [filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts(
        (prev) => [...prev].sort((a: any, b: any) => a.createdAt - b.createdAt) //bug here...
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a: any, b: any) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a: any, b: any) => b.price - a.price)
      );
    }
  }, [sort]);
  return (
    <Container>
      {category
        ? (filteredProducts as any[]).map((item) => {
            return <Product item={item} key={item._id} />;
          })
        : (filteredProducts as any[])
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
}

export default Products;
