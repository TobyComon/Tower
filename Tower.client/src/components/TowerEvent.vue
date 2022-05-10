<template>
  <div class="col-md-4 mb-5">
    <router-link :to=" { name: 'TowerEventDetailsPage', params: { id: towerEvent.id } }">

      <div class="card justify-content-between rounded  event-card " >
        <img
        class="card-img-top"
        :src="towerEvent.coverImg"
        :alt="towerEvent.coverImg"
      />
      <div class="card-img-overlay blur">
        <h2 v-if="towerEvent.capacity <= 0" class="text-danger">
        {{towerEvent.name}}
        </h2>
        <h2 v-else class="pointer card-title" @click="goToDetailsPage">
          {{ towerEvent.name }}
          <i v-if="attending" class="mdi mdi-star text-warning"></i>
        </h2>
        <h6>{{towerEvent.location}}</h6>
        <p class="mt-2 card-text">{{ towerEvent.description }}</p>
        <h6 class="">{{new Date(towerEvent.startDate).toDateString()}}</h6>
        <div class="d-flex flex-row-reverse">
          <h6 class="ms-2">Spots left</h6>
            <h5 v-if="towerEvent.capacity <= 25" class="text-danger"><u> Only {{towerEvent.capacity}}</u></h5>
            <h6 v-else-if="towerEvent.capacity <= 50" class="text-warning">{{towerEvent.capacity}}</h6>
            <h6 v-else class="text-primary">{{towerEvent.capacity}}</h6>
        </div>
      </div>
    </div>
          </router-link>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
export default {
  props: {
    towerEvent: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      attending: computed(() => {
        let attending = AppState.myTickets.find(a => a.id == props.towerEvent.id)
        if (attending) {
          return true
        }
        return false
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.pointer{
    transition: color .5s;
}
.pointer:hover {
  cursor: pointer;
  width: fit-content;
  color: rgba(26, 26, 193, 0.802);
}
.event-card{
    max-height: fit-content;
    max-width: fit-content;
    // overflow-y: auto;
}
.blur{
    display: grid;
    max-height: fit-content;
    backdrop-filter: blur(9px);
    // box-sizing: border-box;
    position: absolute;
    // top: 22.7em;
    top:auto;
    color: var(--bs-light);
}
.card-text{
    color: rgb(158, 195, 232);
}

</style>