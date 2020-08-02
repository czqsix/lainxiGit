<template>
  <a-layout class="layout">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">{{collapsed?'KGC':"KGC门户管理系统"}}</div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['工作平台']">
        <a-menu-item key="工作平台">
          <router-link to="/">
            <a-icon type="home" />
            <span>工作平台</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu key="用户管理">
          <span slot="title">
            <a-icon type="team" />
            <span>用户管理</span>
          </span>
          <a-menu-item key="/shiting">
            <router-link to="/shiting">试听管理</router-link>
          </a-menu-item>
          <a-menu-item key="/jiangshi">
            <router-link to="/jiangshi">讲师管理</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="内容管理">
          <span slot="title">
            <a-icon type="snippets" />
            <span>内容管理</span>
          </span>
          <a-menu-item key="/menu">
            <router-link to="/menu">导航菜单</router-link>
          </a-menu-item>
          <a-menu-item key="/course">
            <router-link to="/course">课程栏目</router-link>
          </a-menu-item>
          <a-menu-item key="/article">
            <router-link to="/article">文章管理</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="网站管理">
          <span slot="title">
            <a-icon type="setting" />
            <span>网站管理</span>
          </span>
          <a-menu-item key="/friendlylink">
            <router-link to="/friendlylink">友情链接</router-link>
          </a-menu-item>
          <a-menu-item key="/siteinfo">
            <router-link to="/siteinfo">网站信息</router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header flex j-s a-c" style>
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />

        <a-dropdown style="margin-right:30px">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            <a-icon type="user" />
            <span style="padding:0 5px">{{loginUser}}</span>
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a-icon type="sliders" />修改密码
            </a-menu-item>
            <a-menu-item @click="logout">
              <a-icon type="logout" />注销登录
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>用户管理</a-breadcrumb-item>
          <a-breadcrumb-item>试听管理</a-breadcrumb-item>
        </a-breadcrumb>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    logout() {
      this.cookie.remove("loginuser");
      this.$router.push("/login");
    }
  },
  computed: {
    loginUser() {
      return this.cookie.get("loginuser");
    }
  }
};
</script>
<style lang='scss'>
.layout {
  height: 100vh;

  .header {
    background: #fff;
    padding: 0px;
  }

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    text-align: center;
    line-height: 32px;
    letter-spacing: 2px;
    margin: 16px;
    overflow: hidden;
  }
}
</style>
