<template>
  <div class="course">
    <!-- 上传课堂 -->
    <div class="top">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
      >
        <el-button type="primary">上传课堂</el-button>
      </el-upload>
      <el-button class="upload-btn" type="primary">导出数据</el-button>
      <el-button class="upload-btn" @click="viewCourse" type="primary"
        >可视化数据</el-button
      >
    </div>
    <!-- 显示课堂 -->
    <el-table :data="details" border style="width: 100%; margin-top: 20px">
      <el-table-column prop="start" label="开始时间" width="180">
      </el-table-column>
      <el-table-column prop="end" label="结束时间" width="180">
      </el-table-column>
      <el-table-column prop="name" label="课堂名称" width="180">
      </el-table-column>
      <el-table-column prop="url" label="数据链接">
        <a href="">https://localhost/zh-CN/component/color.xlsx</a>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="180">
        <el-button type="success" @click="show" size="mini">查看</el-button>
        <el-button type="danger" size="mini">删除</el-button>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="10">
    </el-pagination>
    <!-- 抽屉 -->
    <el-drawer
      title="第一章 函数与极限-课堂数据"
      :visible.sync="drawer"
      :direction="direction"
      size="100%"
    >
      <Show></Show>
    </el-drawer>
  </div>
</template>

<script>
import Show from "@/components/Course/Show";
export default {
  name: "Course",
  components: { Show },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      details: [
        {
          start: "2022-03-13 08:00:00",
          end: "2022-03-13 09:40:00",
          name: "第一章 函数与极限",
          url: "",
        },
        {
          start: "2022-03-13 08:00:00",
          end: "2022-03-13 09:40:00",
          name: "第二章 导数与微分",
          url: "",
        },
        {
          start: "2022-03-13 08:00:00",
          end: "2022-03-13 09:40:00",
          name: "第三章 微分中值定理与导数应用",
          url: "",
        },
        {
          start: "2022-03-13 08:00:00",
          end: "2022-03-13 09:40:00",
          name: "第四章 不定积分",
          url: "",
        },
      ],
    };
  },
  methods: {
    show() {
      this.drawer = true;
    },
    viewCourse() {
      window.open("/view/course?class_id=xxxxxxxx&course_id=xxxxxxx", "_blank");
    },
  },
  mounted() {
    document.title = "课程管理";
  }
};
</script>

<style>
a {
  color: #409eff;
}
.top {
  display: flex;
  flex-direction: row;
}
.upload-btn {
  margin-left: 10px;
}
</style>
