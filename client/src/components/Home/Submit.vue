<template>
  <div class="form">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
    >
      <el-form-item label="班级名称" prop="title">
        <el-input
          v-model="ruleForm.title"
          placeholder="请输入班级名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="submitForm('loginForm')"
          style="width: 100%"
          type="primary"
          >添加</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import form from "@/common/form";
import Loading from "@/common/loading";
import { add } from "@/api/class";
export default {
  name: "Submit",
  data() {
    return {
      ruleForm: {
        title: "",
      },
      rules: {
        title: [{ required: true, message: "请输入班级名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      const loading = Loading.start(this);
      form.validate(this, formName).then(async (valid) => {
        if (valid) {
          let _result = await add({ title: this.ruleForm.title });
          if (_result.data.code != 200) {
            this.$message.error(_result.data.msg);
            Loading.end(loading);
            return;
          }
          Loading.end(loading);
          this.$message({ type: "success", message: "添加成功" });
          this.ruleForm.title = "";
          this.$emit("closeDrawer");
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
</style>