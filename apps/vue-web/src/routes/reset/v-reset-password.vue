<template>
  <Header></Header>
    <div class="container shadow-xl rounded-2xl mt-7 mx-auto w-[500px] px-14" dir="rtl">
      <h1 class="text-4xl font-bold font-changa text-midnight pt-20 pb-6">
        {{ t('reset-password') }}
      </h1>
      <div class="flex flex-col items-start w-96">
        <div class="text-sm font-medium text-opacity-80 leading-7 font-changa text-midnight">
          <div class="flex gap-2 py-2">
            <p>{{ t('enter-new-password') }}</p>
          </div>
          <div class="flex relative py-2 items-start">
            <div>
              <p>{{ t('new-password') }}</p>
              <p class="absolute left-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-8 text-yellow-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </p>
              <input type="password" v-model="password" class="border-b-2 border-yellow-400 w-96 focus:outline-none" />
            </div>
          </div>
          <div class="flex relative py-2 items-start">
            <div>
              <p>{{ t('confirm-password') }}</p>
              <p class="absolute left-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-8 text-yellow-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </p>
              <input type="password" v-model="confirmPassword" class="border-b-2 border-yellow-400 w-96 focus:outline-none" />
            </div>
          </div>
          <div class="flex py-5 mb-36 items-end justify-end gap-6">
            <button class="w-20 h-9 space-x-1 rounded-2xl bg-white border-2 border-yellow-500">
              <a  class="text-yellow-500 font-changa text-sm font-semibold">
                {{ t('cancel') }}
              </a>
            </button>
            <button class="w-20 h-9 space-x-1 rounded-2xl bg-yellow-500" @click="resetPassword">
              <a  class="text-white font-changa text-sm font-semibold"> {{ t('save') }} </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  
</template>




      
      
  
  

<script setup lang="ts">
import { i18n } from '@/lang'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const { t } = i18n.global;

const route = useRoute();
const token = route.params.token.toString();

const password = ref('');
const confirmPassword = ref('');

const authStore = useAuthStore();

const resetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    console.error("Passwords don't match");
    return;
  }
  await authStore.resetPassword(token, password.value);
  // Handle success or failure feedback here, for example:
  if(authStore.message) {
    console.log(authStore.message);
  } else if(authStore.error) {
    console.error(authStore.error.message);
  }
}
</script>

