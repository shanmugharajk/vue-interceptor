<template>
  <v-app>
    <!-- header -->
    <v-app-bar app flat outlined>
      <v-app-bar-nav-icon>
        <div class="logo"><span>VI</span></div>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Vue Chrome Interceptor</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <!-- Dialog to show for delete rule -->
        <ConfirmationDialog
          :showDialog="showConfirmationDialog"
          :onConfirm="handleConfirm"
          :onCancel="handleCancel"
        />

        <!-- Rules table -->
        <v-data-table
          :headers="headers"
          :items="rules"
          no-data-text="No rules are added currently!"
        >
          <template v-slot:top>
            <!-- Header -->
            <v-toolbar flat>
              <v-toolbar-title>Interceptor Rules</v-toolbar-title>
              <v-spacer></v-spacer>
              <RulesForm :rule-to-edit="ruleToEdit" :onSave="handleSave" />
            </v-toolbar>
          </template>

          <!-- Custom columns -->
          <!-- isActive -->
          <template v-slot:[`item.isActive`]="{ item }">
            <v-switch
              class="switch"
              v-model="item.isActive"
              @change="handleActiveChange(item)"
              hide-details
              dense
            ></v-switch>
          </template>

          <!-- Actions -->
          <template v-slot:[`item.actions`]="{ item }">
            <div>
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </div>
          </template>
        </v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { rulesRepository, Rule } from '@/libs';
import RulesForm from '@/options/components/RulesForm.vue';
import ConfirmationDialog from '@/options/components/ConfirmationDialog.vue';

@Component({
  components: {
    RulesForm,
    ConfirmationDialog
  }
})
export default class App extends Vue {
  headers = [
    { text: 'Rule Id', sortable: false, value: 'id' },
    { text: 'Description', sortable: false, value: 'description' },
    { text: 'Rule Type', sortable: false, value: 'ruleTypeLableText' },
    { text: 'Active', sortable: false, value: 'isActive' },
    { text: 'Actions', sortable: false, value: 'actions' }
  ];

  rules: Rule[] = [];

  ruleToEdit: Partial<Rule> = {};

  itemToDelete?: Rule;

  showConfirmationDialog = false;

  mounted() {
    this.loadData();
  }

  async loadData() {
    this.rules = await rulesRepository.fetchAll();
  }

  handleSave() {
    this.loadData();
  }

  editItem(item: Rule) {
    this.ruleToEdit = { ...item };
  }

  deleteItem(item: Rule) {
    this.showConfirmationDialog = true;
    this.itemToDelete = item;
  }

  async handleActiveChange(rule: Rule) {
    await rulesRepository.upsert(rule);
    await this.loadData();
  }

  async handleConfirm() {
    if (this.itemToDelete?.id) {
      await rulesRepository.deleteById(this.itemToDelete.id);
    }
    this.itemToDelete = undefined;
    this.showConfirmationDialog = false;
    await this.loadData();
  }

  handleCancel() {
    this.showConfirmationDialog = false;
  }
}
</script>

<style scoped lang="scss">
.logo {
  height: 36px;
  width: 36px;
  text-align: center;
  border-radius: 13px 13px 0px;
  background: #1a67bf;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: #fff;
    font-size: 13px;
  }
}

.switch {
  margin-top: 0;
}
</style>
