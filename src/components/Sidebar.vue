<template>
  <section class="w-28 min-h-screen text-center text-gray-200 bg-indigo-900">
    <logo class="mb-8" />

    <button class="btn btn-icon" @click="updateView('redirect-url')">
      <refresh-icon class="text-indigo-400" />
      <span class="text-indigo-200 mb-2">Redirect</span>
    </button>

    <button class="btn btn-icon" @click="updateView('modify-headers')">
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
      router.push(viewName);
    }

    return {
      updateView,
    };
  },
});
</script>
