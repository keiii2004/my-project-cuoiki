    <template>
        <footer class="info-container">
        <span class="name">Đào Tuấn An</span>
        <span class="mssv">MSSV: 22150136</span>
        <span>Lớp:221405</span>
        <span class="email">Email: daotuanan@gmail.com</span>
        </footer>
    </template>

    <script>
    export default {}
    </script>

    <style>
            
            .info-container {
   width: 100%; 
   position: relative; 
   display: flex;
   flex-direction: column;
   align-items: center; 
   padding: 100px;
   border-top: 1px solid #e0e0e0;
   background-color: #f9f9f9;
   font-family: Arial, sans-serif;
   box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
   margin-top: 0 auto; 
}

.info-container span {
   margin-bottom: 5px; 
   font-size: 16px;
   color: #333;
}

.name {
   font-weight: bold;
   font-size: 18px;
   color: #e60012;
}

.mssv {
   color: #555;
}

.email {
   color: #777;
   font-style: italic;
}

    </style>
