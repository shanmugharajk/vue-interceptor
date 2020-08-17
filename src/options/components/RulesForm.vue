<template>
  <v-dialog v-model="showDialog" max-width="1000px">
    <!-- Dialog trigger button -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" small dark class="mb-2" v-bind="attrs" v-on="on"
        >New Rule</v-btn
      >
    </template>

    <!-- Dialog content -->
    <v-card>
      <v-card-title>
        <span class="headline">{{ dialogTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-form id="newRule" ref="form" v-model="valid">
            <v-textarea
              v-model="data.rules"
              :rules="validationRules.rules"
              label="Rules"
              auto-grow
              rows="10"
              outlined
              required
              dense
            ></v-textarea>

            <v-text-field
              v-model="data.ruleId"
              :rules="validationRules.ruleIdRules"
              label="RuleId"
              required
              dense
            ></v-text-field>

            <v-select
              v-model="data.selectedRule"
              :items="ruleTypes"
              :rules="[v => !!v || 'Select a rule type']"
              label="Rule type"
              required
              dense
            ></v-select>

            <v-textarea
              v-model="data.description"
              dense
              rows="1"
              label="Description"
            ></v-textarea>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed small @click="handleClose">Cancel</v-btn>
        <v-btn depressed small color="primary" @click="handleSave">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class RulesFormDialog extends Vue {
  showDialog = false;
  dialogTitle = 'New Rule';
  ruleTypes = ['Url Redirect', 'Modify Header'];

  valid = true;

  data = {
    ruleId: '',
    selectedRule: undefined,
    rules: [],
    description: undefined
  };

  // TODO: Update the validation rules
  validationRules = {
    ruleId: [(v?: string) => !!v || 'Name is required'],

    rules: [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (v?: any[]) => (!!v && v?.length > 0) || 'Please enter the valid rules'
    ]
  };

  closeDialog() {
    this.showDialog = false;
  }

  handleClose() {
    this.closeDialog();
  }

  handleSave() {
    // TODO: Save the rule.
    this.closeDialog();
  }
}
</script>

<style lang="scss">
#newRule textarea {
  font-size: 13px;
  line-height: 1;
  padding: 10px;
}
</style>
