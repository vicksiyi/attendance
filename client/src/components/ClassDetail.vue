<template>
  <div class="class-detail">
    <el-row :gutter="20">
      <!-- 学生管理 -->
      <el-col :span="12">
        <!-- 添加学生，导入学生 -->
        <h1>学生管理</h1>
        <div class="student">
          <el-button @click="addStudent" type="primary">手动添加</el-button>
          <el-upload
            class="upload-demo"
            action="http://localhost:8080/api/classroom/importStudent"
            name="data"
            :data="{ class_id }"
            :headers="headers"
            :show-file-list="false"
            :on-success="uploadSuccess"
          >
            <el-button class="upload-btn" type="primary">一键导入</el-button>
          </el-upload>
          <!-- <el-button class="upload-btn" type="primary">导出数据</el-button> -->
        </div>
        <el-card>
          <el-table
            :data="students"
            height="350"
            border
            v-loading="loadingStudent"
            style="width: 100%; margin-top: 20px"
          >
            <el-table-column label="序号" width="80">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="number" label="学号"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button
                  @click="delStudent(scope.row.id)"
                  type="danger"
                  size="mini"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="students.length"
          >
          </el-pagination>
        </el-card>
      </el-col>
      <!-- 课程管理 -->
      <el-col :span="12">
        <!-- 添加学生，导入学生 -->
        <h1>课程管理</h1>
        <el-button @click="addCourse" class="btn" type="primary"
          >添加课程</el-button
        >
        <el-card>
          <el-table
            :data="courses"
            height="350"
            border
            style="width: 100%; margin-top: 20px"
          >
            <el-table-column label="序号" width="80">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="date" label="创建时间" width="180">
            </el-table-column>
            <el-table-column prop="name" label="名称"> </el-table-column>
            <el-table-column label="课堂数">
              <template slot-scope="scope">
                <el-tag type="warning">{{ scope.row.total }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template>
                <el-button @click="nav" type="success" size="mini"
                  >进入课程</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination background layout="prev, pager, next" :total="10">
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>
    <!-- 抽屉 -->
    <el-drawer
      :title="isStudent ? '添加学生' : '添加课程'"
      :visible.sync="drawer"
      :direction="direction"
    >
      <div class="drawer">
        <div v-if="isStudent">
          <SubmitStudent
            :class_id="class_id"
            @closeDrawer="studentClose"
          ></SubmitStudent>
        </div>
        <div v-else>
          <el-form
            :model="courseForm"
            :rules="courseRules"
            ref="courseForm"
            label-width="100px"
          >
            <el-form-item label="课程名称">
              <el-input
                v-model="courseForm.name"
                placeholder="请输入课程名称"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 100%" type="primary">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getQueryVariable } from "@/common/utils";
import { getStudent, delStudent } from "@/api/classroom";
import { mapState } from "vuex";
import SubmitStudent from "./ClassDetail/SubmitStudent";
export default {
  name: "ClassDetail",
  components: { SubmitStudent },
  computed: {
    ...mapState({
      token: (state) => state.header.token,
    }),
    headers() {
      return {
        Authorization: this.token,
      };
    },
  },
  data() {
    return {
      class_id: -1,
      drawer: false,
      direction: "rtl",
      students: [],
      courses: [],
      courseForm: {
        name: "",
      },
      courseRules: {
        name: { required: true, message: "请输入课程名称", trigger: "blur" },
      },
      isStudent: true,
      loadingStudent: false,
    };
  },
  methods: {
    addStudent() {
      this.drawer = true;
      this.isStudent = true;
    },
    addCourse() {
      this.drawer = true;
      this.isStudent = false;
    },
    async getStudent() {
      this.loadingStudent = true;
      let _result = await getStudent(this.class_id);
      this.loadingStudent = false;
      if (_result.data.code != 200) {
        this.$message.error(_result.data.msg);
        return;
      }
      this.students = _result.data.data;
    },
    async delStudent(id) {
      this.loadingStudent = true;
      let _result = await delStudent(id);
      this.loadingStudent = false;
      if (_result.data.code != 200) {
        this.$message.error(_result.data.msg);
        return;
      }
      this.getStudent();
      this.$message({ type: "success", message: "删除成功" });
    },
    nav() {
      window.open("/course?class_id=xxxxxxxx&course_id=xxxxxxxxxx", "_blank");
    },
    uploadSuccess(res, file) {
      if (res.code != 200) {
        this.$message.error(res.msg);
      } else {
        this.getStudent();
        this.$message({ type: "success", message: "上传成功" });
      }
    },
    studentClose() {
      this.drawer = false;
      this.getStudent();
    },
  },
  mounted() {
    document.title = "班级管理";
    this.class_id = getQueryVariable("class_id");
    this.getStudent();
  },
};
</script>

<style scoped>
.class-detail h1 {
  text-align: center;
}
.btn,
.student {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
}

.student .upload-btn {
  margin-left: 10px;
}

.drawer {
  padding: 20px;
}
</style>
