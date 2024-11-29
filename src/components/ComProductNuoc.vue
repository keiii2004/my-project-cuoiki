<template>
  <div>
    <h1>Nước giải khát</h1>

    <!-- Ô tìm kiếm -->
    <div class="search-container">
      <input type="text" v-model="searchTerm" placeholder="Tìm theo tên" @input="resetPage"/>
    </div>

    <div class="product-list">
      <div class="product-card" v-for="product in paginatedProducts" :key="product.id">
        <router-link :to="{ name: 'product-nuocdetai', params: { id: product.id } }">
          <img :src="product.image" :alt="product.name" class="product-image" loading="lazy" />
          <div class="product-info">
            <h2 class="product-name">{{ product.name }}</h2>
            <p class="product-description">{{ product.describe }}</p>
            <p class="product-price">{{ product.price }}đ</p>
            <p class="product-condition" :class="{'available': product.condition === 'Còn bán', 'unavailable': product.condition !== 'Còn bán'}">
              {{ product.condition }}
            </p>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Điều hướng trang -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Trước</button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Tiếp</button>
    </div>
  </div>
</template>

<script scoped>
import { fetchProducts } from "../data/product";
export default {
  data() {
    return {
      products: [],
      searchTerm: "",
      currentPage: 1,
      itemsPerPage: 8 // Số sản phẩm mỗi trang
    };
  },
  computed: {
    filteredProducts() {
      // Lọc sản phẩm theo từ khóa tìm kiếm
      return this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    paginatedProducts() {
      // Lấy sản phẩm hiện tại dựa trên trang
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
    totalPages() {
      // Tính tổng số trang dựa trên số sản phẩm đã lọc
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    resetPage() {
      // Khi tìm kiếm thay đổi, reset lại trang về 1
      this.currentPage = 1;
    },
    async fetData(){
      const fetchedProducts = await fetchProducts();
      const filteredProducts = fetchedProducts.filter(product => product.type === "nuoc");
     this.products = filteredProducts;
      }
    },
   mounted() {
    this.fetData();
   }
  

};
</script>
<style scoped>
#app > div {
  padding: 60px 20px;
  background-color: white;
}
h1 {
  font-size: 60px;
  font-family: "CookieRun Bold";
  font-weight: 500;
  color: #e60012;
  margin-bottom: 20px;
  text-align: center;
}

/* Ô tìm kiếm */
.search-container {
  display: flex;
  justify-content: start;
  margin-bottom: 20px;
}

.search-container input {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  color: #777;
  border: 1px solid #e60012;
  width: 309px;
  margin-left: 110px;
}

.product-list { 
  margin: 0 90px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Tự động điều chỉnh số cột */
  gap: 20px; /* Khoảng cách giữa các sản phẩm */
  justify-content: center; /* Căn giữa các sản phẩm */
}

.product-card a {
  text-decoration: none;
  color: #2c3e50;
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 250px; /* Giữ chiều rộng cố định */
  height: 410px; /* Giữ chiều cao cố định */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-info {
  text-align: center;
  flex-grow: 1; /* Đảm bảo thông tin sản phẩm không bị tràn */
}

.product-name {
  font-size: 18px;
  color: #333;
  margin: 5px 0;
}

.product-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.product-price {
  font-size: 16px;
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-condition {
  font-size: 14px;
  font-weight: bold;
}

.available {
  color: #2ecc71;
}

.unavailable {
  color: #e74c3c;
}

/* Phân trang */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 12px;
  font-size: 14px;
  margin: 0 5px;
  cursor: pointer;
  background-color: #e60012;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-size: 16px;
}
</style>
