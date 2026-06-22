import { useMaterialStore } from '@/stores/useMaterial';
import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/materials',
      name: 'materials',
      component: () => import('@/views/MaterialsView/index.vue'),
      redirect: '/materials/select-group',
      children: [
        {
          path: 'select-group',
          name: 'select-group',
          component: () => import('@/views/MaterialsView/SelectGroupView.vue'),
          redirect: '/materials/select-group/single-select',
          children: [
            {
              path: 'single-select',
              name: 'single-select',
              component: () =>
                import('@/components/surveyComs/Materials/SelectComs/SingleSelect.vue'),
            },
            {
              path: 'multiple-select',
              name: 'multiple-select',
              component: () =>
                import('@/components/surveyComs/Materials/SelectComs/MultiSelect.vue'),
            },
            {
              path: 'option-select',
              name: 'option-select',
              component: () =>
                import('@/components/surveyComs/Materials/SelectComs/OptionSelect.vue'),
            },
            {
              path: 'single-pic-select',
              name: 'single-pic-select',
              component: () =>
                import('@/components/surveyComs/Materials/SelectComs/SinglePicSelect.vue'),
            },
            {
              path: 'multi-pic-select',
              name: 'multi-pic-select',
              component: () =>
                import('@/components/surveyComs/Materials/SelectComs/MultiPicSelect.vue'),
            },
          ],
        },
        {
          path: 'input-group',
          name: 'input-group',
          component: () => import('@/views/MaterialsView/InputGroupView.vue'),
          redirect: '/materials/input-group/text-input',
          children: [
            {
              path: 'text-input',
              name: 'text-input',
              component: () => import('@/components/surveyComs/Materials/InputComs/TextInput.vue'),
            },
          ],
        },
        {
          path: 'advanced-group',
          name: 'advanced-group',
          component: () => import('@/views/MaterialsView/AdvancedGroupView.vue'),
          redirect: '/materials/advanced-group/rate-score',
          children: [
            {
              path: 'rate-score',
              name: 'rate-score',
              component: () =>
                import('@/components/surveyComs/Materials/AdvancedComs/RateScore.vue'),
            },
            {
              path: 'date-time',
              name: 'date-time',
              component: () =>
                import('@/components/surveyComs/Materials/AdvancedComs/DateTime.vue'),
            },
          ],
        },
        {
          path: 'note-group',
          name: 'note-group',
          component: () => import('@/views/MaterialsView/NoteGroupView.vue'),
          redirect: '/materials/note-group/text-note',
          children: [
            {
              path: 'text-note',
              name: 'text-note',
              component: () => import('@/components/surveyComs/Materials/NoteComs/TextNote.vue'),
            },
          ],
        },
        {
          path: 'personal-info-group',
          name: 'personal-info-group',
          component: () => import('@/views/MaterialsView/PersonalInfoGroupView.vue'),
          redirect: '/materials/personal-info-group/personal-info-gender',
          children: [
            {
              path: 'personal-info-gender',
              name: 'personal-info-gender',
              component: () =>
                import('@/components/surveyComs/Materials/SelectComs/SingleSelect.vue'),
            },
            {
              path: 'personal-info-education',
              name: 'personal-info-education',
              component: () =>
                import('@/components/surveyComs/Materials/SelectComs/SingleSelect.vue'),
            },
          ],
        },
        {
          path: 'contact-group',
          name: 'contact-group',
          component: () => import('@/views/MaterialsView/ContactGroupView.vue'),
          redirect: '/materials/contact-group/personal-info-tel',
          children: [
            {
              path: 'personal-info-tel',
              name: 'personal-info-tel',
              component: () => import('@/components/surveyComs/Materials/InputComs/TextInput.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/editor/:id(\\d+)?',
      name: 'editor',
      component: () => import('@/views/EditorView/index.vue'),
      children: [
        {
          path: 'survey-type',
          name: 'survey-type',
          component: () => import('@/views/EditorView/LeftSide/SurveyType.vue'),
        },
        {
          path: 'outline',
          name: 'outline',
          component: () => import('@/views/EditorView/LeftSide/OutLine.vue'),
        },
      ],
    },
    {
      path: '/preview/:id(\\d+)',
      name: 'preview',
      component: () => import('@/views/PreView.vue'),
    },
  ],
});

router.beforeEach((to, form) => {
  const store = useMaterialStore();
  const activeView = localStorage.getItem('activeView');

  if (activeView === 'materials' && to.name) {
    store.setCurrentMaterialCom(to.name as string);
  }

  return true;
});
export default router;
