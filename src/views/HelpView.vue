<template>
  <div id="document">
    <a-card title="Introduction">
      <a-typography>
        <a-typography-paragraph>
          基因型填充技术是利用高密度分型的参考群体，提供连锁标记的单倍型信息，对低密度分型后的目标群体进行缺失基因型填充。（
          <a-typography-text delete>
            利用该方法可以将低密度芯片填充至高密度芯片甚至测序数据，有效的降低成本问题，同时保证较高的填充准确率。
          </a-typography-text>
          ）目前缺少公开的、高质量的、样本量大的、包含全球众多品种的绵羊单倍型参考面板。为了促进遗传变异及其在绵羊复杂性状分子机制中的作用的研究，我们开发了绵羊单倍型参考面板数据库，并在线上提供免费的基因型精确填充服务
        </a-typography-paragraph>
        <a-typography-paragraph>
          在当前版本中，提供以下内容：
        </a-typography-paragraph>
        <a-typography-paragraph bold>
          <ul>
            <li>
              四个单倍型参考面板（包括全球品种、欧洲品种、亚洲品种、非洲品种）
              包括293个绵羊品种，6250个单倍型。
            </li>
            <li>两种参考基因组（ARS-UI_Ramb_v2.0、Oar_v4.0）</li>
          </ul>
        </a-typography-paragraph>
        <a-typography-paragraph>
          We demonstrate its applicability for sheep commercial 50K SNP arrays,
          by accurately imputing 2.6 billion genotypes at a concordance rate
          value of 0.971 in 81 Large White pigs (~17X sequencing coverage).
          Overall, as a comprehensive genomic data resource with an imputation
          focus, PHARP provides a convenient platform for efficient phasing and
          imputation to facilitate genomic research of variants and their roles
          in sheep complex traits.
        </a-typography-paragraph>
      </a-typography>
    </a-card>
    <a-card title="Preparing Files">
      <a-typography>
        <a-typography-paragraph>
          1.
          服务器将根据文件名自动识别染色体并选择对应染色体的单倍型参考面板进行填充。服务器支持一次上传多个文件进行基因型。上传前请修改vcf文件的名字中含有chrN的字符（N=1..26或者all）,如果不能从上传的文件中识别染色体，服务器将使用包含所有常染色体的单倍型参考面板进行填充，这会大量增加运行的时间。
        </a-typography-paragraph>
        <a-typography-paragraph>
          2.
          服务器接受压缩后的vcf格式的SNP芯片基因型，单个文件大小要求在100M以下，如果你的文件在100M以下，直接上传即可，不需要进行处理。如果文件大于100M，在确保文件是压缩格式下，可对VCF文件进行处理以满足文件大小要求。以下是处理VCF文件以达到减小其大小的方法。
        </a-typography-paragraph>
        <a-typography-paragraph bold>
          <ul>
            <li>
              使用bcftools view -r
              提取单个染色体的vcf，分染色体进行基因型填充，我们建议分染色体进行填充，这不仅能减少文件的大小，也可以大大缩短运行的时间。
              <br />
              如 bcftools view -r chr1 xxxx.vcf.gz -Oz -o xxxx.chr1.vcf.gz
            </li>
            <li>
              使用bcftools annotate -x 删除部分信息 <br />
              如 bcftools annotate -x INFO,^FORMAT/GT,FORMAT/PL xxxx.chr1.vcf.gz
              -Oz -o xxxx.GT&PL.chr1.vcf.gz
            </li>
          </ul>
        </a-typography-paragraph>
        <a-typography-paragraph>
          注意：<br />
          服务器只接受具有A/T/C/G编码等位基因的基因型。一些程序输出由1/2/3/4编码的等位基因。如果检测到非A/T/C/G等位基因，填充服务将会终止。
        </a-typography-paragraph>
      </a-typography>
    </a-card>
  </div>
</template>

<style scoped>
#document {
  margin: 20px auto;
  width: 65%;
}

#document .arco-card {
  margin-bottom: 40px;
}
</style>

<script setup lang="ts"></script>
