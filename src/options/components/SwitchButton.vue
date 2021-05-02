<template>
  <div class="inline-flex justify-between items-center" @click="handleToggle">
    <div
      class="w-13 h-5 flex items-center border border-indigo-800 rounded-full p-0 duration-300 ease-in-out"
    >
      <span
        class="inline-block ml-2 mr-1 cursor-default"
        :class="{ hidden: !toggleActive }"
      >
        On
      </span>
      <div
        class="bg-indigo-800 w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out"
        :class="{ 'translate-x-1': toggleActive, 'ml-0.5': !toggleActive }"
      />
      <span
        class="inline-block mr-1 ml-1 cursor-default"
        :class="{ hidden: toggleActive }"
      >
        Off
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SwitchButton",
  setup() {
    const toggleActive = ref(!false);

    const handleToggle = () => {
      toggleActive.value = !toggleActive.value;
    };

    return {
      handleToggle,
      toggleActive,
    };
  },
});
</script>
