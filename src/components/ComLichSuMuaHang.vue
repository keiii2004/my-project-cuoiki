<template>
  <div>
    <h2>Lịch sử đơn hàng</h2>
    <table v-if="orderHistory.length > 0" class="order-history-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Ngày đặt</th>
          <th>Tên khách hàng</th>
          <th>Số điện thoại</th>
          <th>Phương thức thanh toán</th>
          <th>Địa chỉ giao hàng</th>
          <th>Chi tiết đơn hàng</th>
          <th>Tổng tiền</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orderHistory" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ formatDate(order.date) }}</td>
          <td>{{ order.customerInfo.name }}</td>
          <!-- Thêm tên khách hàng -->
          <td>{{ order.customerInfo.phone }}</td>
          <!-- Thêm số điện thoại -->
          <td>{{ order.customerInfo.paymentMethod }}</td>
          <td>{{ order.customerInfo.address }}</td>
          <td>
            <ul>
              <li v-for="(item, idx) in order.items" :key="idx">
                {{ item.name }} - Số lượng: {{ item.quantity }} - Giá:
                {{ item.price }} VNĐ
              </li>
            </ul>
          </td>
          <td>{{ order.totalAmount }} VNĐ</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p>Không có lịch sử đơn hàng.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orderHistory: [], // Dùng để lưu trữ danh sách đơn hàng của người dùng
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = ("0" + date.getDate()).slice(-2);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    },
    async render() {
      // Lấy thông tin người dùng hiện tại từ localStorage
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (currentUser && currentUser.username) {
        try {
          // Gửi request lấy lịch sử đơn hàng từ API
          const response = await axios.get(
            "http://localhost:3000/orderHistory"
          );
          const orderHistory = response.data;

          // Lọc lịch sử đơn hàng cho người dùng hiện tại
          const userOrders = orderHistory.filter(
            (order) => order.username === currentUser.username
          );

          // Gán lịch sử đơn hàng cho người dùng
          this.orderHistory = userOrders;
        } catch (error) {
          console.error("Error fetching order history:", error);
          this.orderHistory = []; // Nếu có lỗi, gán mảng trống
        }
      } else {
        this.orderHistory = []; // Nếu không có người dùng đăng nhập, gán mảng trống
      }
    },
  },
  mounted() {
    this.render(); // Gọi phương thức render khi component được gắn vào DOM
  },
};
</script>

<style scoped>
#app > div {
  padding-top: 60px;
  min-height: 500px;
}

.order-history-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.order-history-table th,
.order-history-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.order-history-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.order-history-table td ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

.order-history-table td ul li {
  padding-bottom: 5px;
}
</style>
