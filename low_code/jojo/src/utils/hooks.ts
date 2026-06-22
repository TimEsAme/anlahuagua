import { isSurveyComName, type Status } from '@/types';
import { computed } from 'vue';

export function useSurveyNum(coms: Status[]) {
  return computed(() => {
    let que = 1;
    return coms.map((com) => {
      if (isSurveyComName(com.name)) {
        return que++;
      }
      return null;
    });
  });
}
