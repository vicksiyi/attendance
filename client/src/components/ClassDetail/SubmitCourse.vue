<template>
  <el-form
    :model="courseForm"
    :rules="courseRules"
    ref="courseForm"
    label-width="100px"
  >
    <el-form-item label="课程名称">
      <el-input
        v-model="courseForm.title"
        placeholder="请输入课程名称"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        @click="submitForm('courseForm')"
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
import { addCourse } from "@/api/classroom";
export default {
  name: "SubmitCourse",
  props: {
    class_id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      courseForm: {
        title: "",
      },
      courseRules: {
        title: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      const loading = Loading.start(this);
      form.validate(this, formName).then(async (valid) => {
        if (valid) {
          let _result = await addCourse({
            title: this.courseForm.title,
            class_id: this.class_id,
          });
          if (_result.data.code != 200) {
            this.$message.error(_result.data.msg);
            Loading.end(loading);
            return;
          }
          Loading.end(loading);
          this.$message({ type: "success", message: "添加成功" });
          this.courseForm.name = "";
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