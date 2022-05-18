<template>
  <el-form
    :model="studentForm"
    :rules="studentRules"
    ref="studentForm"
    label-width="100px"
  >
    <el-form-item label="学生姓名" prop="name">
      <el-input
        v-model="studentForm.name"
        placeholder="请输入学生姓名"
      ></el-input>
    </el-form-item>
    <el-form-item label="学生学号" prop="number">
      <el-input
        v-model="studentForm.number"
        placeholder="请输入学生学号"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        @click="submitForm('studentForm')"
        style="width: 100%"
        type="primary"
        >添加</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import form from "@/common/form";
import Loading from "@/common/loading";
import { addStudent } from "@/api/classroom";
export default {
  name: "SubmitStudent",
  props: {
    class_id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      studentForm: {
        name: "",
        number: "",
      },
      studentRules: {
        name: [{ required: true, message: "请输入学生姓名", trigger: "blur" }],
        number: [
          {
            required: true,
            message: "请输入学生学号",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      const loading = Loading.start(this);
      form.validate(this, formName).then(async (valid) => {
        if (valid) {
          let _result = await addStudent({
            name: this.studentForm.name,
            number: this.studentForm.number,
            class_id: this.class_id,
          });
          if (_result.data.code != 200) {
            this.$message.error(_result.data.msg);
            Loading.end(loading);
            return;
          }
          Loading.end(loading);
          this.$message({ type: "success", message: "添加成功" });
          this.studentForm.name = "";
          this.studentForm.number = "";
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