<template>
  <div id="server">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1">
        <template #title>
          <div class="tab-header">Imputation</div>
        </template>
        <ImputationForm />
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #title>
          <div class="tab-header">Phase</div>
        </template>
        <PhaseForm />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped>
#server {
  margin: 20px auto;
  width: 65%;
  background: #ffffff;
}

#server .tab-header {
  padding: 10px 20px;
  font-size: 32px;
  //transition: background-color 0.3s ease;
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
import ImputationForm from "@/components/ImputationForm.vue";
import PhaseForm from "@/components/PhaseForm.vue";
</script>
