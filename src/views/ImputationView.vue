<template>
  <div id="server">
    <a-form
      ref="formRef"
      :model="form"
      :style="{ margin: '20px auto', padding: '20px 10px' }"
      auto-label-width
      @submit="handleSubmit"
    >
      <a-form-item
        field="name"
        label="Project Name"
        show-colon
        :rules="[{ required: true, message: 'name is required' }, {}]"
        :validate-trigger="['change', 'input']"
      >
        <a-input
          v-model="form.name"
          placeholder="Please enter your project name..."
        />
      </a-form-item>
      <a-form-item
        field="mode"
        label="Mode"
        show-colon
        :rules="[{ required: true, message: 'name is required' }, {}]"
      >
        <a-select
          class="select"
          v-model="form.mode"
          placeholder="Please select ..."
          allow-clear
        >
          <a-option value="imputation">Imputation</a-option>
          <a-option value="phase">Phase</a-option>
        </a-select>
      </a-form-item>
      <a-form-item
        field="referencePanel"
        label="Reference Panel"
        show-colon
        :rules="[{ required: true, message: 'name is required' }, {}]"
      >
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
      <a-form-item
        field="referenceGenome"
        label="Reference Genome"
        show-colon
        :rules="[{ required: true, message: 'name is required' }, {}]"
      >
        <a-select
          v-model="form.referenceGenome"
          placeholder="Please select ..."
          allow-clear
        >
          <a-option value="aurv2">ARS-UI_Ramb_v2.0</a-option>
          <a-option value="ov4">Oar_v4.0</a-option>
        </a-select>
      </a-form-item>
      <a-form-item
        field="files"
        label="Upload Files(vcf.gz)"
        show-colon
        :rules="[{ required: true, message: 'please upload files' }]"
      >
        <a-upload
          v-model:file-list="fileList"
          accept=".gz"
          :with-credentials="true"
          :custom-request="customRequest"
          multiple
          :on-before-upload="beforeUpload"
          :on-before-remove="beforeRemove"
        >
          <template #upload-button>
            <a-button type="primary">
              <template #icon>
                <icon-upload />
              </template>
              Click to upload
            </a-button>
          </template>
        </a-upload>
      </a-form-item>
      <a-form-item
        field="email"
        label="Your Email"
        show-colon
        :rules="[
          { required: true, message: 'email is required' },
          { type: 'email', message: 'please enter a valid email address' },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input
          v-model="form.email"
          placeholder="Please enter your email..."
        />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button html-type="submit">Submit</a-button>
          <a-button @click="handleReset">Reset</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
#server {
  margin: 20px auto;
  width: 65%;
  background: #ffffff;
}

#server .arco-form {
  width: auto;
}

>>> .arco-form-item-label-col > .arco-form-item-label,
>>> .arco-input-wrapper .arco-input.arco-input-size-medium,
>>> .arco-select-view-single.arco-select-view-size-medium
  .arco-select-view-input,
>>> .arco-select-view-single.arco-select-view-size-medium
  .arco-select-view-value,
>>> .arco-btn-size-medium {
  font-size: 18px;
}

>>> .arco-select-dropdown .arco-select-option {
  font-size: 18px;
}
</style>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  FileControllerService,
  ProjectControllerService,
} from "../../generated";
import { Message, ValidatedError } from "@arco-design/web-vue";
import { Modal } from "@arco-design/web-vue";
import { useRouter } from "vue-router";

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
  form.value.files = {};
  fileList.value = [];
};

const formRef = ref();
const fileList = ref([]);
const form = ref({
  name: "",
  mode: "",
  referencePanel: "",
  referenceGenome: "",
  files: {} as Record<string, string>,
  email: "",
});

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
    onSuccess();
    console.log(res.data);
    form.value.files[fileItem.name] = res.data;
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
        delete form.value.files[file.name];
      },
      onCancel: () => reject("cancel"),
    });

    console.log("fileName:" + file.name);
  });
};
</script>
