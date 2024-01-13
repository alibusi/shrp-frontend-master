<template>
  <div id="jobList">
    <a-form :model="searchParams" layout="inline">
      <a-form-item
        field="projectName"
        label="ProjectName: "
        style="min-width: 240px"
      >
        <a-input
          v-model="searchParams.projectName"
          placeholder="please enter ..."
        />
      </a-form-item>
      <a-form-item field="chr" label="Chr: " style="min-width: 240px">
        <a-input v-model="searchParams.chr" placeholder="please enter ..." />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">
          <template #icon>
            <icon-search />
          </template>
          Search
        </a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :data="data"
      :pagination="{
        showTotal: true,
        showJumper: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="handlePageChange"
    >
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #completeTime="{ record }">
        {{
          record.completeTime === null
            ? ""
            : moment(record.completeTime).format("YYYY-MM-DD HH:mm:ss")
        }}
      </template>
      <template #status="{ record }">
        <a-space align="center">
          <a-tag
            v-if="record.status === 0"
            size="large"
            :style="{ minWidth: '106px' }"
          >
            <a-badge status="processing" :style="{ marginRight: '12px' }" />
            Processing
          </a-tag>
          <a-tag
            v-else-if="record.status === 1"
            size="large"
            :style="{ minWidth: '106px' }"
          >
            <a-badge status="success" :style="{ marginRight: '12px' }" />
            Success
          </a-tag>
        </a-space>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a
            :href="`http://localhost:8081//imputation/download?id=${record.id}`"
          >
            <a-button
              status="normal"
              :disabled="record.status === 0"
              :style="{ minWidth: '116px' }"
            >
              <template #icon>
                <icon-download />
              </template>
              Download
            </a-button>
          </a>
          <a-popconfirm
            content="Are you sure you want to delete?"
            @ok="deleteData(record)"
          >
            <a-button
              status="danger"
              :disabled="record.status === 0"
              :style="{ minWidth: '116px' }"
            >
              <template #icon>
                <icon-delete />
              </template>
              Delete
            </a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
#jobList {
  margin: 20px auto;
  padding: 10px;
  width: 85%;
  background: white;
}
</style>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import {
  ImputationControllerService,
  ImputationDeleteDTO,
  ImputationVO,
  ProjectControllerService,
  ProjectVO,
} from "../../generated";
import message from "@arco-design/web-vue/es/message";
import moment from "moment";
import { Message, Modal } from "@arco-design/web-vue";
import axios from "axios";
import { saveAs } from "file-saver";

const columns = [
  {
    title: "ProjectName",
    dataIndex: "projectVO.name",
  },
  {
    title: "Chr",
    dataIndex: "chr",
  },
  {
    title: "CreateTime",
    slotName: "createTime",
  },
  {
    title: "CompleteTime",
    slotName: "completeTime",
  },
  {
    title: "Status",
    slotName: "status",
  },
  {
    title: "Optional",
    slotName: "optional",
  },
];

const handlePageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const eventSource = ref<EventSource | null>(null);

const data = ref([]);
const total = ref(0);
const searchParams = ref({
  projectName: "",
  chr: "",
  pageSize: 10,
  current: 1,
});

const downloadProgress = ref(0);

const loadData = async () => {
  const res = await ImputationControllerService.listUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    data.value = res.data.records;
    total.value = res.data.total;
  } else {
    Message.error("加载失败." + res.message);
  }
};

const downloadData = async (id: number) => {
  const blob = await ImputationControllerService.downloadUsingGet(id, "blob");
  // saveAs(blob, "fileName.zip");
};
const deleteData = async (item: ImputationDeleteDTO) => {
  console.log(item);
  const res = await ImputationControllerService.deleteUsingPost({
    id: item.id,
  });
  if (res.code === 0) {
    Message.success("删除成功");
    await loadData();
  } else {
    Message.error("删除失败");
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  // 在组件加载时，初始化 SSE 连接
  eventSource.value = new EventSource("http://localhost:8081/sse/stream");

  // 监听消息事件
  eventSource.value.onmessage = (event: MessageEvent) => {
    console.log("New message:", event.data);
    loadData();
  };

  // 监听错误事件
  eventSource.value.onerror = (error: Event) => {
    console.error("SSE error:", error);
    // 在这里可以处理错误情况，例如尝试重新连接
  };
  loadData();
});

onUnmounted(() => {
  // 在组件卸载时，关闭 SSE 连接
  if (eventSource.value) {
    eventSource.value.close();
  }
});

/**
 * 确认搜索，重新加载数据
 */
const handleSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>
