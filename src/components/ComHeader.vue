<template>
  <header>
    <div class="container">
      <div class="logo" @click="reloadPage">
        <img src="https://sasin.vn/assets/icons/group-4235.svg" alt="Icon" />
      </div>
      <nav>
        <ul class="nav-left">
          <li><router-link to="/">Trang Chủ</router-link></li>
          <li><router-link to="/product-micay">Mì Cay</router-link></li>
          <li>
            <router-link to="/product-nuoc-giai-khat"
              >Nước giải khát</router-link
            >
          </li>
          <li><router-link to="/tintuc">Tin Tức</router-link></li>
          <li><router-link to="/gioithieu">Giới Thiệu</router-link></li>
        </ul>
        <ul class="nav-right">
          <li>
            <a href="javascript:void(0)" class="button" @click="toggleCart">
              <i class="material-symbols-outlined" id="icon-cart"
                >shopping_cart</i
              >
              <span v-if="cartTotalQuantity > 0" class="cart-quantity">{{
                cartTotalQuantity
              }}</span>
            </a>
          </li>
          <li v-if="user">
            <a
              href="javascript:void(0)"
              class="button"
              @click="toggleNotification"
            >
              <ion-icon
                name="notifications-outline"
                id="icon-notifi"
              ></ion-icon>
            </a>
          </li>
          <li id="login" v-if="!user">
            <router-link
              to="/login"
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
              "
            >
              <div style="display: flex; align-items: center">
                <ion-icon name="person-outline" id="icon-login"></ion-icon>
                <div>Đăng Nhập</div>
              </div>
            </router-link>
          </li>
          <li>
            <div v-if="user" id="user-info">
              <span> Xin chào, {{ user.username }}</span>
              <ion-icon
                name="log-out-outline"
                id="icon-logout"
                @click="logout"
              ></ion-icon>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <div class="notifi" v-if="showNotification">
    <span v-if="hasOrderHistory">Bạn có {{ totalOrders }} đơn hàng đã mua</span>
    <span v-else>Không có thông báo!</span>
    <router-link to="/lichsumuahang">Lịch sử mua hàng</router-link>
  </div>

  <!-- Modal Giỏ Hàng -->
  <cart-details
    v-if="showCart"
    :cart="cart"
    @close="closeCart"
    class="cart-modal"
  />
  <router-view></router-view>
</template>

<script>
import cart from "../data/cart";
import CartDetails from "../components/CartModal.vue";
import eventBus from "@/eventBus";
import { fetchOrderHistory } from "../data/orderHistory"; // Import the API function

export default {
  components: {
    CartDetails,
  },
  data() {
    return {
      cart: cart,
      showCart: false,
      showLogin: false,
      showNotification: false,
      user: JSON.parse(localStorage.getItem("currentUser")) || null,
      orderHistory: [],
      hasOrderHistory: false,
      totalOrders: 0,
    };
  },
  computed: {
    cartTotalQuantity() {
      return this.cart.reduce((total, item) => total + (item.quantity || 0), 0);
    },
  },
  methods: {
    reloadPage() {
      this.$router.push({ name: "Home" });
    },
    logout() {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("orderHistory");
      this.user = null;
      this.showNotification = false;
      this.$router.push({ name: "Home" });
      this.cart.length = 0;
    },
    async checkOrderHistory() {
      if (this.user) {
        try {
          const orders = await fetchOrderHistory(); // Fetch order history from the API
          const userOrders = orders.filter(
            (order) => order.username === this.user.username
          ); // Filter orders by the logged-in user
          this.hasOrderHistory = userOrders.length > 0;
          this.totalOrders = userOrders.length; // Set the total number of orders
        } catch (error) {
          console.error("Error fetching order history:", error);
          this.hasOrderHistory = false;
          this.totalOrders = 0; // Reset if there is an error
        }
      } else {
        this.hasOrderHistory = false;
        this.totalOrders = 0;
      }
    },
    toggleCart() {
      this.showCart = !this.showCart;
      if (this.showCart) {
        this.showNotification = false; // Close notification when cart is open
      }
    },
    toggleNotification() {
      this.showNotification = !this.showNotification;
      if (this.showNotification) {
        this.showCart = false;
      }
    },
    closeCart() {
      this.showCart = false;
    },
  },
  created() {
    eventBus.on("loginSuccess", (user) => {
      this.user = user;
      // After successful login, check order history
      this.checkOrderHistory();
    });
    eventBus.on("updateCartQuantity", (newQuantity) => {
      // Update the cart quantity when it changes
      this.totalOrders = newQuantity;
      this.hasOrderHistory = newQuantity > 0;
    });

    // Check order history when the page is loaded
    this.checkOrderHistory();
  },
  beforeUnmount() {
    eventBus.off("loginSuccess");
    eventBus.off("updateCartQuantity");
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 30px;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.logo img {
  width: 100px;
  cursor: pointer;
}

nav {
  display: flex;
  width: 100%;
  margin-left: 50px;
  justify-content: space-between;
}

.nav-left,
.nav-right {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-left {
  margin-right: auto;
}

.nav-right {
  margin-left: auto;
}

nav ul li {
  position: relative;
}

nav ul li a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
  font-weight: 500;
}

nav ul li a:hover {
  color: #e60012;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 15px;
  border: 1px solid #e60012;
  color: #e60012;
  border-radius: 20px;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

.button:hover {
  background-color: #e60012;
  color: white;
}
#icon-notifi {
  position: relative;
  font-size: 24px;
  margin-right: 5px;
  vertical-align: middle;
}
.notifi {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 75px;
  right: 100px;
  width: 300px;
  max-height: 500px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1001;
}

.notifi span {
  margin-bottom: 10px;
}

.notifi a {
  color: #333;
  align-self: flex-end;
  text-decoration: none;
  font-weight: bold;
}

.notifi a:hover {
  color: #e60012;
}
#icon-cart.has-notification {
  position: relative;
}

.cart-quantity {
  background-color: #e60012;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: 50%;
  padding: 2px 8px;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}

#icon-cart {
  font-size: 24px;
  margin-right: 5px;
  vertical-align: middle;
}

#login {
  border: 1px solid #e60012;
  border-radius: 20px;
  padding: 8px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

#icon-login {
  color: #e60012;
  margin-right: 10px;
  font-size: 20px;
  transition: color 0.3s;
}

#login:hover {
  background-color: #e60012;
}

#login:hover #icon-login {
  color: white;
}

#login a {
  color: #e60012;
  text-decoration: none;
}

#login:hover a {
  color: white;
}

/* Định dạng cho thông tin người dùng */
#user-info {
  display: flex;
  align-items: center;
  color: #e60012;
  gap: 10px;
  padding: 10px 10px;
  background-color: white;
  border-radius: 20px;
  border: 1px solid #e60012;
}

#user-info span {
  font-size: 16px;
  font-weight: bold;
}

#user-info ion-icon {
  font-size: 26px;
  cursor: pointer;
  transition: color 0.3s;
}

#user-info ion-icon:hover {
  opacity: 0.4;
}

/* CSS cho modal giỏ hàng */
.cart-modal {
  position: absolute;
  top: 75px;
  right: 20px;
  width: 550px;
  max-height: 500px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1001;
}
</style>
