<template>
  <Header></Header>
    <div class="container shadow-xl rounded-2xl py-10 mx-auto max-w-lg px-14 mt-7" dir="rtl">
      <h1 class="text-4xl font-bold font-changa text-midnight pt-20 pb-6">
        {{ t('forgot-password') }}
      </h1>
      <div class="flex flex-col">
        <div class="text-base font-medium font-changa text-midnight/80">
          <div class="flex flex-col gap-6">
            <p>{{ t('enter-email') }}</p>
            <p>{{ t('email') }}</p>
          </div>
          <input type="text" v-model="email" class="border-b-2 w-96 focus:outline-none" />
  
          <div class="flex py-5 mb-36 justify-end gap-6">
            <button class="px-6 py-1 rounded-2xl bg-white border-2 border-yellow-500 text-yellow-500 font-changa text-sm font-semibold">
              <RouterLink :to="{ name: 'signin'  }"> {{ t('cancel') }}</RouterLink>
            </button>
            <button class="px-6 py-1 rounded-2xl bg-yellow-500 text-white font-changa text-sm font-semibold" @click="handleForgotPassword">
              <RouterLink :to="{ name: 'resetpassword'  }"> {{ t('send') }}</RouterLink>

            </button>
          </div>
        </div>
      </div>
    </div>
  
</template>
<script setup lang="ts">
import { i18n } from '@/lang'
import { useAuthStore } from '@/stores/auth'; // Replace with the actual path to your store
import { ref } from 'vue'
import { onMounted } from 'vue';
const { t } = i18n.global;

const authStore = useAuthStore();
const   email  = ref('');

const handleForgotPassword = async () => {
  await authStore.forgotPassword(email.value);
  console.log(authStore);
}
  

</script>
