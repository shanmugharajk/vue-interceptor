<template>
  <section class="w-25 min-h-screen text-center text-gray-200 bg-indigo-900">
    <logo class="mb-8" />
    <button
      class="btn btn-icon flex-col m-2 mb-5"
      :class="{
        'bg-hover':
          currentRoute.path == '/redirect-url' || currentRoute.path == '/',
      }"
      @click="updateView('redirect-url')"
    >
      <refresh-icon class="text-indigo-400" />
      <span class="text-indigo-200 mb-2">Redirect</span>
    </button>

    <button
      class="btn btn-icon flex-col m-2 mb-5"
      :class="{ 'bg-hover': currentRoute.path == '/modify-headers' }"
      @click="updateView('modify-headers')"
    >
      <view-grid-icon class="text-indigo-400" />
      <span class="text-indigo-200 mb-2">Headers</span>
    </button>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Logo from "./Logo.vue";
import { RefreshIcon, ViewGridIcon } from "./icons";

export default defineComponent({
  components: {
    Logo,
    RefreshIcon,
    ViewGridIcon,
  },
  name: "Sidebar",
  setup() {
    const router = useRouter();

    function updateView(viewName: string) {
      router.push(`options.html/${viewName}`);
    }

    return {
      updateView,
      currentRoute: router.currentRoute,
    };
  },
});
</script>
