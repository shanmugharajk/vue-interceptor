<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">Please confirm</v-card-title>
        <v-card-text
          >Are you sure you want to delete the rule? You can turn off instead
          deleting</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed small text @click="onCancel">Cancel</v-btn>
          <v-btn depressed small color="primary" text @click="onConfirm"
            >Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ConfirmationDialog extends Vue {
  @Prop() showDialog?: boolean;
  @Prop({ required: true }) onCancel?: () => void;
  @Prop({ required: true }) onConfirm?: () => void;
}
</script>
