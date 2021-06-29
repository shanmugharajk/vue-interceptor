<template>
  <div class="mt-1 flex mb-1">
    <label
      class="w-16 inline-flex items-center px-3 rounded-l border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
      for="url"
    >
      From
    </label>
    <input
      id="url"
      class="input-txt rounded-r-md text-sm w-full"
      type="text"
      name="url"
      placeholder="enter url"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextInput",
  props: {
    id: {
      type: String,
      required: false,
    },
  },
});
</script>
