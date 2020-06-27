<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">后台管理系统</span>
            </div>
            <el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm" label-width="60px">
                <el-form-item label="邮箱" prop="account">
                    <el-input v-model="loginUser.account" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="submitForm('loginForm')" class="submit_btn">登  录</el-button>
                </el-form-item>
                  <div class="toregisger" @click="toregisger"><a>注册</a></div>
            </el-form>
            
        </section>
    </div>
</template>

<script>
import {Login} from '@/api/index.js'
export default {
  name: "login",
  data() {
    return {
      loginUser: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          Login(this.loginUser).then(res=>{
            console.log(res)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
    toregisger(){
      this.$router.push({name:'register'})
    }
  }
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
.toregisger{
  float:right;
  font-size: 14px;
  margin-top: -10px;
  color: #409eff;
}
</style>


