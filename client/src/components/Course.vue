<template>
  <div class="course">
    <!-- 上传课堂 -->
    <div class="top">
      <el-upload
        class="upload-demo"
        action="http://localhost:8080/api/course/data"
        name="data"
        :data="{ class_id, classroom_id }"
        :headers="headers"
        :show-file-list="false"
        :on-success="uploadSuccess"
      >
        <el-button type="primary">上传课堂</el-button>
      </el-upload>
      <el-button class="upload-btn" type="primary">导出数据</el-button>
      <el-button class="upload-btn" @click="viewCourse" type="primary"
        >可视化数据</el-button
      >
    </div>
    <!-- 显示课堂 -->
    <el-table
      v-loading="loading"
      :data="courses"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="start_time" label="开始时间" width="180">
      </el-table-column>
      <el-table-column prop="end_time" label="结束时间" width="180">
      </el-table-column>
      <el-table-column prop="name" label="课堂名称" width="180">
      </el-table-column>
      <el-table-column prop="url" label="数据链接">
        <template slot-scope="scope">
          <a :href="scope.row.url">{{scope.row.url}}</a>
        </template>
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
import { getQueryVariable } from "@/common/utils";
import Show from "@/components/Course/Show";
import { mapState } from "vuex";
import { getCourse } from "@/api/course";
export default {
  name: "Course",
  components: { Show },
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
      class_id: -1,
      classroom_id: -1,
      loading: false,
    };
  },
  methods: {
    show() {
      this.drawer = true;
    },
    viewCourse() {
      window.open("/view/course?class_id=xxxxxxxx&course_id=xxxxxxx", "_blank");
    },
    uploadSuccess(res, file) {
      if (res.code != 200) {
        this.$message.error(res.msg);
      } else {
        this.getCourse();
        this.$message({ type: "success", message: "上传成功" });
      }
    },
    async getCourse() {
      this.loading = true;
      let _result = await getCourse(this.classroom_id);
      this.loading = false;
      if (_result.data.code != 200) {
        this.$message.error(_result.data.msg);
        return;
      }
      this.courses = _result.data.data;
    },
  },
  mounted() {
    document.title = "课程管理";
    this.class_id = getQueryVariable("class_id");
    this.classroom_id = getQueryVariable("classroom_id");
    this.getCourse();
  },
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
