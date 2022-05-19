<template>
  <div v-loading="loading" class="view-course">
    <Echart :height="400" v-if="isChart" :chartData="chartData"></Echart>
    <h1>{{ classroom_name }}-考勤数据</h1>
  </div>
</template>

<script>
import { getQueryVariable } from "@/common/utils";
import Echart from "@/components/Common/Echart";
import { getCourseScale } from "@/api/course";
export default {
  name: "ViewCourse",
  components: { Echart },
  data() {
    return {
      isChart: false,
      chartData: {},
      classroom_id: -1,
      classroom_name: "",
      loading: false,
    };
  },
  methods: {
    async getCourseScale() {
      this.loading = true;
      let _result = await getCourseScale(this.classroom_id);
      this.loading = false;
      if (_result.data.code != 200) {
        this.$message.error(_result.data.msg);
        return;
      }
      this.chartData.xData = _result.data.data.map((value, index) => {
        return `${index + 1}节课`;
      });
      this.chartData.series = [
        {
          name: "出勤率/%",
          data: _result.data.data.map((value) => {
            return value.scale;
          }),
          type: "bar",
        },
        {
          name: "缺勤人数",
          data: _result.data.data.map((value) => {
            return value.absence;
          }),
          type: "bar",
        },
      ];
      this.isChart = true;
    },
  },
  mounted() {
    document.title = "课程可视化";
    this.classroom_id = getQueryVariable("classroom_id");
    this.classroom_name = localStorage.getItem("_classroom");
    this.getCourseScale();
  },
};
</script>

<style scoped>
.view-course {
  text-align: center;
}
.view-course h1 {
  margin-top: 20px;
}
</style>
