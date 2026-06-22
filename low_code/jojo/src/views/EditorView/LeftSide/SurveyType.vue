<template>
  <div>
    <div class="survey-type-container">
      <SurveyComGroup
        v-for="(item, index) in SurveyComsList"
        :key="index"
        v-bind="item"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SurveyComGroup from '@/components/Editor/SurveyComGroup.vue';
import { SurveyComsList } from '@/configs/SurveyGroupConfig';

// 组件名
defineOptions({
  name: 'SurveyType',
});
</script>

<style scoped lang="scss">
.survey-type-container {
  height: calc(100vh - 50px - 40px);
  overflow: hidden;
}
</style>
