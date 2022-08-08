<template>
  <el-dialog v-model="isOpen" title="Warning!" width="30%" center>
    <div className="flex justify-center">Are you sure you want to delete this Activity?</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onNo()" data-cy="confirm-no">No</el-button>
        <el-button type="primary" @click="onYes()" data-cy="confirm-yes">Yes</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: {
    isOpen: Boolean,
    onYes: Function,
    onNo: Function
  }
}
</script>