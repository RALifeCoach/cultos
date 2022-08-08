<template id="activity-modal">
  <!-- Modal -->
  <div class="absolute inset-0 w-screen h-screen flex justify-center items-center">
    <div class="absolute inset-0 bg-gray-300 opacity-75 w-screen h-screen"/>
    <div class="relative bg-white opacity-100 p-4">
      <el-form
          label-position="top"
          ref="activityForm"
          :model="activityForm"
          :rules="rules"
          label-width="120px"
          style="width: 460px"
          status-icon
      >
        <div class="text-xl mb-5 text-gray-400">Create Activity</div>
        <el-form-item label="Description" prop="description">
          <el-input v-model="activityForm.description" data-cy="input-descr"/>
        </el-form-item>
        <el-form-item label="Social Platform" prop="socialPlatform">
          <el-select v-model="activityForm.socialPlatform" placeholder="Select" data-cy="select-platform">
            <el-option label="Facebook" value="Facebook"/>
            <el-option label="Instagram" value="Instagram"/>
            <el-option label="Twitter" value="Twitter"/>
          </el-select>
        </el-form-item>
        <el-form-item label="Social Type" prop="socialType">
          <el-select
              v-model="activityForm.socialType"
              placeholder="Select"
              data-cy="select-type"
          >
            <el-option label="Liked" value="Liked" data-cy="option-liked"/>
            <el-option label="Shared" value="Shared" data-cy="option-shared"/>
            <el-option label="Post" value="Post" data-cy="option-post"/>
          </el-select>
        </el-form-item>
        <el-form-item label="Points Earned" prop="pointsEarned">
          <el-input-number v-model="activityForm.pointsEarned" :min="1" style="width: 160px" data-cy="input-points"/>
        </el-form-item>
        <div className="mt-10 flex justify-end">
          <el-form-item>
            <el-button @click="resetForm()" data-cy="modal-cancel">Cancel</el-button>
            <el-button @click="submitForm()" data-cy="modal-confirm">Confirm</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  props: {
    activity: { type: Object },
    onClose: { type: Function }
  },
  data: () => {
    return {
      isOpen: false,
      error: '',
      activityForm: {
        description: '',
        socialPlatform: '',
        socialType: '',
        pointsEarned: 10,
      },
      rules: {
        description: [
          {required: true, message: 'Please input activity description', trigger: 'blur'},
          {min: 3, message: 'Length should be at least 3', trigger: 'blur'},
        ],
        socialPlatform: [
          {
            required: true,
            message: 'Please select social platform',
            trigger: 'change',
          },
        ],
        socialType: [
          {
            required: true,
            message: 'Please select social type',
            trigger: 'change',
          },
        ],
        pointsEarned: [
          {
            validator: (rule, value, callback) => {
              const points = parseInt(value)
              if (points !== parseFloat(value)) {
                return callback(new Error('Must be whole number'))
              }
              callback()
            },
            trigger: 'blur',
          },
        ],
      }
    }
  },
  mounted() {
    if (!!this.activity) {
      this.activityForm = {...this.activity}
    }
  },
  methods: {
    resetForm() {
      this.onClose();
    },
    async submitForm() {
      await this.$refs.activityForm.validate(async (valid, fields) => {
        if (!valid) {
          return
        }
        if (!!this.activityForm.id) {
          return this.onClose(this.activityForm)
        }
        const body = {
          ...this.activityForm,
          createdAt: dayjs().valueOf(),
          date: dayjs().toString()
        }
        return await axios.post('http://localhost:1938/api/MyActivity/create', body)
            .then(response => {
              this.onClose(response.data)
            })
            .catch(err => {
              this.error = err.message
            })
      })
    }
  }
}
</script>
