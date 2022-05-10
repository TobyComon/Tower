<template>
  <div class="container">
    <form @submit.prevent="create" id="commentForm" class="text-center">
      <div class="mb-3">
        <label for="body" class="form-label"></label>
        <input
          type="text"
          class="form-control"
          name="body"
          id="body"
          aria-describedby="helpId"
          placeholder=""
          v-model="editable.body"
          required
        />
      </div>
      <button class="btn btn-success" type="submit">Submit</button>
    </form>
  </div>
</template>


<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'
import { commentsService } from '../services/CommentsService.js'

export default {
  setup() {
    const route = useRoute()
    const editable = ref({ eventId: route.params.id })
    return {
      editable,
      async create() {
        try {
          await commentsService.createComment(editable.value)
          document.getElementById("commentForm").reset();

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