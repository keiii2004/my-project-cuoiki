<template>
  <section class="home-container">
    <div class="intro">
      <h1>Mì 7 cấp độ - SASIN</h1>
      <p>Sasin là chuỗi thương hiệu ẩm thực Hàn Quốc ra mắt vào năm 2016. Món “mì cay” với 7 cung bậc cay đã trở thành cơn sốt đối với giới trẻ lúc bấy giờ. Sasin đã trở thành một trong những lựa chọn hàng đầu của giới trẻ Việt Nam khi muốn thưởng thức mì cay nói riêng và ẩm thực Hàn Quốc nói chung.</p>
      <p>Thưởng thức combo đặc biệt với Mì Sincay Hải Sản, Mì Soyum Đặc Biệt, và Kimbap Chiên giòn rụm, ngon miệng.</p>
      <p>Giá ưu đãi chỉ còn <span class="discount-price">149.000đ</span> <span class="original-price">163.000đ</span></p>
    </div>
    <div class="combo-image">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        :alt="'Combo Mì Cay Sasin ' + index"
        :class="{ active: index === activeIndex }"
      />
    </div>
  </section>
  <section class="about-container">
    <h1>Về chúng tôi - SASIN</h1>
    <p>Sasin là một thương hiệu nổi tiếng trong lĩnh vực ẩm thực Hàn Quốc...</p>
    <img id="img-content" src="../assets/img/PM00067.webp" alt="Hình ảnh về Sasin" />
  </section>
</template>

<script>
export default {
  data() {
    return {
      images: [
        require("../assets/img/Banner.webp"),
        require("../assets/img/Banner3.webp"),
        require("../assets/img/Banner2.webp"),
      ],
      activeIndex: 0,
    };
  },
  mounted() {
    this.startSlideshow();
  },
  methods: {
    startSlideshow() {
      setInterval(() => {
        this.activeIndex = (this.activeIndex + 1) % this.images.length;
      }, 2000); 
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

.intro {
  margin-left: 100px;
}

.home-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 50px 20px;
  background-color: white;
  text-align: center;
  gap: 20px;
}

.intro h1 {
  font-size: 2em;
  color: #e60012;
  margin-bottom: 10px;
}

.intro p {
  font-size: 1.1em;
  color: #555;
  margin: 10px 50px;
  text-align: justify; /* Căn đều hai bên */
  max-width: 400px;
}

.discount-price {
  font-size: 1.5em;
  font-weight: bold;
  color: #e60012;
}

.original-price {
  font-size: 1.2em;
  color: #888;
  text-decoration: line-through;
  margin-left: 10px;
}

.combo-image {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 450px; 
}

.combo-image img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;  
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  z-index: -1;
}

.combo-image img.active {
  opacity: 1;
  z-index: 1;
}

.about-container {
  display: flex;
  flex-direction: column; /* Sắp xếp theo cột */
  align-items: center; /* Canh giữa nội dung */
  padding: 40px 20px;
  background-color: white; /* Nền trắng cho phần này */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Đổ bóng */
}

.about-container h1 {
  font-size: 2.5em; /* Kích thước chữ lớn hơn */
  color: #e60012; /* Màu chữ */
  margin-bottom: 15px; /* Khoảng cách dưới */
  text-align: center; /* Canh giữa tiêu đề */
}

.about-container p {
  font-size: 1.1em; /* Kích thước chữ vừa phải */
  color: #555; /* Màu chữ */
  margin: 10px 0; /* Khoảng cách trên và dưới */
  text-align: justify; /* Căn đều hai bên */
  max-width: 800px; /* Giới hạn chiều rộng */
}

#img-content {
  width: 90%; /* Chiều rộng 100% */
  height: 400px;
  border-radius: 20px;
  margin-top: 20px; /* Khoảng cách trên ảnh */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Đổ bóng cho ảnh */
}
</style>
