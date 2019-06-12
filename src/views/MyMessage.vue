<template>
    <div class="con">
        <button @click="show('success')" class="msg-btn">success</button>
        <button @click="show('info')" class="msg-btn">info</button>
        <button @click="show('warning')" class="msg-btn">warning</button>
        <button @click="show('error')" class="msg-btn">error</button>
        <button @click="show('hello')" class="msg-btn">hello</button>
    </div>
</template>

<script>
export default {
  methods: {
    show(type) {
      if(type === "success"){
          this.$message.success(type);
      }else if(type === "info") {
          this.$message.info(type);
      }else if(type === "warning"){
          this.$message.warning(type);
      }else if(type === "error"){
          this.$message.error(type);
      } else {
          this.$message(type);
      }

    }
  }
};
</script>

<style>

.con {
    display: flex;
    flex-direction: row;
    height: 100px;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.msg-btn {
    width: 80px;
    height: 40px;
    margin: auto 10px;
    background-color: aquamarine;
    border-radius: 3px;
    border-color: aquamarine;
    box-shadow: 0 0 15px 1px rgba(0, 0, 0,0.4)
}
</style>