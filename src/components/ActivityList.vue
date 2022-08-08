<template>
  <div className="flex justify-between">
    <div className="flex gap-8 items-center">
      <div className="text-2xl font-bold">Your Activity</div>
      <span className="text-sm">Total Earned:</span>{{ ' ' }}
      <span className="text-sm bg-gradient-to-r from-purple-200 to-purple-500 text-transparent bg-clip-text font-bold">
        {{ totalEarned }}
      </span>
    </div>
    <el-button className="bg-blue-500 text-white p-2 rounded" @click="showModal" data-cy="create-activity">
      Create Activity
    </el-button>
    <ActivityForm v-if="isOpen" :onClose="onClose" :activity="editActivity"/>
    <ActivityForm v-if="!!editActivity" :onClose="onClose" :activity="editActivity"/>
  </div>
  <div className="grid sm:grid-cols-[15%,1fr,15%,15%,15%] gap-2 grid-cols-[1fr,15%,15%,15%] font-bold mt-4">
    <div className="ml-3 hidden sm:block">Date</div>
    <div className="ml-2">Activity</div>
    <div/>
    <div className="-ml-1">Earned</div>
    <div className="-ml-4">Actions</div>
  </div>
  <div v-if="!!error">
    Error retrieving activity list {{ error }}
  </div>
  <div v-else-if="activities.length === 0">
    No Activity data available
  </div>
  <div v-else>
    <div v-for="activity in activities" :key="activity.id">
      <ActivityRow
          :activity="activity"
          :setEditActivity="row => this.editActivity = row"
          :setDeleteActivity="row => this.deleteActivity = row"
          key="activity.id"
      />
    </div>
    <DeleteConfirmation
        v-if="!!deleteActivity"
        :onNo="() => this.deleteActivity = null"
        :onYes="() => onDeleteConfirm()"
        :isOpen="true"
    />
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import {ElButton} from 'element-plus'
import ActivityForm from './ActivityForm.vue'
import ActivityRow from './ActivityRow.vue'
import DeleteConfirmation from './DeleteConfirmation.vue'

export default {
  data() {
    return {
      activities: [],
      error: '',
      isOpen: false,
      openDelete: null,
      editActivity: null,
      deleteActivity: null
    }
  },
  components: {
    ElButton,
    ActivityForm,
    DeleteConfirmation,
    ActivityRow
  },
  mounted() {
    axios.post('http://localhost:1938/api/MyActivity/list', {})
        .then(response => {
          this.activities = response.data
        })
        .catch(err => {
          this.error = err.message
        })
  },
  computed: {
    totalEarned() {
      return this.activities.reduce((total, row) => total + row.pointsEarned, 0)
    },
  },
  methods: {
    dateToDisplay(date) {
      return dayjs(date).format('YYYY-MM-DD')
    },
    showModal() {
      this.isOpen = true
    },
    onClose(newRow) {
      if (!!newRow) {
        this.activities = [...this.activities.filter(row => row.id !== newRow.id)]
        this.activities.push(newRow)
        this.activities.sort((rowA, rowB) => (
            rowA.createdAt < rowB.createdAt ? -1 : 1
        ))
      }
      this.isOpen = false
      this.editActivity = null
    },
    onDeleteConfirm() {
      this.activities = this.activities.filter(row => row !== this.deleteActivity)
      this.deleteActivity = null
    }
  }
}
</script>