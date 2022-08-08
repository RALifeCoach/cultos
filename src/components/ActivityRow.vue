<template>
  <div
      className="grid sm:grid-cols-[15%,1fr,15%,15%,15%] grid-cols-[1fr,15%,15%,15%] border border-gray-100 gap-2 shadow-sm p-2 mt-3 rounded-lg hover:bg-gray-100"
  >
    <div className="hidden sm:block">{{ dateToDisplay(activity.date) }}</div>
    <div>Thanks for {{ activity.description }}</div>
    <div className="whitespace-nowrap">
      <font-awesome-icon :icon="activityIcon()" color="#677389"/>
      {{ activity.socialType }}
    </div>
    <div
        className="bg-gradient-to-r from-purple-200 to-purple-500 text-transparent bg-clip-text font-bold whitespace-nowrap">
      +{{ activity.pointsEarned }}
    </div>
    <div className="flex gap-3">
      <div className="cursor-pointer" @click="setEditActivity(activity)" :data-cy="`edit-${activity.description}`">
        <i class="far fa-pen-to-square" color="#677389"/>
      </div>
      <div className="cursor-pointer" @click="setDeleteActivity(activity)" :data-cy="`delete-${activity.description}`">
        <i class="far fa-trash-can" color="#677389"/>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    activity: Object,
    setEditActivity: Function,
    setDeleteActivity: Function
  },
  data() {
    return {
      openDelete: null,
      icons: {
        Facebook: 'fab fa-facebook-f',
        Instagram: 'fab fa-instagram',
        Twitter: 'fab fa-twitter'
      }
    }
  },
  methods: {
    dateToDisplay(date) {
      return dayjs(date).format('YYYY-MM-DD')
    },
    activityIcon() {
      return this.icons[this.activity.socialPlatform]
    }
  }
}
</script>