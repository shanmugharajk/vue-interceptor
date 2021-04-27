<template>
  <div>
    <sidebar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/components/Sidebar.vue";

export default defineComponent({
  components: {
    Sidebar,
  },
  name: "Home",
});
</script>
