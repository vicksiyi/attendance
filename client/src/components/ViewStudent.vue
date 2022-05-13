<template>
  <div class="view-student">
    <Echart :height="400" v-if="isChart" :chartData="chartData"></Echart>
    <h1>陈xx-考勤数据</h1>
  </div>
</template>

<script>
import Echart from "@/components/Common/Echart";
export default {
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
        name: "在线时间/分钟",
        data: [
          50, 94, 95, 64, 120, 112, 98, 119, 95, 98, 68, 95, 98, 100, 95, 98,
          100, 100,
        ],
        type: "bar",
      },
      {
        name: "是否缺勤",
        data: [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        type: "bar",
      },
    ];
    this.isChart = true;
  }
};
</script>

<style scoped>
.view-student{
    text-align: center;
}
.view-student h1{
    margin-top: 20px;
}
</style>
