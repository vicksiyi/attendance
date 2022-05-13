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
    >
      <el-table-column prop="date" label="创建日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="班级名称" width="180">
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
        <template>
          <el-button @click="nav" type="success" size="mini"
            >进入班级</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="10">
    </el-pagination>
    <!-- 弹窗 -->
    <el-drawer title="添加班级" :visible.sync="drawer" :direction="direction">
      <div class="form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="班级名称">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      drawer: false,
      direction: "rtl",
      tableData: [
        {
          date: "2022-05-13",
          name: "信息与计算科学",
          num: 79,
          total: 3,
        },
        {
          date: "2022-05-13",
          name: "计算机科学与技术",
          num: 90,
          total: 3,
        },
        {
          date: "2022-05-13",
          name: "材料工程",
          num: 69,
          total: 3,
        },
      ],
      ruleForm: {
        name: "",
      },
      rules: {
        name: [{ required: true, message: "请输入班级名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    add() {
      this.drawer = true;
    },
    nav() {
      window.open('/class?class_id=xxxxxxxx', "_blank");
    },
  },
};
</script>

<style scoped>
.form {
  padding: 20px;
}
</style>
