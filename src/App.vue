<template>
  <div id="app" @mouseover="OperatingWebsite()">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      currentTime: new Date().getTime() 
    };
  },
  methods: {
    OperatingWebsite() {
      let currentTime = this.currentTime;
      // console.log(currentTime, "currentTime");
      let lastTime = new Date().getTime();
      let timeOut = 120 * 60 * 1000; //设置时间 2小时
      // console.log(lastTime - currentTime, "lastTime",timeOut );
      if (lastTime - currentTime > timeOut) {
        // 未操作页面，跳转登录页面
        this.currentTime = new Date().getTime(); 
        this.$router.push({
          path: "/login",
        });
        this.$message.error("登录过期，请重新登录")
      } else {
        this.currentTime = new Date().getTime(); 
      }
 
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,body,#app {
  
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background:#EDF0F4;
}
      
</style>
