import { Routes, Route } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { CustomerPage } from "../pages/CustomerPage";
import { ProductDetail } from "../pages/ProductDetail";
import { ShoppingCart } from "../pages/ShoppingCart";
import { BillingPage } from "../pages/BillingPage";
import { CustomerProfile } from "../pages/CustomerProfile";
import { EditPersonalInformation } from "../pages/EditPersonalInformation";
import { BillManagment } from "../pages/BillManagement";
import { BillManagmentDetail } from "../pages/BillManagementDetail";




export const CustomerRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomerPage/>} />
      <Route path="/profile" element={<CustomerProfile/>} />
      <Route path="/profile/edit_info" element={<EditPersonalInformation/>} />
      <Route path="/profile/bill_management" element={<BillManagment/>} />
      <Route path="/profile/bill_management/bill_detail" element={<BillManagmentDetail/>} />
      <Route path="/product_detail" element={<ProductDetail/>} />
      <Route path="/shopping_cart" element={<ShoppingCart />} />
      <Route path="/billing_page" element={<BillingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};