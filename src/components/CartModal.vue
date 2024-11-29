<template>
  <div v-if="cart.length === 0">
    <p>Giỏ hàng trống</p>
  </div>
  <div v-else class="modal-content">
    <table style="width: 100%" class="text-center table">
      <tr>
        <th>Hình</th>
        <th>Sản Phẩm</th>
        <th>Đơn giá</th>
        <th>Số lượng</th>
        <th>Tiền</th>
      </tr>
      <tr v-for="item in cart" :key="item.id">
        <td><img :src="item.image" style="height: 100px; width: 100px" /></td>
        <td class="align-middle">{{ item.name }}</td>
        <td class="align-middle">{{ item.price }}</td>
        <td class="align-middle">
          <button @click="decreaseQuantity(item)">-</button>
          {{ item.quantity }}
          <button @click="increaseQuantity(item)">+</button>
        </td>
        <td class="align-middle">{{ item.price * item.quantity }}</td>
        <td class="align-middle">
          <button class="btn btn-danger" @click="deleteProduct(item)">
            Xóa
          </button>
        </td>
      </tr>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th>Tổng tiền:{{ tongtien }}</th>
        <th>Tổng số lượng:{{ tongsoluong }}</th>
        <th>
          <button class="btn btn-danger" @click="clearCart">Xóa hết</button>
        </th>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td colspan="5" class="text-right">
          <router-link to="/thanhtoan">
            <button
              class="btn btn-success"
              @click="purchase"
              style="width: 100%; max-width: 100px"
            >
              Mua
            </button>
          </router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script scoped>
import cart from "../data/cart";
import { fetchProducts } from "../data/product";

export default {
  data() {
    return {
      cart: cart,
      items: [], // Dữ liệu sản phẩm
    };
  },

  computed: {
    tongtien() {
      return this.cart.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
    tongsoluong() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
  },

  methods: {
    // Lấy sản phẩm từ API
    async fetchCartData() {
      const fetchedProducts = await fetchProducts(); // Lấy dữ liệu sản phẩm từ API
      this.items = fetchedProducts; // Cập nhật danh sách sản phẩm
    },
    purchase() {
      this.$emit("close");
    },

    increaseQuantity(item) {
      const product = this.items.find((x) => x.id === item.id);
      if (product && item.quantity < product.quality) {
        item.quantity++;
      } else {
        console.log(`Sản phẩm ${item.name} không đủ số lượng!`);
      }
    },

    decreaseQuantity(item) {
      const prod = this.cart.find((x) => x.id === item.id);
      if (prod && item.quantity > 0) {
        item.quantity--;
        if (item.quantity <= 0) {
          this.deleteProduct(item);
        }
      }
    },

    deleteProduct(item) {
      const index = this.cart.findIndex((x) => x.id === item.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },

    clearCart() {
      this.cart.length = 0;
    },
  },

  mounted() {
    this.fetchCartData(); // Gọi API khi component được load
  },
};
</script>

<style scoped>
/* Styles for the table and buttons */
.modal-content {
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.text-center {
  text-align: center;
}

.table th,
.table td {
  padding: 5px;
  vertical-align: middle;
}

.table th {
  font-weight: 600;
  font-size: 10x;
}

button {
  cursor: pointer;
  padding: 4px 6px;
  border: 1px solid #e60012;
  color: #e60012;
  border-radius: 20px;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

.btn-success {
  font-size: 16px;
  padding: 5px;
  color: #eeeded;
  background-color: #e60012;
}
</style>
