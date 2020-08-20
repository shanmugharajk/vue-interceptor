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
          <v-form id="newRule" ref="form" v-model="valid" lazy-validation>
            <v-textarea
              id="rules"
              v-model="data.rules"
              :rules="validationRules.rules"
              label="Rules"
              auto-grow
              rows="10"
              outlined
              required
            ></v-textarea>

            <v-text-field
              v-model="data.id"
              :rules="validationRules.id"
              label="id"
              required
            ></v-text-field>

            <v-select
              v-model="data.selectedRule"
              :rules="validationRules.ruleTypeValidationRules"
              :items="ruleTypes"
              label="Rule type"
              required
            ></v-select>

            <v-textarea
              v-model="data.description"
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import {
  getRuleTypesLabelData,
  getRuleLabelTextByType,
  validateRules,
  ruleTypesMap,
  Rule,
  sleep,
  rulesRepository
} from '@/libs';

export type VForm = Vue & {
  validate: () => boolean;
  resetValidation: () => void;
};

type ValidationRule = (data?: string) => boolean | string;

export interface FormData {
  id: string;
  selectedRule: string;
  rules: string;
  isActive: boolean;
  description?: string;
}

interface ValidationRules {
  id: ValidationRule[];
  rules: ValidationRule[];
  ruleTypeValidationRules: ValidationRule[];
}

@Component
export default class RulesFormDialog extends Vue {
  @Prop({ required: false }) ruleToEdit?: Rule;
  @Prop({ required: true }) onSave?: () => void;

  dialogTitle = 'New Rule';

  showDialog = false;

  ruleTypes = getRuleTypesLabelData();

  valid = true;

  initialData = {
    id: '',
    selectedRule: '',
    rules: '',
    isActive: true,
    description: undefined
  };

  data: FormData = { ...this.initialData };

  validationRules: ValidationRules = {
    id: [],
    rules: [],
    ruleTypeValidationRules: []
  };

  idValidationRules = [(v?: string) => !!v || 'Name is required'];

  ruleTypeValidationRules = [(v?: string) => !!v || 'Select Rule type'];

  rulesValidationRules = [
    (v = '') => {
      let rules;
      const error = 'Please enter the valid rules';

      try {
        rules = JSON.parse(v);
      } catch {
        return error;
      }

      const isValid = validateRules(
        ruleTypesMap[this.data.selectedRule],
        rules
      );

      if (!isValid) {
        return error;
      }

      return true;
    }
  ];

  @Watch('ruleToEdit')
  updateRuleToEdit(ruleToEdit: Rule) {
    this.data.id = ruleToEdit.id;
    this.data.description = ruleToEdit.description;
    this.data.isActive = ruleToEdit.isActive;
    this.data.rules = JSON.stringify(ruleToEdit.rules);
    this.data.selectedRule = getRuleLabelTextByType(ruleToEdit.ruleType) ?? '';

    this.showDialog = true;
  }

  @Watch('showDialog')
  resetValidation() {
    if (!this.showDialog) {
      (this.$refs.form as VForm).resetValidation();
      this.data = { ...this.initialData };
    }
  }

  closeDialog() {
    this.showDialog = false;
  }

  handleClose() {
    this.resetValidation();
    this.closeDialog();
  }

  async validate() {
    this.validationRules.id = this.idValidationRules;
    this.validationRules.rules = this.rulesValidationRules;
    this.validationRules.ruleTypeValidationRules = this.ruleTypeValidationRules;

    // Hack: Otherwise the .validate() is not working for the first time.
    await sleep();

    return (this.$refs.form as VForm).validate();
  }

  async handleSave() {
    const isValid = await this.validate();
    if (!isValid) {
      return;
    }

    try {
      await rulesRepository.upsert({
        id: this.data.id,
        description: this.data.description,
        ruleType: ruleTypesMap[this.data.selectedRule],
        ruleTypeLableText: this.data.selectedRule,
        rules: JSON.parse(this.data.rules),
        isActive: true
      });
      this.onSave && this.onSave();
    } catch (error) {
      console.log(error);
    }

    this.closeDialog();
  }
}
</script>

<style lang="scss">
#rules {
  font-size: 13px;
  line-height: 1;
  padding: 10px;
}
</style>
