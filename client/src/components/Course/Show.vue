<template>
  <div class="show">
    <el-table height="500" :data="tableData" border style="width: 100%">
      <el-table-column prop="student_id" label="学号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="start" label="入会时间">
        <template slot-scope="scope">
          <span v-if="isEdit(scope.$index)">{{ scope.row.start }}</span>
          <div v-else>
            <el-time-picker
              placeholder="选择入会时间"
              v-model="scope.row.start"
              style="width: 100%"
            ></el-time-picker>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="退会时间">
        <template slot-scope="scope">
          <span v-if="isEdit(scope.$index)">{{ scope.row.end }}</span>
          <div v-else>
            <el-time-picker
              placeholder="选择退会时间"
              v-model="scope.row.end"
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
          <el-button type="success" @click="viewStudent" size="mini"
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
export default {
  name: "Show",
  data() {
    return {
      tableData: [
        {
          student_id: "17124120220",
          name: "陈xx",
          start: "2022-05-13 08:00:00",
          end: "2022-05-13 10:00:00",
          time: 60,
        },
        {
          student_id: "17124120221",
          name: "陈yy",
          start: "2022-05-13 08:10:00",
          end: "2022-05-13 10:10:00",
          time: 50,
        },
        {
          student_id: "17124120222",
          name: "陈zz",
          start: "2022-05-13 08:00:00",
          end: "2022-05-13 10:00:00",
          time: 60,
        },
        {
          student_id: "17124120223",
          name: "陈aa",
          start: "2022-05-13 08:10:00",
          end: "2022-05-13 10:10:00",
          time: 80,
        },
        {
          student_id: "17124120224",
          name: "陈bb",
          start: "2022-05-13 08:00:00",
          end: "2022-05-13 10:00:00",
          time: 70,
        },
        {
          student_id: "17124120225",
          name: "陈cc",
          start: "2022-05-13 08:10:00",
          end: "2022-05-13 10:10:00",
          time: 50,
        },
        {
          student_id: "17124120226",
          name: "陈dd",
          start: "2022-05-13 08:00:00",
          end: "2022-05-13 10:00:00",
          time: 50,
        },
        {
          student_id: "17124120227",
          name: "陈ee",
          start: "2022-05-13 08:10:00",
          end: "2022-05-13 10:10:00",
          time: 50,
        },
        {
          student_id: "17124120228",
          name: "陈ff",
          start: "2022-05-13 08:00:00",
          end: "2022-05-13 10:00:00",
          time: 50,
        },
      ],
      edits: [0, 3],
    };
  },
  methods: {
    viewStudent() {
      window.open(
        "/view/student?class_id=xxxxxxxx&course_id=xxxxxxx&student_id=xxxx",
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
  },
};
</script>

<style>
</style>
