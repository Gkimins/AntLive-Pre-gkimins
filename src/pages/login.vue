<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="" class="sign-in-form">
          <h2 class="title">VoiceLive</h2>
          <h2 class="title">用户登录</h2>
          <div class="input-field">
            <i class="fa fa-user"/>
            <input
                v-model="loginForm.username"
                type="text"
                placeholder="Username"
            >
          </div>
          <div class="input-field">
            <i class="fa fa-lock"/>
            <input
                v-model="loginForm.password"
                type="password"
                placeholder="Password"
            >
          </div>
          <div class="input-field input-verify">
            <i class="fa fa-lock"/>
            <input
                type="text"
                v-model="loginForm.vcode"
                placeholder="验证码"
                @keydown.enter="userpwdLogin"
            >
            <a
                href="javascript:;"
                class="pswverifyimg"
                @click="changeCodeImg()"
            ><img
                id="codeImg"
                :src="pswverifyimg"
            ></a>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <input
                  type="button"
                  value="登 录"
                  class="btn solid"
                  @click="userpwdLogin"
              >
            </el-col>
            <el-col :span="12">
              <input
                  id="changelayouttoreg"
                  type="button"
                  value="去注册"
                  class="btn solid"
              >
            </el-col>
          </el-row>
        </form>
        <form action="" class="sign-up-form">
          <h2 class="title">用户注册</h2>
          <div class="input-field">
            <i class="fa fa-user"/>
            <input
                v-model="registerForm.username"
                type="text"
                placeholder="用户名"
            >
          </div>
          <div class="input-field">
            <i class="fa fa-lock"/>
            <input
                v-model="registerForm.password"
                type="password"
                placeholder="密码"
            >
          </div>
          <div class="input-field">
            <i class="fa fa-lock"/>
            <input
                v-model="registerForm.password_confirm"
                type="password"
                placeholder="确认密码"
            >
          </div>
          <div class="input-field">
            <i class="fa fa-envelope"/>
            <input
                v-model="registerForm.mobile"
                type="text"
                placeholder="手机号"
            >
          </div>
          <div class="input-field" v-if="isSendCode">
            <i class="fa fa-envelope"/>
            <input
                v-model="registerForm.code"
                type="text"
                placeholder="验证码"
            >
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <input
                  type="button"
                  :value="buttonDesc"
                  class="btn solid"
                  @click="getvcode"
                  :disabled="isSendCode"
              >
            </el-col>
            <el-col :span="12">
              <input v-if="isSendCode"
                     type="button"
                     value="注 册"
                     class="btn solid"
                     @click="register"
              >
            </el-col>
          </el-row>
        </form>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>还没有帐号？</h3>
            <p>用户注册</p>
            <button id="sign-up-btn" class="btn transparent">去注册噻</button>
          </div>

          <img :src="require('@/assets/img/log.svg')" class="image" alt="">
        </div>

        <div class="panel right-panel">
          <div class="content">
            <h3>已经注册啦？</h3>
            <p>快去登录呗</p>
            <button id="sign-in-btn" class="btn transparent">走喽</button>
          </div>

          <img :src="require('@/assets/img/register.svg')" class="image" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import Api from '../api'
export default {
  name:'login',
  data() {
    return {
      permissionList: [],
      roleName: '',
      loginForm: {
        username: 'admin1',
        password: 'admin1',
        vcode: '',
        vcodeId :''
      },
      // 登录表单验证规则
      loginFormRules: {
        // 验证用户名格式
        userName: [
          {required: true, message: "请输入用户名称", trigger: "blur"},
          {min: 2, max: 20, message: "用户名称长度在2到20个字符之间", trigger: "blur"}
        ],
        // 验证密码格式
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min: 6, max: 16, message: "登录密码长度在6到16个字符之间", trigger: "blur"}
        ]
      },
      sessionId: 0,
      // 以上登录


      registerForm: {
        username: "",
        nickName: "",
        password: "",
        password_confirm: "",
        mobile: "",
        phone:"",
        code: ""
      },
      pswverifyimg: 'http://127.0.0.1:9011/live/getVCode',
      show: true,
      codetoken: '',
      isSendCode: false,
      buttonDesc:'获取验证码'
    }

  },
  mounted() {
    // 切换layout
    const sign_in_btn = document.querySelector('#sign-in-btn')
    const sign_up_btn = document.querySelector('#sign-up-btn')
    const reg = document.querySelector('#changelayouttoreg')

    const container = document.querySelector('.container')

    sign_up_btn.addEventListener('click', () => {
      // this.$router.push('/register')
      container.classList.add('sign-up-mode')
    })
    reg.addEventListener('click', () => {
      // this.$router.push('/register')
      container.classList.add('sign-up-mode')
    })

    sign_in_btn.addEventListener('click', () => {
      container.classList.remove('sign-up-mode')
    })
    this.changeCodeImg()
  },
  methods: {
    changeCodeImg() {
      this.loginForm.vcodeId = new Date().valueOf()
      this.pswverifyimg = 'http://127.0.0.1:9011/live/getVCode?t=' +this.loginForm.vcodeId;
    },
    async getvcode() {
      let time = 60;
      setInterval(() => {
        time = time - 1;
        if(time === 0){
          return
        }
        this.buttonDesc = time + "s";
      }, 1000);
      store.dispatch("sendCode", this.registerForm.mobile);

      this.isSendCode = true;
    },

    /**
     * @description: 注册
     */
    async register() {
      this.registerForm.nickName = this.registerForm.username;
      this.registerForm.phone = this.registerForm.mobile;
      let userinfo = this.registerForm;
      store.dispatch("register", userinfo)
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "注册成功"
              });
              const container = document.querySelector('.container')
              container.classList.remove('sign-up-mode')
            }
          });
    },


    /**
     * @description: 登录
     */
    async userpwdLogin() {
      console.log("xs")
      var userinfo = this.loginForm;
      store.dispatch("login", userinfo).then((res) => {
            if(res.data.code == 200){
              this.$router.push("/");
            }
            this.changeCodeImg();
          }).catch((err) => {
            console.log(err)
          });
    }
  }
}
</script>

