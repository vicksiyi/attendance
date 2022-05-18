<template>
  <div class="login">
    <div class="logo">
      <div class="logo">
        <img src="../assets/logo.png" alt="" srcset="" />
      </div>
    </div>
    <div class="submit-form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="登录账号" prop="account">
          <el-input
            v-model="ruleForm.account"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password2">
          <el-input
            type="password"
            v-model="ruleForm.password2"
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >注册</el-button
            >
          </el-row>
        </el-form-item>
        <el-form-item>
          <div class="bottom">
            <a href="/login">登录</a>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
import { register } from "@/api/user";
import Loading from "@/common/loading";
export default {
  name: "Register",
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        account: "",
        password: "",
        password2: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      let _data = this.ruleForm;
      const loading = Loading.start(this);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let _result = await register({
            account: _data.account,
            passwd: md5(_data.password),
          });
          if (_result.data.code != 200) {
            _this.$message.error(_result.data.msg);
            Loading.end(loading);
            return;
          }
          _this.$message({ type: "success", message: "成功注册" });
          Loading.end(loading);
        } else {
          Loading.end(loading);
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.bottom {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.bottom a {
  color: #409eff;
}
.login {
  width: 600px;
  margin: 100px auto;
}
.el-button {
  width: 100%;
}
.logo {
  /* float: left; */
  margin: auto;
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
}
.logo img {
  width: 300px;
  height: 120px;
  margin: 10px;
  border-radius: 50%;
  margin-left: 150px;
}
.logo .logo-righ {
  /* float: right; */
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin-top: 12px;
  /* margin-left: 10px; */
}
.logo .logo-righ .logo-first {
  font-size: 25px;
  color: #303133;
  font-weight: 400;
}
.logo .logo-righ .logo-second {
  font-size: 15px;
}

.submit-form {
  margin-top: 30px;
}
</style>