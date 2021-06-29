<template>
  <div class="flex">
    <section class="w-60 bg-gray-50 border-gray-100 border">
      <button
        class="btn btn-icon btn-primary mx-auto mt-5 mb-8"
        @click="handleAddNewRule"
      >
        <plus-circle-icon class="w-5 h-5 mr-1" />
        Add New
      </button>

      <rules-list />
    </section>

    <rule-form v-if="showAddNewRule" class="flex-1">Add new</rule-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { PlusCircleIcon } from "~/options/components/icons";
import RulesList from "~/options/rules-list/RulesList.vue";

import RuleForm from "./RuleForm.vue";

export default defineComponent({
  name: "RedirectUrl",
  components: {
    RuleForm,
    PlusCircleIcon,
    RulesList,
  },
  setup() {
    const showAddNewRule = ref(!false);

    const handleAddNewRule = () => {
      showAddNewRule.value = true;
    };

    return {
      handleAddNewRule,
      showAddNewRule,
    };
  },
});
</script>
