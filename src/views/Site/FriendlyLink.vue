<template>
  <div>
    <div style="padding:20px 0" class="flex j-s">
      <a-button @click="visible=true" type="primary" icon="plus">添加友链</a-button>
    </div>
    <a-modal
      title="添加友链"
      :visible="visible"
      :afterClose="form.resetFields"
      :confirm-loading="confirmLoading"
      @cancel="visible=false"
      @ok="handleOk"
      cancelText="取消"
      okText="保存"
    >
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="网站名称">
          <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入姓名!' }] }]" />
        </a-form-item>
        <a-form-item label="网站地址">
          <a-input
            v-decorator="[
          'path',
          { rules: [
            { pattern:/^https?:\/\/[\w-]{0,20}\.(com|net|cn|org|top|me|xin)$/ , message:'请输入正确的网址'},
            { required: true , message: '请输入网址!' }
          ] },
        ]"
          ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-table :columns="columns" rowKey="id" :data-source="data" :pagination="false">
      <span slot="action" slot-scope="row">
        <a-button type="danger" @click="del(row.id)">删除</a-button>
      </span>
      <span slot="path" slot-scope="path">
        <a target="_blank" :href='path'>{{path}}</a>
      </span>
      <span slot="createtime" slot-scope="createtime">{{ createtime | fmtTime }}</span>
    </a-table>
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
    title: "网站名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "网站地址",
    dataIndex: "path",
    key: "path",
    scopedSlots: { customRender: "path" }
  },
  {
    title: "创建时间",
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
    this.getList();
  },
  watch: {
    pageIndex() {
      this.getList();
    }
  },
  methods: {
    handleOk() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let { data } = await this.$post("/sys/savefl", values);
          if (data.success) {
            this.$message.success("添加成功");
            this.getList();
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
          let { data } = await this.$post("/sys/removefl", { id });
          if (data.success) {
            this.$message.success("删除成功");
            this.getList();
          } else {
            this.$message.error("删除失败");
          }
        }
      });
    },
    async getList() {
      let res = await this.$get("/sys/firendslink");
      this.data = res.data;
    }
  }
};
</script>
