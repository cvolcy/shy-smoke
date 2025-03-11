<script setup lang="ts">
import { Icon } from '@iconify/vue'

definePageMeta({
  name: 'login',
  layout: 'auth',
  allowAnonymous: true
});

const { $pb } = useNuxtApp()

const usernameOrEmailCookie = useCookie('usernameOrEmail')

const usernameOrEmail = ref(usernameOrEmailCookie.value ?? '')
const password = ref('')
const rememberme = ref(false)
const showPassword = ref(false)
const showCapsLock = ref(false)
const showErrorMsg = ref(false)

async function onLogin(e: Event) {
  e.preventDefault()
  try {
    // const { data, error } = await useFetch('/api/auth/login', {
    //   method: 'post',
    //   body: {
    //     emailOrUsername: usernameOrEmail.value,
    //     password: password.value
    //   }
    // })

    // if (data.value) $pb.authStore.save(data.value.token, data.value.model);
    // if (error.value) throw error.value

    await $pb.collection('users').authWithPassword(usernameOrEmail.value, password.value);
    usernameOrEmailCookie.value = usernameOrEmail.value;
    redirect()
  }
  catch (error) {
    showErrorMsg.value = true;
    setTimeout(() => showErrorMsg.value = false, 5000)
  }
}

function redirect() {
  const router = useRouter()
  const route = useRoute()
  router.push({ path: route.query.redirect_url?.toString() ?? '/dashboard' });
}

function setCaplockState(e: KeyboardEvent) {
  try {
    const event = e as KeyboardEvent
    if (event == null) return
    showCapsLock.value = event.getModifierState('CapsLock')
  }
  catch (_) { }
}

</script>
<template>
  <div class="h-svh flex flex-col align-center justify-center">
    <Card class="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Welcome Back</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onLogin" @keyup="setCaplockState">
          <div class="grid items-center w-full gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="email">Email</Label>
              <Input id="email" class="text-slate-500" v-model="usernameOrEmail" placeholder="somebody@example.com" />
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="password">Password</Label>
              <div class="relative">
                <Input v-if="showPassword" class="pr-14" type="text" id="password" v-model="password"
                  placeholder="MyS3cureP4ssw0rd" />
                <Input v-else class="pr-14 text-slate-500" type="password" id="password" v-model="password"
                  placeholder="MyS3cureP4ssw0rd" />
                <Icon
                  v-if="showCapsLock"
                  class="absolute top-2 right-8 h-5 w-5 text-muted-foreground"
                  icon="lucide:arrow-big-up-dash"
                />
                <Icon
                  v-if="showPassword"
                  class="absolute top-2 right-2 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
                  icon="lucide:eye"
                  @click="showPassword = !showPassword"
                />
                <Icon
                  v-else
                  class="absolute top-2 right-2 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
                  icon="lucide:eye-off"
                  @click="showPassword = !showPassword"
                />
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <Checkbox id="rememberme" :checked="rememberme" @update:checked="(payload:boolean) => rememberme = payload" />
              <label for="rememberme"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Remember me?
              </label>
            </div>
            <Transition name="fade">
              <div v-if="showErrorMsg">
                <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 f;e" role="alert">
                  <span>Incorrect email or password</span>
                </div>
              </div>
            </Transition>
            <div class="flex flex-col space-y-1.5">
              <Button>Login</Button>
            </div>
            <div class="flex flex-col items-end">
              <a href="javascript:void()">Forgot Password?</a>
            </div>
            <hr>
            <!-- TODO: Adding socials login -->
            <div class="flex flex-row justify-end">
              Need an account? <router-link to="register" class="ml-1.5 underline">SIGN UP</router-link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>