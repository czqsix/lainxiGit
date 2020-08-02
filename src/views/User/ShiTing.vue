<template>
  <div>
    <div style="padding:20px 0" class="flex j-s">
      <a-button @click="visible=true" type="primary" icon="plus">添加试听</a-button>
      <a-button @click="export2Excel"  icon="file-excel">导出Excel</a-button>
    </div>
    <a-modal
      title="添加试听"
      :afterClose="form.resetFields"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @cancel="visible=false"
      @ok="handleOk"
      cancelText="取消"
      okText="保存"
    >
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="姓名">
          <a-input v-decorator="['realname', { rules: [{ required: true, message: '请输入姓名!' }] }]" />
        </a-form-item>
        <a-form-item label="电话">
          <a-input
            v-decorator="[
          'tel',
          { rules: [
            { pattern:/1\d{10}/ , message:'请输入正确的11位手机号码'},
            { required: true , message: '请输入电话!' }
          ] },
        ]"
          ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-table :columns="columns" rowKey="id" :data-source="data" :pagination="false">
      <span slot="action" slot-scope="row">
        <a-button>发送确认短信</a-button>
        <a-divider type="vertical" />
        <a-button type="danger" @click="del(row.id)">删除</a-button>
      </span>
      <span slot="createtime" slot-scope="createtime">{{ createtime | fmtTime }}</span>
    </a-table>
    <div class="flex j-c a-c" style="padding:20px">
      <a-pagination v-model="pageIndex" :total="totalCount" :defaultPageSize="5" show-less-items />
    </div>
  </div>
</template>
<script>
import "simba-awesome-js";

const columns = [
  {
    title: "编号",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "姓名",
    dataIndex: "realname",
    key: "realname"
  },
  {
    title: "联系方式",
    dataIndex: "tel",
    key: "tel"
  },
  {
    title: "登记时间",
    key: "createtime",
    dataIndex: "createtime",
    scopedSlots: { customRender: "createtime" }
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
import { export_json_to_excel } from "@/plugin/utils/Export2Excel";
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },

  data() {
    return {
      data: [],
      visible: false,
      confirmLoading: false,
      columns,
      pageIndex: 1,
      totalCount: 0
    };
  },
  created() {
    this.getTotalCount();
    this.getList();
  },
  watch: {
    pageIndex() {
      this.getList();
    }
  },
  methods: {
    export2Excel() {
      const tHeader = ["编号", "姓名", "联系方式", "登记时间"];
      const filterVal = ["id", "realname", "tel", "createtime"];

      let data = this.data.map(row => {
        return filterVal.map(k => {
          //将时间格式化为正常文本
          if (k === "createtime") return new Date(row[k]).getFormatText();
          else return row[k];
        });
      });

      // let arr = [];
      // this.data.forEach(row => {
      //   let rowarr = [];
      //   filterVal.forEach(key => {
      //     rowarr.push(row[key]);
      //   });
      //   arr.push(rowarr);
      // });

      export_json_to_excel({
        header: tHeader,
        data,
        filename: "试听列表" + new Date().getFormatText(),
        autoWidth: true,
        bookType: "xlsx"
      });
    },
    handleOk() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let { data } = await this.$post("/sys/order", values);
          if (data.success) {
            this.$message.success("添加成功");
            this.getList();
            this.getTotalCount();
          } else {
            this.$message.error("添加失败");
          }
          this.visible = false;
        }
      });
    },
    del(id) {
      this.$confirm({
        title: "系统提示",
        content: "数据删除后无法恢复，确定删除?",
        okText: "确认",
        cancelText: "取消",
        onOk: async () => {
          let { data } = await this.$post("/sys/removest", { id });
          if (data.success) {
            this.$message.success("删除成功");
            this.getList();
            this.getTotalCount();
          } else {
            this.$message.error("删除失败");
          }
        }
      });
    },
    async getTotalCount() {
      let res = await this.$get("/sys/shitingcount");
      this.totalCount = res.data.count;
    },
    async getList() {
      let res = await this.$get("/sys/shitinglist", {
        pageIndex: this.pageIndex,
        pageSize: 5
      });
      if (res.data.length) this.data = res.data;
      else {
        if (this.pageIndex > 1) this.pageIndex--;
      }
    }
  }
};
</script>
