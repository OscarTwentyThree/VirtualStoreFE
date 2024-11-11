import { Routes, Route } from 'react-router-dom'
import { InitialPage } from '../pages/InitialPage'
import { Login } from '../pages/Login'
import { SignUp } from '../pages/SignUp'
import { NotFound } from '../pages/NotFound'
import { ProductPreview } from '../pages/ProductPreview'


export const InitialRouter = () => {
    return (
      <Routes>  
          <Route path="/" element={<InitialPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/preview" element={<ProductPreview/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    )
  }