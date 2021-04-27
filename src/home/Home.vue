<template>
  <div>
    <p>{{ defaultText }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "Home",
  props: {
    msg: String,
  },
  setup() {
    onMounted(function () {
      browser.runtime.sendMessage({});
    });

    const defaultText = computed(() => {
      return browser.i18n.getMessage("extName");
    });

    return { defaultText };
  },
});
</script>
