<template>
  <body>
    <div class="container">
      <div id="toast-container"></div>
      <div class="toggle-buttons">
        <button :class="{ active: isLoginForm }" @click="showLoginForm">
          Đăng nhập
        </button>
        <button :class="{ active: !isLoginForm }" @click="showRegisterForm">
          Đăng ký
        </button>
      </div>

      <div v-if="isLoginForm" class="wrapper">
        <!-- Form Đăng nhập -->
        <form @submit.prevent="submitLogin">
          <h1>Đăng nhập</h1>
          <div class="input-box">
            <input
              v-model="usernamelogin"
              type="text"
              placeholder="Tên đăng nhập"
              required
            />
          </div>
          <div class="input-box">
            <input
              v-model="passwordlogin"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Mật khẩu"
              required
            />
            <span class="toggle-password" @click="togglePassword"> </span>
          </div>

          <button type="submit" class="btn btn-icon">
            Đăng nhập
            <ion-icon
              name="arrow-forward-circle-outline"
              id="icon-arrow"
            ></ion-icon>
          </button>
          <div class="social-login">
            <div class="or">Hoặc</div>
            <!-- Thêm đoạn "Hoặc" ở đây -->
            <button class="social-btn google-btn">
              <ion-icon name="logo-google"></ion-icon> Đăng nhập với Google
            </button>
            <button class="social-btn facebook-btn">
              <ion-icon name="logo-facebook"></ion-icon> Đăng nhập với Facebook
            </button>
          </div>
        </form>
      </div>

      <div v-else class="wrapper">
        <!-- Form Đăng ký -->
        <form @submit.prevent="submitRegister">
          <h1>Đăng ký</h1>
          <div class="input-box">
            <input
              v-model="username"
              type="text"
              placeholder="Tên đăng nhập"
              required
            />
          </div>
          <div class="input-box">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Mật khẩu"
              required
            />
            <span class="toggle-password" @click="togglePassword"></span>
          </div>
          <div class="input-box">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>
          <button type="submit" class="btn btn-icon">
            Đăng ký
            <ion-icon
              name="arrow-forward-circle-outline"
              id="icon-arrow"
            ></ion-icon>
          </button>

          <div class="social-register">
            <div class="or">Hoặc</div>
            <button class="social-btn google-btn">
              <ion-icon name="logo-google"></ion-icon> Đăng ký với Google
            </button>
            <button class="social-btn facebook-btn">
              <ion-icon name="logo-facebook"></ion-icon> Đăng ký với Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  </body>
</template>
<script>
import axios from "axios";
import eventBus from "@/eventBus";
import cart from "../data/cart";
export default {
  data() {
    return {
      cart: cart,
      isLoginForm: true,
      showPassword: false,
      usernamelogin: "",
      passwordlogin: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
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
    showLoginForm() {
      this.isLoginForm = true;
      this.resetForm();
    },
    showRegisterForm() {
      this.isLoginForm = false;
      this.resetForm();
    },
    resetForm() {
      this.usernamelogin = "";
      this.passwordlogin = "";
      this.username = "";
      this.password = "";
      this.confirmPassword = "";
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async submitLogin() {
      // Lấy danh sách người dùng từ API
      try {
        const response = await axios.get("http://localhost:3000/account");
        const users = response.data;

        const user = users.find(
          (x) =>
            x.username === this.usernamelogin &&
            x.password === this.passwordlogin
        );
        if (user) {
          this.cart.length = 0;
          localStorage.setItem("currentUser", JSON.stringify(user));
          eventBus.emit("loginSuccess", user);
          this.$router.push("/");
          this.resetForm();
        } else {
          this.showToast("Tài khoản hoặc mật khẩu sai!", "info", "Thông báo");
        }
      } catch (error) {
        this.showToast("Có lỗi xảy ra khi đăng nhập!", "error", "Lỗi");
      }
    },
    async submitRegister() {
      if (this.password !== this.confirmPassword) {
        this.showToast(
          "Mật khẩu và mật khẩu xác nhận không khớp!",
          "info",
          "Thông báo"
        );
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/account");
        const users = response.data;
        const userExists = users.find((x) => x.username === this.username);

        if (userExists) {
          this.showToast(
            "Tên đăng nhập đã tồn tại, vui lòng chọn tên khác!",
            "info",
            "Thông báo"
          );
          return;
        }
        const newUser = {
          id: users.length + 1,
          username: this.username,
          password: this.password,
        };
        const registerResponse = await axios.post(
          "http://localhost:3000/account",
          newUser
        );

        if (registerResponse.status === 201) {
          this.cart.length = 0;
          this.showToast("Đăng ký tài khoản thành công!", "success", "Thành công");
          this.resetForm();
          this.isLoginForm = true;
        } else {
          this.showToast("Có lỗi xảy ra khi đăng ký!", "error", "Lỗi");
        }
      } catch (error) {
        this.showToast("Có lỗi xảy ra khi đăng ký!", "error", "Lỗi");
      }
    },
  },
};
</script>

<style scoped>
body {
  margin-top: 60px;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ffffff;
  border: 5px solid rgba(255, 255, 255, 1);
  border-radius: 12px;
}

.container {
  background-color: #fff;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
}

.toggle-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.toggle-buttons button {
  padding: 10px 20px;
  border: none;
  background-color: #ddd;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
}

.toggle-buttons .active {
  background-color: #e60012;
  color: white;
}

.wrapper {
  width: 100%;
  max-width: 420px;
  color: #333;
  padding: 30px 20px;
}

.wrapper h1 {
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  color: #e60012;
}

.input-box {
  position: relative;
  width: 100%;
  height: 50px;
  margin: 15px 0;
}

.input-box input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: 2px solid rgba(0, 0, 0, 0.1);
  outline: none;
  border-radius: 10px;
  font-size: 16px;
  color: #333;
  padding: 15px;
}

.input-box input::placeholder {
  color: #888;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: #333;
  cursor: pointer;
  font-size: 18px;
}

.btn {
  width: 100%;
  height: 45px;
  background: #e60012;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  color: white;
  font-weight: 600;
  margin-top: 20px;
}

.social-login,
.social-register {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}
.toggle-buttons button:hover,
.social-btn:hover,
.btn:hover {
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.or {
  text-align: center;
  margin: 10px 0;
  color: #777;
}

.social-btn {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 0 10px;
  font-weight: 600;
  gap: 10px;
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.google-btn {
  background-color: #db4437;
}

.facebook-btn {
  background-color: #3b5998;
}
.social-btn ion-icon {
  font-size: 23px;
}
#icon-arrow {
  font-size: 23px;
}
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
.toast.error {
  border-left: 4px solid #dc3545;
}
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
