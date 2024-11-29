import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/components/ComHome.vue"
import Product from "@/components/ComProductMiCay.vue"
import ProductMiCayDetail from "@/components/ComProductMiCayDetail.vue"
import ProductNuoc from '@/components/ComProductNuoc.vue'
import ProductNuocDetail from '@/components/ComProductNuocDetail.vue'
import ThanhToanProduct from '@/components/ComThanhToan.vue'
import ComLogin from '@/components/LoginModal.vue'
import GioiThieu from '@/components/ComGioiThieu.vue'
import LichSuMuaHang from '@/components/ComLichSuMuaHang.vue'
import TinTuc from '@/components/ComTinTuc.vue'
const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/product-micay',
      name: 'Product',
      component: Product,
    },
    {
        path: '/product-micaydetail/:id',
        name: 'product-micaydetai',
        component: ProductMiCayDetail,
      },
      {
        path: '/product-nuoc-giai-khat',
        name: 'product-nuoc-giai-khat',
        component: ProductNuoc,
      },
      {
        path: '/product-nuoc-detail/:id',
        name: 'product-nuocdetai',
        component: ProductNuocDetail,
      },
      {
        path: '/thanhtoan',
        name: 'thanhtoan',
        component: ThanhToanProduct,
      },
      {
        path: '/login',
        name: 'login',
        component: ComLogin,
        
      },
      {
        path: '/gioithieu',
        name: 'gioithieu',
        component: GioiThieu,
      },
      {
        path: '/lichsumuahang',
        name: 'lichsumuahang',
        component: LichSuMuaHang,
      },
      {
        path: '/tintuc',
        name: 'tintuc',
        component: TinTuc,
      }
     
  ];
  const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(){
      return {top:0}; 
    }
  });
  
  export default router;