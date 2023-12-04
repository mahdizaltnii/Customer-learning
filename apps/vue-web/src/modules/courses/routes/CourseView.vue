<template>
  <div class="relative w-full">
    <div class="container mx-auto min-h-full w-full overflow-y-auto p-6 lg:px-10">
      <div v-if="course" dir="rtl">
        <div class="grid grid-cols-1 divide-y mx-auto max-w-xl m-10">
          <div>
            <div class="relative w-9 h-9 bg-violet-700 rounded-lg">
              <img
                src="../assets/icons/settings_black_24dp (4).svg"
                alt=""
                class="absolute text-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <div class="space-y-4 right-0 my-4">
              <h4 class="text-xl font-bold leading-7 font-changa text-midnight">
                {{ course.title }}
              </h4>
              <p class="text-sm font-changa text-gray-400">تم الإضافة في 11 يوليو 2023</p>
            </div>
          </div>

          <div class="">
            <div v-html="course.full_desrciption"></div>

            <!-- <p class="text-sm font-semibold font-changa text-midnight my-4 leading-7">
                  تعلم إدارة الموقع الإلكتروني الخاص بك في نظام جودبوكينغ هو دورة مصممة خصيصًا لمساعدتك في
                  إدارة بيانات موقعك الشخصي داخل نظام الحجوزات المعروف باسم "جودبوكينغ". تركز هذه الدورة على
                  تزويدك بالمهارات الضرورية للتحكم في بيانات الحجوزات وإدارتها بسهولة وفاعلية
                </p>
                <p class="text-sm font-changa font-medium text-midnight mb-6">
                  تتضمن هذه الدورة العناصر التالية
                </p>
                <p class="text-sm font-changa font-medium text-midnight">فهم نظام جودبوكينغ</p>
                <ul class="list-disc list-inside mb-4 mt-3 -ml-5">
                  <li class="mb-2 text-midnight font-changa">
                    ستتعرف على واجهة النظام وتفاصيله وكيفية استخدامه لإدارة حجوزات موقعك
                  </li>
                  <li class="mb-2 text-midnight font-changa">
                    ستكتسب المعرفة بالمفاهيم الأساسية لنظام جودبوكينغ وكيفية تكوينه وتخصيصه وفقًا لاحتياجات
                    موقعك الشخصي
                  </li>
                  <li class="mb-2 text-midnight font-changa">
                    إدارة الحجوزات ستتعلم كيفية إضافة حجوزات جديدة وتحديثها وإلغائها ضمن نظام جودبوكينغ
                  </li>
                  <li class="mb-2 text-midnight font-changa">
                    ستتمكن من تعيين المواعيد وتنظيمها وتخصيصها وفقًا لتفضيلاتك الخاصة ومتطلبات موقعك
                  </li>
                  <li class="mb-2 text-midnight font-changa">
                    إدارة البيانات ستتعرف على كيفية إدارة بيانات المستخدمين والعملاء المسجلين في نظام
                    جودبوكينغ
                  </li>
                  <li class="mb-2 text-midnight font-changa">
                    ستتعلم كيفية تنظيم وتحديث ومراقبة بيانات الحجوزات والمدفوعات والمعلومات الشخصية للعملاء
                  </li>
                  <li class="mb-2 text-midnight font-changa">
                    التقارير والإحصاءات ستتعرف على كيفية استخدام واستخراج تقارير وإحصاءات مفصلة حول حجوزاتك
                    وأداء موقعك في نظام جودبوكينغ
                  </li>
                </ul>
        
                <p class="text-sm font-semibold font-changa text-midnight">
                  بعد إتمام هذه الدورة، ستتمتع بالمهارات الضرورية لإدارة بيانات موقعك الشخصي داخل نظام
                  جودبوكينغ بثقة وكفاءة. ستتمكن من تنظيم الحجوزات وتحديث البيانات وإجراء التقارير وتحليل
                  أداء موقعك بشكل فعال. سوف يساعدك هذا في توفير الوقت والجهد وتحسين تجربة العملاء، مما يؤدي
                  في النهاية إلى نجاح أفضل لموقعك الشخصي وتحقيق الأهداف التي وضعتها لنفسك
                </p> -->
            <div class="flex justify-end items-center m-5 gap-3">
              <div class="flex gap-2">
                <p class="text-midnight font-changa font-medium">{{ t('save-later') }}</p>
                <svg
                  width="18"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <button class="flex items-center p-5 gap-2 rounded-lg bg-yellow-500 w-30 h-9">
                <a  class="text-midnight font-changa text-sm font-bold">{{ t('start-lesson') }}</a>
                <svg
                  id="arrow_back_black_24dp_3_"
                  data-name="arrow_back_black_24dp (3)"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path id="Path_10583" data-name="Path 10583" d="M0,0H24V24H0Z" fill="none" />
                  <path
                    id="Path_10584"
                    data-name="Path 10584"
                    d="M19,11H7.83l4.88-4.88a1.008,1.008,0,0,0,0-1.42,1,1,0,0,0-1.41,0L4.71,11.29a1,1,0,0,0,0,1.41l6.59,6.59a1,1,0,0,0,1.41-1.41L7.83,13H19a1,1,0,0,0,0-2Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <h4 class="text-xl font-bold leading-7 font-changa text-midnight pt-5">{{t('lesson-section')}}</h4>
            <div class="grid grid-rows-6 gap-7 mt-6"
           >
              <div class="flex gap-2"
              v-for="chapter in chapters"
              :key="chapter.id">
                <div class="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >                   
                    <path
                      d="M20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L7.59662 21.6145C5.53435 22.736 3 21.2763 3 18.9671L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258Z"
                      fill="white"
                    />
                  </svg>
                </div>

                <a  class="text-midnight font-changa hover:underline hover:cursor-pointer">
                  {{chapter.title}}
                </a>
                <p class="text-gray-400 font-changa">{{chapter.duration}}</p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCourseStore } from '@/stores/courses'
import { useChapterStore } from '@/stores/chapter'
import { i18n } from '@/lang'
const route = useRoute()
const courseStore = useCourseStore()
const { course } = storeToRefs(courseStore)
const chapterStore = useChapterStore()
const { chapters } = storeToRefs(chapterStore)
const { t } = i18n.global
onMounted(async () => {
  const courseId = Number(route.params.id)
  await courseStore.fetchCourseById(courseId)
  await chapterStore.fetchChaptersByCourseId(courseId)
  console.log(chapterStore.chapters)
})
</script>
