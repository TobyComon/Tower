<template>
  <div class="container-fluid">
    <div class="row">
      <img
        :src="comment.creator.picture"
        :alt="comment.creator.picture"
        class="col-md-2"
      />
      <div class="col-md-10 text-light">
        {{ comment.creator.name }}
      </div>
      <div class="col-md-12 text-light">
        {{ comment.body }}
      </div>
      <!-- TODO put a trash can icon here, and create a deleteComment method (this will work like any delete you've ever written) you have  plenty of reference for this -->
      <i
        v-if="comment.creatorId == account.id"
        class="selectable mdi mdi-trash-can-outline text-light"
        @click="removeComment"
      ></i>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'
import { commentsService } from '../services/CommentsService.js'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {

    return {
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      async removeComment() {
        try {
          if (await Pop.confirm()) {
            await commentsService.removeComment(props.comment.id)
            Pop.toast('Comment Deleted!', 'success')

          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>