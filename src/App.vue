<template>
  <div id="app">
    <ProductForm />
    <Header />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/ComHeader.vue";
import Footer from "./components/ComFooter.vue";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
header,
footer {
  flex-shrink: 0; /* Không co lại */
}
</style>
