<template>
  <div id="app">
    <a-config-provider :locale="enUS">
      <BasicLayout />
    </a-config-provider>
  </div>
</template>

<style></style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { SessionIdControllerService } from "../generated/services/SessionIdControllerService";
import { onMounted, ref } from "vue";
import enUS from "@arco-design/web-vue/es/locale/lang/en-us";

const sessionId = ref("");
onMounted(async () => {
  const res = await SessionIdControllerService.generateSessionIdUsingGet();
  if (res.code === 0) {
    sessionId.value = res.data;
    console.log("sessionId" + sessionId.value);
    localStorage.setItem("sessionId", sessionId.value); // 将session id 存储在localStorage中
  }
});
</script>
