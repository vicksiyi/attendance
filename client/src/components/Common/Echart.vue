<template>
  <div :style="{ height: `${height}px` }" ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Echart",
  props: {
    height: {
      type: Number,
      default: 220,
    },
    isStudent: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          lData: [],
          series: {},
        };
      },
    },
  },
  data() {
    return {
      options: {
        legend: {
          // 图例颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
            formatter: function (value) {
              //x轴的⽂字改为竖版显⽰
              var str = value.split("");
              return str.join("\n");
            },
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [],
      },
      echart: null,
    };
  },
  watch: {
    chartData: {
      handler: function () {
        this.$nextTick(() => {
          this.initChart();
        });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    initChart() {
      this.initChartData();
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = echarts.init(this.$refs.chart); // 初始化
        this.echart.setOption(this.options); // 传入配置
      }
    },
    initChartData: function () {
      this.options.xAxis.data = this.chartData.xData;
      this.options.series = this.chartData.series;
    },
  },
};
</script>
