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
    <a-form-item field="referencePanel" label="Reference Panel" show-colon>
      <a-select
        v-model="form.referencePanel"
        placeholder="Please select ..."
        allow-clear
      >
        <a-option value="global">Global Sample Reference Panel</a-option>
        <a-option value="europe">Europe Sample Reference Panel</a-option>
        <a-option value="africa">Africa Sample Reference Panel</a-option>
        <a-option value="asia">Asia Sample Reference Panel</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="referenceGenome" label="Reference Genome" show-colon>
      <a-select
        v-model="form.referenceGenome"
        placeholder="Please select ..."
        allow-clear
      >
        <a-option value="aurv2">ARS-UI_Ramb_v2.0</a-option>
        <a-option value="ov4">Oar_v4.0</a-option>
      </a-select>
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
</template>

<style scoped>
#imputationForm {
}
</style>

<script setup lang="ts">
import { useRouter } from "vue-router";
import {
  FieldRule,
  FileItem,
  Message,
  Modal,
  ValidatedError,
} from "@arco-design/web-vue";
import {
  FileControllerService,
  ProjectAddDTO,
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
    const res = await ProjectControllerService.addUsingPost(form.value);
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
};

const formRef = ref();
const form = ref({
  projectName: "",
  mode: "imputation",
  referencePanel: "",
  referenceGenome: "",
  files: [],
  email: "",
});

const rules: Record<string, FieldRule | FieldRule[]> = {
  name: [
    {
      required: true,
      message: "name is required",
    },
  ],
  referencePanel: [
    {
      required: true,
      message: "reference panel is required",
    },
  ],
  referenceGenome: [
    {
      required: true,
      message: "reference genome is required",
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

const beforeRemove = (fileItem: FileItem) => {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: "on-before-remove",
      content: `确认删除 ${fileItem.name}`,
      onOk: () => {
        resolve(true);
      },
      onCancel: () => reject("cancel"),
    });

    console.log("fileName:" + fileItem.name);
  });
};
</script>
