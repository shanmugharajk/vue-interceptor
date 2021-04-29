<template>
  <div class="flex">
    <sidebar />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/options/components/Sidebar.vue";

export default defineComponent({
  components: {
    Sidebar,
  },
});
</script>
