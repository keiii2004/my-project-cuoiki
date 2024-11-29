<template>
    <div class="newsDetail">
        <div class="virtual-header"></div>
        <div class="newsDetailContainer">
            <h2 class="textColor-firebrick mb-md-5 barlow-bold-48">
                SASIN RA MẮT THỰC ĐƠN “ĂN CHAY KIỂU HÀN” CỰC NGON
            </h2>
            <div class="d-flex flex-row mb-4 mb-md-5 w-100 align-items-center">
                <span class="textColor-gray-300 barlow-bold-21">08/08/2024</span>
                <div class="divider"></div>
            </div>
            <section class="htmlContent">
                <p><i><strong>Từ 6/8/2024, Sasin sẽ cho ra mắt thực đơn “Ăn chay kiểu Hàn” với mục đích khơi gợi niềm đam mê ẩm thực chạy của các bạn trẻ.</strong></i></p>
                <p>Thực đơn chay của Sasin sẽ mang hơi hướng ăn chay đậm đà, mang phong cách món ăn Hàn Quốc với các nguyên liệu như tempura nấm, phù trúc túi tiền, tokbokki,…</p>
                <p><strong>Khám phá thực đơn chay Sasin:</strong></p>
                <ul>
                    <li>MÌ CAY CHAY 7 CẤP ĐỘ - Nước dùng chua cay đậm đà với các topping như Tempura nấm, phù trúc túi tiền, xúc xích chay, đậu hũ non,…</li>
                    <li>TOKBOK-CHEESE CHAY - Phô mai béo ngọt kết hợp bánh gạo, tempura nấm, phù trúc túi tiền và xúc xích chay.</li>
                    <li>SALAD XỐT MÈ RANG - Món salad ăn kèm nước xốt mè rang, tạo hương vị đậm đà và cân bằng.</li>
                </ul>
                <figure class="image image_resized">
                    <img src="https://sasin.vn:8005//Resource/Shared/f82d8cad-80e3-467e-8de1-ecfcd841961d.jpg" alt="Thực đơn ăn chay Hàn Quốc" width="2560" height="2560">
                </figure>
                <p>Sasin còn cung cấp combo chay 69K/người gồm món chay chính & ly nước Coca/Sprite. Chỉ thêm 7K để nâng cấp nước.</p>
                <figure class="image image_resized">
                    <img src="https://sasin.vn:8005//Resource/Shared/b444335b-ec3c-4440-8a6c-3a22141d0e46.jpg" alt="Thực đơn ăn chay tại Sasin" width="2048" height="1454">
                </figure>
                <p><i><strong>Lưu ý: Các món chay tại Sasin được nấu và chế biến riêng biệt, không chung với các món mặn khác.</strong></i></p>
            </section>
            <div class="d-flex justify-content-center">
                <a href="" class="text-decoration-none mt-4 mb-5">
                    <span class="button-firebrick-radius barlow-bold-18">Xem toàn bộ</span>
                </a>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
   
  }
  </script>
  <style scoped>

.newsDetail {
    padding: 80px;
    background-color: #f8f9fa;
}

/* Title */
.newsDetailContainer h2 {
    color: #B22222; /* Firebrick */
    font-size: 48px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1.5rem;
}

/* Date and Divider */
.d-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
}

.d-flex span {
    color: #B0B0B0; /* Light gray */
    font-size: 21px;
    font-weight: bold;
    margin-right: 1rem;
}

.divider {
    border-top: 1px dashed #C0C0C0;
    height: 2px;
    width: 80%;
}

/* Content Section */
.htmlContent {
    font-size: 18px;
    line-height: 1.8;
    color: #000;
    margin-bottom: 2rem;
    text-align: justify; /* Added text alignment */
}

.htmlContent p,
.htmlContent ul {
    margin-bottom: 1.5rem;
}

.htmlContent ul {
    padding-left: 20px;
    list-style-type: disc;
}

.htmlContent li {
    margin-bottom: 0.8rem;
}

/* Images */
.image_resized {
    width: 66.29%;
    display: flex;
    justify-content: center;
    margin: 1.5rem 0;
}

.image_resized img {
    max-width: 100% !important;
    height: fit-content;
    display: block
}

/* Button */
.button-firebrick-radius {
    display: inline-block;
    color: #FFF;
    background-color: #B22222; /* Firebrick */
    padding: 10px 20px;
    border-radius: 50px;
    font-size: 18px;
    font-weight: bold;
    transition: background-color 0.3s ease;
    text-align: center;
}

.button-firebrick-radius:hover {
    background-color: #8B1A1A; /* Darker Firebrick */
}
</style>

  