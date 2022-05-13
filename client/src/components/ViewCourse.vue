<template>
  <div class="view-course">
    <Echart
      :height="400"
      v-if="isChart"
      :chartData="chartData"
    ></Echart>
    <h1>高等数学(一)-考勤数据</h1>
  </div>
</template>

<script>
import Echart from "@/components/Common/Echart";
export default {
  name: "ViewCourse",
  components: { Echart },
  data() {
    return {
      isChart: false,
      chartData: {},
    };
  },
  mounted() {
    document.title = "课程可视化";
    this.chartData.xData = [
      "第一节课",
      "第二节课",
      "第三节课",
      "第四节课",
      "第五节课",
      "第六节课",
      "第七节课",
      "第八节课",
      "第九节课",
      "第十节课",
      "第十一节课",
      "第十二节课",
      "第十三节课",
      "第十四节课",
      "第十五节课",
      "第十六节课",
      "第十七节课",
      "第十八节课",
    ];
    this.chartData.series = [
      {
        name: "出勤率/%",
        data: [
          80, 100, 95, 98, 100, 95, 98, 100, 95, 98, 100, 95, 98, 100, 95, 98,
          100, 100,
        ],
        type: "bar",
      },
      {
        name: "缺勤人数",
        data: [5, 0, 2, 1, 0, 2, 1, 0, 2, 3, 2, 4, 1, 0, 2, 2, 5, 3],
        type: "bar",
      },
    ];
    this.isChart = true;
  }
};
</script>

<style scoped>
.view-course{
    text-align: center;
}
.view-course h1{
    margin-top: 20px;
}
</style>