<style rel="stylesheet" lang="css" scoped>

/* google字体库 */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
input {
  font-family: "Poppins", sans-serif;
}

.phonein .el-form-item {
  margin-bottom: 20px;
}

.phonein .loginbtn {
  width: 200px;
  height: 40px;
}

.verifybtn {
  width: 100px;
  height: 40px;
  position: absolute;
  right: 0px;
  top: 0;
}

.container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  overflow: hidden;
}

.container::before {
  content: "";
  position: absolute;
  width: 2000px;
  height: 2000px;
  border-radius: 50%;
  background: linear-gradient(-45deg, #4481eb, #04befe);
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  z-index: 6;
  transition: 1.8s ease-in-out;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  left: 75%;
  /* 作用是什么 */
  transform: translate(-50%, -50%);
  width: 50%;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
  transition: 1s 0.7s ease-in-out;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 5rem;
  overflow: hidden;
  /* 难点 */
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  /* delay防止表单提前暴露 */
  transition: 0.2s 0.7s ease-in-out;
}

form.sign-in-form {
  z-index: 2;
}

form.sign-up-form {
  z-index: 1;
  opacity: 0;
}

.title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px;
}

.input-field {
  max-width: 300px;
  width: 100%;
  height: 55px;
  background-color: #f0f0f0;
  margin: 10px 0;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
}

.input-verify {
  max-width: 150px !important;
  width: 80% !important;
  position: relative;
  left: -70px;
}

.input-verify input {
  margin-top: 13px;
}

.input-verify a {
  position: relative;
  right: -180px;
  top: -32px;
  width: 100px;
  height: 40px;
}

.input-verify a img {
  width: 100%;
  height: 100%;
}

.input-field i {
  text-align: center;
  line-height: 55px;
  color: #acacac;
  font-size: 1.1rem;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.input-field select {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  width: 220px;
  color: #333;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.btn {
  width: 150px;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 49px;
  cursor: pointer;
  background-color: #5995fd;
  color: #fff;
  /* 大写 */
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  /* 动画延迟 */
  transition: 0.5s;
}

.btn:hover {
  background-color: #4d84e2;
}

.social-text {
  padding: 0.7rem 0;
  font-size: 1rem;
}

.social-media {
  display: flex;
  justify-content: center;
}

.social-icon {
  height: 40px;
  width: 40px;
  border: 1px solid #333;
  margin: 0 0.45rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-size: 1.1rem;
  border-radius: 50%;
  transition: 0.3s;
}

.social-icon:hover {
  color: #4481eb;
  border-color: #44b1eb;
}

.panels-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: center;
  justify-content: center;
  z-index: 7;
}

.panel .content {
  color: #fff;
  transition: 0.9s 0.6s ease-in-out;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.image {
  width: 100%;
  transition: 1.1s 0.4s ease-in-out;
}

.right-panel .content,
.right-panel .image {
  transform: translateX(800px);
}

.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.container.sign-up-mode .right-panel .content,
.container.sign-up-mode .right-panel .image {
  transform: translateX(0px);
}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

.container.sign-up-mode .right-panel {
  pointer-events: all;
}

.container.sign-up-mode .signin-signup {
  left: 25%;
}

.container.sign-up-mode form.sign-in-form {
  z-index: 1;
  opacity: 0;
}

.container.sign-up-mode form.sign-up-form {
  z-index: 2;
  opacity: 1;
}

@media (max-width: 870px) {
  .container {
    min-height: 800px;
    height: 100vh;
  }
  .container:before {
    width: 1500px;
    height: 1500px;
    left: 30%;
    bottom: 68%;
    transform: translateX(-50%);
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }
  .signin-signup {
    width: 100%;
    left: 50%;
    top: 85%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }
  .panels-container {
    z-index: 10;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }
  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
  }
  .image {
    width: 200px;
    transition: 0.9s 0.6s ease-in-out;
  }
  .left-panel {
    grid-row: 1 / 2;
  }
  .right-panel {
    grid-row: 3 / 4;
  }
  .panel h3 {
    font-size: 1.2rem;
  }
  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }
  .btn.btn.transparent {
    width: 110px;
    height: 35px;
    font-variation-settings: 0.7em;
  }
  .panel .content {
    padding-right: 15%;
    transition: 0.9s 0.8s ease-in-out;
  }
  .right-panel .content,
  .right-panel .image {
    transform: translateY(300px);
  }
  .container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }
  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }
  .container.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
    left: 50%;
  }
}

@media (max-width: 465px) {
  form {
    padding: 0 1.5rem;
  }
  .image {
    display: none;
  }
  .container .left-panel .content,
  .container .right-panel .content {
    margin-left: 40px;
  }
}

</style>
