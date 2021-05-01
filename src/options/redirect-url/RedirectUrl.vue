<template>
  <section class="w-60 bg-gray-50 border-gray-100 border">
    <button class="btn btn-icon btn-primary mx-auto mt-5 mb-8">
      <plus-circle-icon class="w-5 h-5 mr-1" />
      Add New
    </button>

    <rules-list />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PlusCircleIcon } from "~/options/components/icons";
import RulesList from "~/options/rules-list/RulesList.vue";

export default defineComponent({
  name: "RedirectUrl",
  components: {
    PlusCircleIcon,
    RulesList,
  },
});
</script>
