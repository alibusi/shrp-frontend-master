<template>
  <div id="contact">
    <a-card title="Contact Us">
      <a-typography>
        <a-typography-paragraph>
          Welcome to share your data with us and help us update the reference
          panels. Please feel free to contact us, if you have any questions or
          suggestions.
        </a-typography-paragraph>
        <a-typography-paragraph>
          西北农林科技大学，动物科技学院
        </a-typography-paragraph>
        <a-typography-paragraph>
          <ul>
            <li v-for="(contact, index) of contacts_cast" :key="index">
              <ul>
                <li>{{ contact.name }}</li>
                <li>Email: {{ contact.email }}</li>
              </ul>
            </li>
          </ul>
        </a-typography-paragraph>
        <a-typography-paragraph>
          西北农林科技大学，信息工程学院
        </a-typography-paragraph>
        <a-typography-paragraph>
          <ul>
            <li v-for="(contact, index) of contacts_cie" :key="index">
              <ul>
                <li>{{ contact.name }}</li>
                <li>Email: {{ contact.email }}</li>
              </ul>
            </li>
          </ul>
        </a-typography-paragraph>
        <a-typography-paragraph> 引用：</a-typography-paragraph>
        <a-typography-paragraph> 致谢：</a-typography-paragraph>
      </a-typography>
    </a-card>
  </div>
</template>

<style scoped>
#contact {
  margin: 20px auto;
  width: 65%;
}

#contact ul {
  list-style-type: none;
  margin-bottom: 10px;
}

#contact ul li {
  margin-left: 0;
}
</style>

<script setup lang="ts">
const contacts_cast = [
  {
    name: "Ran Li",
    email: "ran.li1986@hotmail.com",
  },
  {
    name: "Hao-Tian Wang",
    email: "15532918070@163.com",
  },
];

const contacts_cie = [
  {
    name: "Quan-Zhong Liu",
    email: "liuqzhong@nwsuaf.edu.cn",
  },
  {
    name: "Xiao-Yu Song",
    email: "373363602@qq.com",
  },
];
</script>
