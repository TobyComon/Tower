<template>
  <div class="container-fluid">
    <nav class="navbar bg-dark justify-content-evenly">
      <!-- <div class="col-md-2"> -->
        <button class="btn " @click="filterBy = ''">
        All
        </button>
        <button class="btn " @click="filterBy = 'concert'">
        Concerts
        </button>
        <button class="btn " @click="filterBy = 'sport'">
        Sports
        </button>
        <button class="btn " @click="filterBy = 'convention'">
        Conventions
        </button>
        <button class="btn " @click="filterBy = 'digital'">
        Digital
        </button>
      <!-- </div> -->
    </nav>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <TowerEvent v-for="t in filteredList" :key="t.id" :towerEvent="t" />
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { ref, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'
import { towerEventsService } from '../services/TowerEventsService.js'
import TowerEvent from '../components/TowerEvent.vue'
export default {
    name: "Home",
    setup() {
        const filterBy = ref("");
        const filteredList = ref([]);
        watchEffect(() => {
            let list = AppState.towerEvents;
            if (filterBy.value) {
                list = list.filter(l => l.type == filterBy.value);
            }
            filteredList.value = list;
        });
        watchEffect(async () => {
            try {
                await towerEventsService.getTowerEvents();
            }
            catch (error) {
                logger.error(error);
                Pop.toast(error.message, "error");
            }
        });
        return {
            filterBy,
            filteredList
        };
    },
    components: { TowerEvent }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
.btn{
  color: var(--bs-light);
  transition: color .6s;
}
.btn:hover{
  color: rgba(26, 26, 193, 0.802);
}

</style>
