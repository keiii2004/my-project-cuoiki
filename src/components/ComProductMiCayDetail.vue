<template>
  <div class="menu-container">
    <h1>Chi Tiết Sản Phẩm Mì Cay</h1>
    <div id="toast-container"></div>
    <div v-if="product" class="product-detail">
      <div class="product-image">
        <img :src="product.image" :alt="product.name" />
      </div>
      <div class="product-info">
        <h2>{{ product.name }}</h2>
        <p>{{ product.describe }}</p>
        <p class="price">{{ product.price.toLocaleString() }}đ</p>
        <p class="stock-status" v-if="product.quality === 0">Hết hàng</p>
        <p class="condition" v-else>Còn hàng</p>
        <!-- <p class="stock-status">Còn hàng: {{ product.quality }}</p>
        <p class="stock-status">
          Trong giỏ hàng: {{ getProductQuantityInCart(product.id) }}
        </p> -->
        <button
          class="add-to-cart"
          @click="addToCart(product)"
          :disabled="product.quality === 0"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
    <div v-else>
      <p>Đang tải sản phẩm...</p>
    </div>
  </div>
</template>

<script>
import { fetchProducts } from "../data/product";
import cart from "../data/cart";
export default {
  data() {
    return {
      product: null, // Dữ liệu sản phẩm
      cart: cart, // Dữ liệu giỏ hàng
    };
  },
  async mounted() {
    const id = this.$route.params.id; // Lấy id từ route
    const products = await fetchProducts(); // Gọi API lấy sản phẩm
    this.product = products.find((item) => item.id == id); // Tìm sản phẩm theo id
  },
  methods: {
    showToast(message, type = "info", title = "") {
      const container = document.getElementById("toast-container");

      // Tạo phần tử thông báo mới
      const toast = document.createElement("div");
      toast.className = `toast ${type}`; // Loại thông báo: success, error, info

      // Tạo phần tử tiêu đề và nội dung
      const toastTitle = document.createElement("strong");
      toastTitle.textContent = title;
      toastTitle.className = "toast-title";

      const toastMessage = document.createElement("span");
      toastMessage.textContent = message;
      toastMessage.className = "toast-message";
      // Thêm tiêu đề và thông báo vào phần tử thông báo
      toast.appendChild(toastTitle);
      toast.appendChild(toastMessage);
      toastMessage.textContent = message;

      // Thêm thông báo vào container
      container.appendChild(toast);

      // Xóa thông báo sau 4 giây
      setTimeout(() => {
        toast.remove();
      }, 4000);
    },
    addToCart(product) {
      // Tìm sản phẩm trong giỏ hàng
      const infoproduct = this.cart.find(
        (item) => item.id === product.id && item.type === "micay"
      );
      // Nếu sản phẩm đã có trong giỏ hàng
      if (infoproduct) {
        // Kiểm tra xem còn hàng không
        if (infoproduct.quantity < product.quality) {
          infoproduct.quantity += 1; // Tăng số lượng trong giỏ hàng
          this.showToast(
            "Thêm sản phẩm vào giỏ hàng thành công!",
            "success",
            "Thành công"
          );
        } else {
          this.showToast("Không thể thêm sản phẩm đã hết hàng!", "info", "Thông báo");
        }
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng
        if (product.quality > 0) {
          const newproduct = { ...product, quantity: 1 }; // Tạo sản phẩm mới trong giỏ hàng
          this.cart.push(newproduct); // Thêm vào giỏ hàng
          this.showToast(
            "Thêm sản phẩm vào giỏ hàng thành công!",
            "success",
            "Thành công"
          );
        }
      }
    },
    getProductQuantityInCart(productId) {
      const itemInCart = this.cart.find(
        (item) => item.id === productId && item.type === "micay"
      );
      return itemInCart ? itemInCart.quantity : 0; // Nếu không có sản phẩm trong giỏ thì trả về 0
    },
  },
};
</script>

<style>
.menu-container {
  padding: 20px;
  background-color: #ffffff;
  text-align: center;
  padding: 80px;
}

.product-detail {
  display: flex;
  align-items: flex-start; /* Căn giữa theo chiều dọc */
}

.product-image {
  flex: 1; /* Chiếm 1 phần của container */
  max-width: 300px; /* Giới hạn chiều rộng của hình ảnh */
}

.product-image img {
  width: 100%; /* Đặt chiều rộng hình ảnh */
  border-radius: 10px;
  border: 1px solid #e0e0e0;
}

.product-info {
  flex: 2; /* Chiếm 2 phần của container */
  margin-left: 20px; /* Khoảng cách giữa hình ảnh và thông tin */
  text-align: left; /* Căn trái cho thông tin sản phẩm */
}

.price {
  font-weight: bold;
  color: #e60012;
  margin-top: 10px;
}

.condition {
  font-style: italic;
  color: #777;
}

.stock-status {
  font-weight: bold;
  color: #e60012;
  margin-top: 10px;
}

.add-to-cart {
  background-color: #e60012; /* Màu nền nút */
  color: white; /* Màu chữ */
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s;
}

.add-to-cart:hover {
  background-color: #c7000f; /* Màu nền khi hover */
}

.add-to-cart:disabled {
  background-color: #ccc; /* Màu nền khi vô hiệu hóa */
  cursor: not-allowed; /* Con trỏ khi vô hiệu hóa */
}
/* Container chứa thông báo */
#toast-container {
  position: fixed;
  top: 110px;
  right: 20px;
  z-index: 1000;
  display: flex;  
  flex-direction: column;
  gap: 10px;
  justify-content: start;
}
.toast-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #000000;
}

/* Giao diện cho từng thông báo */
.toast {
  padding: 20px 20px;
  color: #888;
  font-size: 14px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.4);
  opacity: 0;
  transform: translateX(100%);
  animation: slideIn 0.5s forwards, fadeOut 3s 2s forwards;
  border: 2px solid #ffffff;
  display: flex;
  flex-direction: column;
  text-align: start;
}

/* Các loại thông báo */
.toast.success {
  border-left: 4px solid #28a745;
}

.toast.info {
  border-left: 4px solid #007bff;
}


/* Hiệu ứng xuất hiện */
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Hiệu ứng biến mất */
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
