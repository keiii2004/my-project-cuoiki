<template>
  <div class="menu-container">
    <h1>Menu Mì Cay</h1>

    <!-- Tìm kiếm -->
    <div class="search-container">
      <input type="text" v-model="searchName" placeholder="Tìm theo tên" />
    </div>

    <div class="product-list">
      <div
        class="product-item"
        v-for="item in paginatedProducts"
        :key="item.id"
      >
        <router-link
          :to="{ name: 'product-micaydetai', params: { id: item.id } }"
          class="product-link"
        >
          <img :src="item.image" :alt="item.name" />
          <h2>{{ item.name }}</h2>
          <p>{{ item.describe }}</p>
          <p class="price">{{ item.price.toLocaleString() }}đ</p>
          <p class="condition">{{ item.condition }}</p>
        </router-link>
      </div>
    </div>

    <!-- Điều hướng trang -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">
        Trang trước
      </button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Trang sau
      </button>
    </div>
  </div>
</template>

<script>
import { fetchProducts } from "../data/product";

export default {
  data() {
    return {
      product: [],
      searchName: "",
      minPrice: 0,
      maxPrice: Infinity,
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  computed: {
    filteredProducts() {
      return this.product.filter((item) => {
        const matchesName = item.name
          .toLowerCase()
          .includes(this.searchName.toLowerCase());
        const matchesPrice =
          item.price >= this.minPrice && item.price <= this.maxPrice;
        return matchesName && matchesPrice;
      });
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
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
    async fetData() {
      const fetchedProducts = await fetchProducts();
      const filteredProducts = fetchedProducts.filter(
        (product) => product.type === "micay"
      );
      this.product = filteredProducts;
    },
  },
  mounted() {
    this.fetData();
  },
};
</script>

<style scoped>
h1 {
  font-size: 60px;
  font-family: "CookieRun Bold";
  font-weight: 500;
  color: #e60012;
  margin-bottom: 20px;
  text-align: center;
}

.menu-container {
  padding: 80px 20px;
  background-color: #ffffff;
  text-align: center;
}

.search-container {
  display: flex;
  justify-content: flex-start;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.product-item {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  margin: 10px;
  padding: 15px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.product-item:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.product-link {
  text-decoration: none;
  color: inherit;
}

.product-item img {
  width: 100%;
  border-radius: 10px;
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
