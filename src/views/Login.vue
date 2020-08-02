<template>
  <div class="flex j-c a-c" style="height:100vh">
    <div id="particles"></div>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入账号!' }] },
        ]"
          placeholder="账号"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] },
        ]"
          type="password"
          placeholder="密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: false,
          },
        ]"
        >7天内免登录</a-checkbox>
        <a-button type="primary" html-type="submit" class="login-form-button">登 录</a-button>
      </a-form-item>
    </a-form>
    <div class="copyright">&copy; Simba</div>
  </div>
</template>

<script>
import "~u/particles.js";
export default {
  mounted() {
    particlesJS(
      "particles",
      {
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#ffffff"
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            },
            polygon: {
              nb_sides: 5
            },
            image: {
              width: 100,
              height: 100
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 10,
            random: true,
            anim: {
              enable: false,
              speed: 80,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 300,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: false,
              mode: "repulse"
            },
            onclick: {
              enable: false,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 800,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 800,
              size: 80,
              duration: 2,
              opacity: 0.8,
              speed: 3
            },
            repulse: {
              distance: 400,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      },
      () => {
        console.log("初始化完成");
      }
    );
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let { userName, password, remember } = values;
          //登录成功
          if (userName === "admin" && password === "123123") {
            //cookie带7天有效期
            this.cookie.set(
              "loginuser",
              userName,
              remember ? { expires: 7 } : null
            );
            this.$message.success("登录成功!", 1, () => {
              this.$router.push("/");
            });
          } else {
            this.$message.error("用户名或密码错误,请重试!");
          }
        }
      });
    }
  }
};
</script>

<style scoped lang='scss'>
#particles {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(70, 138, 194, 0.837);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}

.login-form {
  width: 500px;
  background: #fff;
  position: relative;
  z-index: 9999;
  padding: 30px;
  border-radius: 5px;
  .login-form-button {
    width: 100%;
  }
}

.copyright {
  position: absolute;
  bottom: 50px;
  color: #eee;
}
</style>

