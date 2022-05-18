<template>
  <div class="header">
    <div @click="nav" class="logo">
      <img src="../../assets/logo.png" alt="" srcset="" />
    </div>
    <!-- 右边 -->
    <div class="header-right">
      <h1>{{ account }}</h1>
      <a @click="exit" href="/login">退出</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      account: (state) => state.header.account,
    }),
  },
  data() {
    return {};
  },
  methods: {
    selectAvatar(res) {
      this.$router.push("/login");
    },
    handleMenu: function () {
      if (!this.isLogin) {
        this.$store.commit("collapseMenu");
      }
    },
    nav() {
      this.$router.push("/");
    },
    exit(){
      this.$store.commit("header/setToken", "");
    }
  },
  mounted: function () {},
};
</script>


<style scoped>
.header {
  width: 100%;
  height: 70px;
  /* border-bottom: 1px solid rgb(93, 178, 218); */
  box-shadow: 0 2px 12px 0 #c0c4cc;
}
.logo {
  float: left;
  margin-left: 0px;
}
.logo img {
  width: 180px;
  height: 70px;
  /* margin: 10px; */
}
.logo .logo-righ {
  float: right;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin-top: 12px;
  margin-left: 10px;
  color: #fff;
}
.logo .logo-righ .logo-first {
  font-size: 20px;
  font-weight: 400;
}
.logo .logo-righ .logo-second {
  font-size: 12px;
}
.header > .header-right {
  float: right;
  margin-right: 20px;
  line-height: 70px;
  display: flex;
  flex-direction: row;
  color: #909399;
}
.header > .header-right a {
  margin-left: 20px;
  color: #f56c6c;
}
</style>
