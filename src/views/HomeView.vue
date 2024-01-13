<template>
  <div id="home">
    <div id="hero">
      <a-typography-title class="tagline">
        <strong class="special">S</strong>heep
        <strong class="special">H</strong>
        <span class="special-a">a</span>plotypes
        <strong class="special">R</strong>eference
        <strong class="special-p">P</strong>anel
      </a-typography-title>
      <p class="description">
        a sheep haplotype reference panel for genotype imputation
      </p>
      <a-button
        class="get-started"
        type="primary"
        status="success"
        @click="handleClick"
        >Start
      </a-button>
      <a-row class="statistics">
        <a-col :flex="1"></a-col>
        <a-col :flex="1">
          <a-statistic
            class="statistic"
            :value="1.46"
            :precision="2"
            :value-style="statisticValueStyle"
          >
            <template #title>
              <div class="statistic-title">Imputed Genomes</div>
            </template>
            <template #suffix>M</template>
          </a-statistic>
        </a-col>
        <a-col :flex="1">
          <a-statistic
            class="statistic"
            :value="24"
            :value-style="statisticValueStyle"
          >
            <template #title>
              <div class="statistic-title">Imputed Jobs</div>
            </template>
          </a-statistic>
        </a-col>
        <a-col :flex="1">
          <a-statistic
            class="statistic"
            :value="7"
            :value-style="statisticValueStyle"
          >
            <template #title>
              <div class="statistic-title">Running Jobs</div>
            </template>
          </a-statistic>
        </a-col>
        <a-col :flex="1"></a-col>
      </a-row>
    </div>
    <div id="content">
      <a-grid class="content-wrapper" :cols="2">
        <a-grid-item class="content-item">
          <a-card :bordered="false">
            <template #title>
              <div class="content-item-title">
                Sheep Haplotypes Reference Panel SHRP
              </div>
            </template>
            <a-scrollbar style="height: 400px; overflow: auto">
              <a-typography-paragraph class="content-item-text"
                >Provides a free genotype imputation service using Beagle for
                sheep. In the current version, our server offers imputation from
                the reference panel that includes:
              </a-typography-paragraph>
              <a-typography
                class="reference-panel-data"
                v-for="(item, index) of referencePanel"
                :key="index"
              >
                <a-divider />
                <a-typography-title class="content-item-title"
                  >{{ item.name }}
                </a-typography-title>
                <a-typography-paragraph class="content-item-text">
                  <ul>
                    <li>{{ item.haplotypes }} haplotypes</li>
                    <li>{{ item.breeds }} sheep breeds</li>
                    <li>{{ item.snpSites }} millon SNP sites of autosomes</li>
                  </ul>
                </a-typography-paragraph>
              </a-typography>
            </a-scrollbar>
          </a-card>
        </a-grid-item>
        <a-grid-item class="content-item">
          <a-card :bordered="false">
            <template #title>
              <div class="content-item-title">Ongoing</div>
            </template>
            <a-scrollbar style="height: 400px; overflow: auto">
              <div class="ongoing">
                <a-timeline class="custom-timeline">
                  <a-timeline-item
                    v-for="(item, index) of ongoing"
                    dot-type="hollow"
                    :label="item.lable"
                    :key="index"
                    ><span class="content-item-text">{{ item.content }}</span>
                  </a-timeline-item>
                </a-timeline>
              </div>
            </a-scrollbar>
          </a-card>
        </a-grid-item>
      </a-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  ReferencePanelControllerService,
  ReferencePanelVO,
} from "../../generated";

const router = useRouter();

const handleClick = () => {
  router.push({
    path: "/imputation",
  });
};

const statisticValueStyle: CSSProperties = {
  color: "white",
};

const referencePanel = ref<ReferencePanelVO[] | undefined>([]);

const loadData = async () => {
  const res = await ReferencePanelControllerService.listUsingGet1();
  if (res.code === 0) {
    referencePanel.value = res.data;
  }
};

onMounted(() => {
  loadData();
});

const ongoing = [
  {
    lable: "2023-06-21",
    content: "The evaluation of imputation accuracy for SHARP is done.",
  },
  {
    lable: "2023-05-10",
    content:
      "After QC, the first version of Sheep haplotype reference panel was done, including 3,125 individuals.",
  },
  {
    lable: "2023-03-22",
    content: "GATK HaplotypeCaller calls gVCF is done.",
  },
  {
    lable: "2022-12-11",
    content:
      "Remove the duplication and unmapped reads, add RG for each individual are done.",
  },
  {
    lable: "2022-11-21",
    content: "Reads QC, mapping, sort are done.",
  },
  {
    lable: "2022-11-09",
    content: "Sheep WGS data were collated and included 3125 individuals.",
  },
  {
    lable: "2022-10-16",
    content:
      "Began to collate sheep hcWGS data from the laboratory and download sheep hcWGS data from the public database.",
  },
  {
    lable: "2022-10-15",
    content: "Complete SHARP database framework design.",
  },
];
</script>

<style scoped>
#home {
}

#home #hero {
  padding: 20px 0 0;
  background: #ffffff;
  text-align: center;
}

#home #hero .tagline {
  margin-top: 0;
  font-size: 48px;
}

#home #hero .tagline .special {
  background: -webkit-linear-gradient(#efefef -75%, #000000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#home #hero .tagline .special-a {
  background: -webkit-linear-gradient(#efefef -75%, #3c67be);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#home #hero .tagline .special-p {
  background: -webkit-linear-gradient(#efefef -75%, #3c67be);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#home #hero .description {
  font-size: 24px;
}

#home #hero .get-started {
  padding: 24px 32px;
  font-size: 24px;
  font-weight: 600;
  border-radius: 8px;
}

#home #hero .statistics {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 48px 0 0;
  padding: 24px 0;
  background: #bfbfbf;
}

#home #hero .statistics .statistic {
  flex: 1;
}

#home #hero .statistics .statistic .statistic-title {
  font-size: 24px;
  color: white;
}

#home #content {
  margin: 40px auto;
  width: 80%;
}

#home .arco-card {
  margin-bottom: 40px;
}

#home #content .content-wrapper .content-item .content-item-title {
  font-size: 22px;
}

#home #content .content-wrapper .content-item .content-item-text {
  font-size: 18px;
}

#home #content .content-wrapper .content-item .reference-panel-data {
  padding-left: 20px;
}

#home #content .content-wrapper .ongoing .custom-timeline {
  padding: 10px 20px;
  background: #f5f5f5;
}

#home .ongoing .custom-timeline >>> .arco-timeline-item {
  padding-bottom: 20px;
  min-height: auto;
}

#home .ongoing .custom-timeline >>> .arco-timeline-item-label {
  font-size: 14px;
}

#home .ongoing .custom-timeline >>> .arco-timeline-item-dot {
  width: 8px;
  height: 8px;
}
</style>
