<template>
  <section class="paper mx-3 mt-2">
    <div class="flex items-center py-3 border-b border-gray-300">
      <h1 class="text-xl flex-1 ml-4">Add new rule</h1>
      <switch-button class="mr-2" />
      <button class="btn btn-primary mr-2">Save Rule</button>
      <button class="btn btn-secondary mr-2">Cancel</button>
    </div>

    <div class="py-4 p-4">
      <!-- group name -->
      <div class="mb-3">
        <div class="flex space-x-6">
          <label for="rule-name" class="text-sm text-gray-600 mt-2">Name</label>
          <input
            id="rule-name"
            class="input-txt-minimal text-sm w-96"
            type="text"
            name="rule-name"
            placeholder="enter name"
          />
        </div>
      </div>
      <!-- group name -->

      <!-- urls section -->
      <div>
        <span class="inline-block text-sm mb-1 text-gray-600">Urls</span>
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

        <div class="mt-1 flex">
          <label
            class="w-16 inline-flex items-center px-3 rounded-l border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
            for="to-url"
          >
            To
          </label>
          <input
            id="to-url"
            class="input-txt rounded-r-md text-sm w-full"
            type="text"
            name="to-url"
            placeholder="enter url"
          />
        </div>
      </div>
      <!-- urls section -->
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SwitchButton from "~/options/components/SwitchButton.vue";

export default defineComponent({
  components: {
    SwitchButton,
  },
  name: "AddNewRule",
});
</script>
