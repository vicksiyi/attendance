<template>
  <div class="home">
    <!-- 添加 -->
    <el-button @click="add" type="primary">添加班级</el-button>
    <!-- 现有班级 -->
    <el-table
      :data="tableData"
      height="350"
      border
      style="width: 100%; margin-top: 20px"
      v-loading="loading"
    >
      <el-table-column prop="time" label="创建日期" width="180">
      </el-table-column>
      <el-table-column prop="title" label="班级名称" width="180">
      </el-table-column>
      <el-table-column label="班级人数">
        <template slot-scope="scope">
          <el-tag type="success">{{ scope.row.num }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="课程数">
        <template slot-scope="scope">
          <el-tag type="warning">{{ scope.row.total }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="nav(scope.row.id)" type="success" size="mini"
            >进入班级</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableData.length"
    >
    </el-pagination>
    <!-- 弹窗 -->
    <el-drawer title="添加班级" :visible.sync="drawer" :direction="direction">
      <Submit @closeDrawer="closeDrawer"></Submit>
    </el-drawer>
  </div>
</template>

<script>
import Submit from "./Home/Submit";
import { get } from "@/api/class";
export default {
  name: "Home",
  components: { Submit },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      tableData: [],
      loading: false,
      page: 1,
    };
  },
  methods: {
    add() {
      this.drawer = true;
    },
    nav(id) {
      window.open(`/class?class_id=${id}`, "_blank");
    },
    closeDrawer() {
      this.drawer = false;
      this.getData();
    },
    async getData() {
      this.loading = true;
      let _result = await get();
      this.loading = false;
      if (_result.data.code != 200) {
        this.$message.error(_result.data.msg);
        return;
      }
      this.tableData = _result.data.data.map((value) => {
        value.num = 0;
        value.total = 0;
        return value;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.form {
  padding: 20px;
}
</style>
