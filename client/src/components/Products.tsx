import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
interface productProps {
  category: string;
  filters: any;
  sort: any;
}
function Products({ category, filters, sort }: productProps) {
  const [products, setProducts] = useState([]);
  // const [filteredProducts, setfilteredProducts] = useState([]);
  console.log(filters, sort);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `https://shopnest-87me.onrender.com/api/products?category=${category}`
            : `https://shopnest-87me.onrender.com/api/products`
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [category]);
  console.log(products);
  return (
    <Container>
      {popularProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
}

export default Products;
