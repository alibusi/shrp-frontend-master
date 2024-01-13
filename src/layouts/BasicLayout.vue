<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <span>Copyright&nbsp;&copy;2021.</span>
        <a href="https://dkxy.nwafu.edu.cn/" style="color: black"
          >College of Animal Science and Technology,</a
        >
        <a href="https://www.nwafu.edu.cn/" style="color: black"
          >Northwest A&F University,</a
        >
        <span>China.</span>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout {
  font-family: Microsoft Sans Serif, serif;
  //font-family: "YaHeiMonacoHybrid", sans-serif;
}

#basicLayout .header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

#basicLayout .content {
  background: #f5f5f5;
  //padding: 16px 50px;
}

#basicLayout .footer {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: #efefef;
  padding: 16px;
  text-align: center;
  font-size: 14px;
}
</style>
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
