  <template>
    <Header></Header>
    <div class="container shadow-xl rounded-2xl mt-7 mx-auto w-[500px] px-14" dir="rtl">
      <h1 class="text-4xl font-bold font-changa text-midnight pt-14 pb-6">{{ t('sign-up') }}</h1>

      <div class="flex flex-col items-start w-96">
        <div class="text-sm font-semibold text-opacity-80 leading-7 font-changa text-midnight">
          <p>{{ t('sign-up-with') }}</p>
          <div class="flex gap-2 py-2">
            <p>{{ t('already-have-account') }}</p>
            <p class="text-yellow-500">
              <RouterLink :to="{ name: 'signin' }">{{ t('sign-in') }}</RouterLink>
            </p>
          </div>
          <div class="flex py-2 gap-8 items-start">
            <div>
              <p>{{ t('name') }}</p>
              <input type="text" class="border-b-2 focus:outline-none" />
            </div>

            <div>
              <p>{{ t('lastname') }}</p>
              <input type="text" class="border-b-2 focus:outline-none" />
            </div>
          </div>
          <div class="flex py-2 items-start">
            <div>
              <p>{{ t('company-name') }}</p>
              <input type="text" class="border-b-2 border-yellow-400 w-96 focus:outline-none" />
            </div>
          </div>
          <div class="flex py-2 gap-8 items-start">
            <div>
              <p>{{ t('postal-code') }}</p>
              <input type="text" class="border-b-2 focus:outline-none" />
            </div>

            <div>
              <p>{{ t('company-address') }}</p>
              <input type="text" class="border-b-2 focus:outline-none" />
            </div>
          </div>
          <div class="flex py-2 items-start">
            <div>
              <p>{{ t('your-email') }}</p>
              <input type="text" class="border-b-2 w-96 focus:outline-none" />
            </div>
          </div>
          <div class="flex relative py-2 justify-between items-start">
            <div>
              <p>{{ t('phone') }}</p>
              <p class="absolute left-0">+216</p>
              <input type="text" class="border-b-2 w-96 focus:outline-none" />
            </div>
          </div>
          <div class="flex relative py-2 justify-between items-start">
            <div>
              <p>{{ t('password') }}</p>
              <input type="password" class="border-b-2 w-96 focus:outline-none" />
            </div>
          </div>
          <div class="flex relative py-2 my-8 justify-normal gap-3 items-center">
            <label
              for="check"
              class="bg-gray-200 peer-checked:bg-yellow-500 cursor-pointer relative w-10 h-5 rounded-full"
            >
              <input type="checkbox" id="check" class="sr-only peer" />
              <span
                class="w-4 h-4 bg-white absolute rounded-full left-0.5 top-0.5 peer-checked:bg-yellow-500 peer-checked:left-5 transition-all duration-500"
              ></span>
            </label>

            <p>{{ t('agree-terms') }}</p>
            <button
              class="items-center w-24 h-9 mr-8 justify-center space-x-1 rounded-2xl bg-yellow-500 text-white font-changa text-sm font-semibold"
            >
              <RouterLink :to="{ name: 'signin' }">{{ t('sign-in') }}</RouterLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import { useI18n } from 'vue-i18n'


  const { t } = useI18n()
  </script>
