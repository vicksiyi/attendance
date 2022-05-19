<template>
  <div class="show">
    <el-table
      v-loading="loading"
      height="500"
      :data="courses"
      border
      style="width: 100%"
    >
      <el-table-column prop="number" label="学号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="start_time" label="入会时间">
        <template slot-scope="scope">
          <span v-if="isEdit(scope.$index)">{{ scope.row.start_time }}</span>
          <div v-else>
            <el-time-picker
              placeholder="选择入会时间"
              v-model="scope.row.start_time"
              style="width: 100%"
            ></el-time-picker>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="退会时间">
        <template slot-scope="scope">
          <span v-if="isEdit(scope.$index)">{{ scope.row.end_time }}</span>
          <div v-else>
            <el-time-picker
              placeholder="选择退会时间"
              v-model="scope.row.end_time"
              style="width: 100%"
            ></el-time-picker>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="总时间">
        <template slot-scope="scope">
          <el-tag :type="scope.row.time > 50 ? 'success' : 'danger'">{{
            scope.row.time
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="isEdit(scope.$index)"
            @click="edit(scope.$index)"
            type="warning"
            size="mini"
            >编辑</el-button
          >
          <el-button
            v-else
            type="success"
            @click="save(scope.$index)"
            size="mini"
            >保存</el-button
          >
          <el-button
            type="success"
            @click="viewStudent(scope.row.student_id, scope.row.name)"
            size="mini"
            >可视化</el-button
          >
          <el-button type="warning" size="mini">确认数据</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="10">
    </el-pagination>
  </div>
</template>

<script>
import { getCourseDetail } from "@/api/course";
export default {
  name: "Show",
  props: {
    course_uuid: {
      type: String,
      default: "",
    },
    class_id: {
      type: String,
      default: "",
    },
    classroom_id: {
      type: String,
      default: "",
    },
  },
  watch: {
    course_uuid() {
      this.getData();
    },
  },
  data() {
    return {
      courses: [],
      edits: [],
      loading: false,
    };
  },
  methods: {
    viewStudent(id, name) {
      localStorage.setItem("_name", name);
      window.open(
        `/view/student?class_id=${this.class_id}&course_id=${this.classroom_id}&student_id=${id}`,
        "_blank"
      );
    },
    isEdit(index) {
      return this.edits.indexOf(index) === -1;
    },
    edit(index) {
      if (this.edits.indexOf(index) == -1) {
        this.edits.push(index);
      }
    },
    save(index) {
      this.edits.splice(this.edits.indexOf(index), 1);
    },
    async getData() {
      this.loading = true;
      let _result = await getCourseDetail(this.course_uuid);
      this.loading = false;
      if (_result.data.code != 200) {
        this.$message.error(_result.data.msg);
        return;
      }
      this.courses = _result.data.data;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>
