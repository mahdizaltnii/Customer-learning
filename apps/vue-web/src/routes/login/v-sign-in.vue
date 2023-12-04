<script setup lang="ts">
import { i18n } from '@/lang'
import { router } from '@/router';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
const email = ref('');
const password = ref('');
const authStore = useAuthStore();

const { t } = i18n.global

const login = async () => {
  try {
    await authStore.login({
      email: email.value,
      password: password.value
    });
    router.push({ path: '/home' });
    // Redirect to home page or dashboard after successful login.
    // Using vue-router's `push` method or another appropriate method.
  } catch (error) {
    // Handle error, maybe show a notification or error message.
  }
};

</script>
<template>
  <Header></Header>
  <div class="container shadow-xl rounded-2xl mt-7 mx-auto max-w-lg px-14" dir="rtl">
    <h1 class="text-4xl font-bold font-changa text-midnight pt-20 pb-6">{{ t('sign-in') }}</h1>

    <div class="flex flex-col">
      <div class="text-sm font-medium leading-7 font-changa text-midnight/80">
        <div class="flex gap-2 py-2">
          <p>{{ t('dont-have-account') }}</p>
          <p class="text-yellow-500">
          <RouterLink :to="{ name: 'signup'}" >{{ t('sign-up') }}</RouterLink>
          </p>
        </div>

        <div class="flex py-2 items-start">
          <div>
            <p>{{ t('email') }}</p>
            <input type="text" v-model="email"  class="border-b-2 w-96 focus:outline-none" />
          </div>
        </div>

        <div class="flex relative py-2 justify-between items-start">
          <div>
            <p>{{ t('password') }}</p>
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

            <input type="password" v-model="password"  class="border-b-2 border-yellow-400 w-96 focus:outline-none" />
            <p class="text-yellow-500 underline pt-1">
              <RouterLink :to="{ name: 'forgotpassword'}" >{{ t('forgot-password') }}</RouterLink>
            </p>
          </div>
        </div>
        <div class="flex relative py-5 mb-36 justify-normal gap-3 items-center">
          <label
            for="check"
            class="bg-gray-200 peer-checked:bg-yellow-500 cursor-pointer relative w-10 h-5 rounded-full"
          >
            <input type="checkbox" id="check" class="sr-only peer" />
            <span
              class="w-4 h-4 bg-white absolute rounded-full left-0.5 top-0.5 peer-checked:bg-yellow-500 peer-checked:left-5 transition-all duration-500"
            ></span>
          </label>

          <p>{{ t('remember-account') }}</p>
          <button
            class="items-center mr-40 w-20 h-9 justify-center space-x-1 rounded-2xl bg-yellow-500 text-white font-changa text-sm font-semibold " 
            @click="login">
            <a > {{ t('confirm') }} </a>
          </button>
        </div>
      </div>
    </div>
  </div>
  
</template>


