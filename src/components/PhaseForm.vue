<template>
  <a-form
    ref="formRef"
    :model="form"
    :style="{ margin: '20px auto', padding: '20px 10px' }"
    :rules="rules"
    auto-label-width
    @submit="handleSubmit"
  >
    <a-form-item
      field="name"
      label="Project Name"
      show-colon
      :validate-trigger="['change', 'input']"
    >
      <a-input
        v-model="form.name"
        placeholder="Please enter your project name..."
      />
    </a-form-item>
    <a-form-item field="files" label="Upload Files(vcf.gz)" show-colon>
      <a-upload
        v-model:file-list="form.files"
        accept=".gz"
        :with-credentials="true"
        :custom-request="customRequest"
        multiple
        :on-before-upload="beforeUpload"
        :on-before-remove="beforeRemove"
      >
      </a-upload>
    </a-form-item>
    <a-form-item
      field="email"
      label="Your Email"
      show-colon
      :validate-trigger="['change', 'input']"
    >
      <a-input v-model="form.email" placeholder="Please enter your email..." />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button html-type="submit">Submit</a-button>
        <a-button @click="handleReset">Reset</a-button>
      </a-space>
    </a-form-item>
  </a-form>
  {{ form }}
</template>

<style scoped>
#imputationForm {
}
</style>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Message, Modal, ValidatedError } from "@arco-design/web-vue";
import {
  FileControllerService,
  ProjectControllerService,
} from "../../generated";
import { ref } from "vue";

const router = useRouter();

const handleSubmit = async ({
  values,
  errors,
}: {
  values: Record<string, any>;
  errors: Record<string, ValidatedError> | undefined;
}) => {
  console.log("values:", values, "\nerrors:", errors);
  if (errors === undefined) {
    values.files = values.files.map((item: any) => item.response);
    const res = await ProjectControllerService.addUsingPost(values);
    if (res.code === 0) {
      Message.success("提交成功");
      console.log(res.data);
      await handleReset();
      router.push({
        path: "/jobList",
        replace: true,
      });
    } else {
      Message.error("提交失败" + res.message);
    }
  }
};

const handleReset = async () => {
  formRef.value.resetFields();
  // form.value.files = {};
};

const formRef = ref();
// const form = ref({
//   name: "",
//   mode: "phase",
//   files: {} as Record<string, string>,
//   email: "",
// });

const form = ref({
  name: "",
  mode: "phase",
  files: [],
  email: "",
});

const rules = {
  name: [
    {
      required: true,
      message: "name is required",
    },
  ],
  email: [
    { required: true, message: "email is required" },
    { type: "email", message: "please enter a valid email address" },
  ],
};

const customRequest = async (option: {
  onProgress: any;
  onError: any;
  onSuccess: any;
  fileItem: any;
  name: any;
}) => {
  const { onProgress, onError, onSuccess, fileItem, name } = option;
  console.log("name: " + name);
  const sessionId = localStorage.getItem("sessionId");
  console.log("session: " + sessionId);
  const res = await FileControllerService.uploadUsingPost(
    fileItem.file,
    localStorage.getItem("sessionId"),
    (progressEvent) => {
      onProgress(progressEvent.progress);
    }
  );
  if (res.code === 0) {
    onSuccess(res.data);
    console.log("res.data: " + res.data);
  } else {
    onError();
    Message.error("上传失败" + res.message);
  }
};

const beforeUpload = (file: File) => {
  return new Promise((resolve, reject) => {
    // 自定义校验文件名的函数
    const regExp = /chr(1[0-9]|2[0-6]|[1-9])/;

    // 检查文件名是否有效
    if (!regExp.test(file.name)) {
      // 如果文件名不合法，直接拒绝上传，并给出提示
      Modal.error({
        title: "Invalid file name",
        content: `文件名 "${file.name}" 不符合要求。`,
      });
      reject("Invalid file name");
      return;
    }

    console.log("fileName:" + file.name);
    resolve(true);
  });
};

const beforeRemove = (file: File) => {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: "on-before-remove",
      content: `确认删除 ${file.name}`,
      onOk: () => {
        resolve(true);
      },
      onCancel: () => reject("cancel"),
    });

    console.log("fileName:" + file.name);
  });
};
</script>
