<template>
  <div class="view-student" v-loading="loading">
    <Echart :height="500" v-if="isChart" :chartData="chartData"></Echart>
    <h1>{{student_name}}-考勤数据</h1>
  </div>
</template>

<script>
import { getQueryVariable } from "@/common/utils";
import Echart from "@/components/Common/Echart";
import { getStudentCourse } from "@/api/course";
export default {
  components: { Echart },
  data() {
    return {
      isChart: false,
      chartData: {},
      class_id: 0,
      classroom_id: 0,
      student_id: 0,
      loading: false,
      student_name: "",
    };
  },
  methods: {
    async getData() {
      this.loading = true;
      let _result = await getStudentCourse(this.student_id, this.classroom_id);
      this.loading = false;
      if (_result.data.code != 200) {
        this.$message.error(_result.data.msg);
        return;
      }
      this.chartData.xData = _result.data.data.map((value) => {
        return value.start_time.split(" ")[0];
      });
      console.log(this.chartData.xData);
      this.chartData.series = [
        {
          name: "在线时间/分钟",
          data: _result.data.data.map((value) => {
            return value.time;
          }),
          type: "bar",
        },
        {
          name: "是否缺勤",
          data: _result.data.data.map((value) => {
            console.log(value.end_time);
            return value.time < 30 ? 1 : 0;
          }),
          type: "bar",
        },
      ];
      console.log(this.chartData.series);
      this.isChart = true;
    },
  },
  mounted() {
    document.title = "课程可视化";
    this.class_id = getQueryVariable("class_id");
    this.classroom_id = getQueryVariable("course_id");
    this.student_id = getQueryVariable("student_id");
    this.student_name = getQueryVariable("student_name");
    this.getData();
  },
};
</script>

<style scoped>
.view-student {
  text-align: center;
}
.view-student h1 {
  margin-top: 20px;
}
</style>
