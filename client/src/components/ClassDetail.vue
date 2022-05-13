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
            action="https://jsonplaceholder.typicode.com/posts/"
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
            style="width: 100%; margin-top: 20px"
          >
            <el-table-column label="序号" width="80">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="student_id" label="学号"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template>
                <!-- <el-button @click="showStudent" type="success" size="mini"
                  >数据</el-button
                > -->
                <el-button @click="delStudent" type="danger" size="mini"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination background layout="prev, pager, next" :total="10">
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
          <el-form
            :model="studentForm"
            :rules="studentRules"
            ref="studentForm"
            label-width="100px"
          >
            <el-form-item label="学生姓名">
              <el-input
                v-model="studentForm.name"
                placeholder="请输入学生姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="学生学号">
              <el-input
                v-model="studentForm.student_id"
                placeholder="请输入学生学号"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 100%" type="primary">添加</el-button>
            </el-form-item>
          </el-form>
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
export default {
  name: "ClassDetail",
  data() {
    return {
      drawer: false,
      direction: "rtl",
      students: [
        {
          name: "陈xx",
          student_id: "17124120220",
        },
        {
          name: "陈yy",
          student_id: "17124120221",
        },
        {
          name: "陈zz",
          student_id: "17124120222",
        },
      ],
      courses: [
        {
          date: "2022-05-13",
          name: "操作系统原理",
          total: 48,
        },
        {
          date: "2022-05-13",
          name: "算法与数据结构",
          total: 24,
        },
        {
          date: "2022-05-13",
          name: "软件工程",
          total: 24,
        },
      ],
      studentForm: {
        name: "",
        student_id: "",
      },
      courseForm: {
        name: "",
      },
      studentRules: {
        name: { required: true, message: "请输入学生姓名", trigger: "blur" },
        student_id: {
          required: true,
          message: "请输入学生学号",
          trigger: "blur",
        },
      },
      courseRules: {
        name: { required: true, message: "请输入课程名称", trigger: "blur" },
      },
      isStudent: true,
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
    delStudent() {},
    nav() {
      window.open("/course?class_id=xxxxxxxx&course_id=xxxxxxxxxx", "_blank");
    },
  },
  mounted() {
    document.title = "班级管理";
  }
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
