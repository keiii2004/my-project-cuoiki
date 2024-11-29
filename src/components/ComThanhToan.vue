<template>
  <div class="cart-checkout">
    <div class="cart">
      <div v-if="cart.length === 0">
        <p>Giỏ hàng trống</p>
      </div>
      <div v-else class="modal-content">
        <table class="text-center table">
          <tr>
            <th>Hình</th>
            <th>Sản Phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Tiền</th>
          </tr>
          <tr v-for="item in cart" :key="item.id">
            <td>
              <img :src="item.image" style="height: 100px; width: 100px" />
            </td>
            <td class="align-middle">{{ item.name }}</td>
            <td class="align-middle">{{ item.price }}</td>
            <td class="align-middle">{{ item.quantity }}</td>
            <td class="align-middle">{{ item.price * item.quantity }}</td>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>Tổng tiền: {{ tongtien }} VNĐ (Bao gồm phí vận chuyển 25,000 VNĐ)</th>
            <th>Tổng số lượng: {{ tongsoluong }}</th>
          </tr>
        </table>
      </div>
    </div>

    <div class="checkout-info">
      <h3>Thông tin giao hàng</h3>
      <div>
        <label>Họ và tên:</label>
        <input
          type="text"
          v-model="customerInfo.name"
          placeholder="Nhập họ và tên"
        />
      </div>
      <div>
        <label>Số điện thoại:</label>
        <input
          type="text"
          v-model="customerInfo.phone"
          placeholder="Nhập số điện thoại"
        />
      </div>
      <div>
        <label>Địa chỉ:</label>
        <input
          type="text"
          v-model="customerInfo.address"
          placeholder="Nhập địa chỉ"
        />
      </div>
      <div>
        <label>Phương thức thanh toán:</label>
        <select v-model="customerInfo.paymentMethod">
          <option value="cod">Thanh toán khi nhận hàng (COD)</option>
          <option value="bank">Chuyển khoản ngân hàng</option>
        </select>
      </div>
      <button
        class="btn btn-success"
        @click="purchase"
        style="width: 100%; margin-top: 10px"
      >
        Đặt hàng
      </button>
      <!-- Notification message -->
      <div
        v-if="notification"
        :class="{
          'success-message': notificationType === 'success',
          'error-message': notificationType === 'error',
        }"
        style="margin-top: 10px"
      >
        {{ notification }}
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/eventBus";
import cart from "../data/cart";
import axios from "axios";
export default {
  data() {
    return {
      cart: cart,
      customerInfo: {
        name: "",
        phone: "",
        address: "",
        paymentMethod: "cod",
      },
      notification: "",
      notificationType: "",
    };
  },
  computed: {
    tongtien() {
    const total = this.cart.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    const shippingFee = 25000; 
    return total + shippingFee;
  },
    tongsoluong() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
  },
  methods: {
    async purchase() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
      if (!currentUser) {
        this.$router.push("/login");
        this.cart.length = 0;
        return;
      }

      if (this.cart.length === 0) {
        this.notification =
          "Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi mua!";
        this.notificationType = "error";
        return;
      }

      if (
        this.customerInfo.name &&
        this.customerInfo.phone &&
        this.customerInfo.address
      ) {
        const phonePattern = /^[0-9]{10,11}$/; // Số điện thoại có độ dài 10 hoặc 11 chữ số
        if (!phonePattern.test(this.customerInfo.phone)) {
          this.notification = "Số điện thoại không hợp lệ! Vui lòng nhập lại.";
          this.notificationType = "error";
          return;
        }

        const orderData = {
          username: currentUser.username, // Lấy từ localStorage
          customerInfo: {
            name: this.customerInfo.name,
            phone: this.customerInfo.phone,
            address: this.customerInfo.address,
            paymentMethod: this.customerInfo.paymentMethod,
          },
          items: this.cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
          })),
          totalAmount: this.tongtien,
          totalQuantity: this.tongsoluong,
          date: new Date().toISOString(),
        };
        const username = currentUser.username;
        try {
          const response = await axios.post(
            "http://localhost:3000/orderHistory",
            orderData
          );
          console.log(response);
          for (let item of this.cart) {
            try {
              // Lấy thông tin sản phẩm hiện tại từ API
              const response = await axios.get(
                `http://localhost:3000/products/${item.id}`
              );
              const product = response.data;

              if (product) {
                // Tính toán số lượng mới
                const newQuality = product.quality - item.quantity;

                if (newQuality >= 0) {
                  // Cập nhật sản phẩm với số lượng mới
                  await axios.put(`http://localhost:3000/products/${item.id}`, {
                    ...product, // Duy trì các trường hiện tại
                    quality: newQuality, // Cập nhật số lượng
                  });
                }
              }
            } catch (error) {
              console.error(
                `Lỗi khi cập nhật sản phẩm có ID ${item.id}:`,
                error
              );
            }
          }
          const orderHistory =
            JSON.parse(localStorage.getItem("orderHistory")) || {};
          if (!orderHistory[username]) {
            orderHistory[username] = [];
          }
          orderHistory[username].push(orderData);
          localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
          eventBus.emit("updateCartQuantity", orderHistory[username].length);
          this.cart.length = 0;
          this.notification = "Đơn hàng của bạn đã được đặt thành công!";
          this.notificationType = "success";
          this.customerInfo = {
            name: "",
            phone: "",
            address: "",
            paymentMethod: "cod",
          };
        } catch (error) {
          console.error(error);
          this.notification = "Đặt hàng thất bại. Vui lòng thử lại!";
          this.notificationType = "error";
        }
      } else {
        this.notification = "Vui lòng nhập đầy đủ thông tin giao hàng!";
        this.notificationType = "error";
      }
    },
  },
};
</script>

<style scoped>
.success-message {
  color: green;
  font-weight: bold;
}

.error-message {
  color: red;
  font-weight: bold;
}

.cart-checkout {
  display: flex;
  gap: 20px;
  padding: 80px;
}

.cart {
  flex: 1;
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.checkout-info {
  flex: 1;
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.checkout-info h3 {
  margin-bottom: 20px;
}

.checkout-info div {
  margin-bottom: 15px;
}

.checkout-info label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.checkout-info input,
.checkout-info select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.btn-success {
  font-size: 16px;
  padding: 5px;
  color: #eeeded;
  cursor: pointer;
  background-color: #e60012;
}

.table th,
.table td {
  padding: 5px;
  vertical-align: middle;
}
</style>
