<template>
  <div id="globalHeader">
    <a-menu
      class="menu-demo"
      mode="horizontal"
      :selected-keys="selectedKeys"
      @menu-item-click="doMenuItemClick"
    >
      <a-menu-item
        key="0"
        :style="{ padding: 0, marginRight: '500px' }"
        disabled
      >
        <img src="../assets/logo.png" style="width: 200px" />
      </a-menu-item>
      <a-menu-item
        style="font-size: 20px"
        v-for="item in routes"
        :key="item.path"
        >{{ item.name }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuItemClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
#globalHeader {
  font-family: "Dengl", sans-serif;
}

.menu-demo {
  box-sizing: border-box;
  width: 100%;
  //padding: 10px;
}
</style>
