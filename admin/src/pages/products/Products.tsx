import { useState, useEffect } from "react";
import "./Products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/apiCalls";

const columns: GridColDef[] = [
  { field: "_id", type: "string", headerName: "Product ID", width: 100 },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 150,
  },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "desc",
    headerName: "Description",
    type: "string",
    width: 200,
  },
  {
    field: "categories",
    type: "array",
    headerName: "Category",
    width: 150,
  },
  {
    field: "color",
    type: "array",
    headerName: "Color",
    width: 150,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 100,
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.product.products);
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Products</button>
      </div>
      <DataTable
        slug="products"
        dispatch={dispatch}
        columns={columns}
        rows={products}
      />
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
