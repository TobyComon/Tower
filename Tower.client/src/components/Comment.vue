<template>
    <div class="container-fluid">
        <div class="row">
            <img :src="comment.creator.picture" alt="">
              <div class="col-md-12">
                {{comment.creator.name}}
              </div>
              <div class="col-md-12">
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
    setup(props){
        const route = useRoute

        return {
            comments: computed(() => AppState.comments)
        }
    }
}
</script>


<style lang="scss" scoped>

</style>