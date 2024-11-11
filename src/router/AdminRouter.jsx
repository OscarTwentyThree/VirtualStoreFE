import { Routes, Route } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { Admin } from "../pages/AdminPage";
import { AddProducts } from "../pages/Admin/AddProducts";
import { EditPersonalAdmin } from "../pages/Admin/EditPersonalAdmin";
import { AdminProducts } from "../pages/Admin/AdminProducts";
import { EditProduct } from "../pages/Admin/EditProduct";
import { AdminBillManagment } from "../pages/Admin/AdminBillManagement";
import { AdminBillManagmentDetail } from "../pages/Admin/AdminBillManagementDetail";


export const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/inventory/add_product" element={<AddProducts />} />
      <Route path="/inventory" element={<AdminProducts />} />
      <Route path="/inventory/edit_product" element={<EditProduct />} />
      <Route path="/bill_management" element={<AdminBillManagment/>} />
      <Route path="/bill_management/bill_detail" element={<AdminBillManagmentDetail/>} />
      <Route path="/profile" element={<EditPersonalAdmin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
