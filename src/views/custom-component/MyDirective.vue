<template>
  <div class="demo">
    <h4>v-time 指令</h4>
    <span v-time="now"></span>
    <h4>v-clock 指令</h4>
    <span v-clock></span>
    <h4>v-down 指令</h4>
    <span v-down="time"></span>
  </div>
</template>
<script>
export default {
  name: "Demo",
  data() {
    return {
      time: "2019-06-12 18:30:00"
    };
  },
  computed: {
    now() {
      return Date.now();
    }
  }
};
</script>