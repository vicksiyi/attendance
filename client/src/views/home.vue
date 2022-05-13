<template>
  <el-container>
    <el-header><Header></Header></el-header>
    <el-main>
      <div class="main">
        <router-view></router-view>
      </div>
    </el-main>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>

<script>
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
export default {
  name: "Home",
  components: { Header, Footer },
  data() {
    return {};
  },
};
</script>

<style scoped>
.main {
  padding: 20px;
}
.el-header {
  padding: 0;
}
.el-footer {
  padding: 0;
}
</style>
