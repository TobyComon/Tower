<template>
    <div class="container-fluid">
        <div class="row">
            <img :src="comment.creator.picture" :alt="comment.creator.picture" class="col-md-2">
              <div class="col-md-10 text-light">
                {{comment.creator.name}}
              </div>
              <div class="col-md-12 text-light">
                {{comment.body}}
              </div>
            </div>

    </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
export default {
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    setup(){
        const route = useRoute

        return {
            // comments: computed(() => AppState.comments)
        }
    }
}
</script>


<style lang="scss" scoped>

</style>