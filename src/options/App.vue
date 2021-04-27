<template>
  <div class="flex">
    <sidebar />
    <div class="ml-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/components/Sidebar.vue";

export default defineComponent({
  components: {
    Sidebar,
  },
});
</script>
