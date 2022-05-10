<template>
  <div class="container">
    <form @submit.prevent="create" id="towerEventForm" class="text-center">
      <div class="mb-3">
        <label for="name" class="form-label"></label>
        <input
          type="text"
          class="form-control"
          name="name"
          id="name"
          aria-describedby="helpId"
          placeholder="Event Name..."
          v-model="editable.name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label"></label>
        <input
          type="text"
          class="form-control"
          name="description"
          id="description"
          aria-describedby="helpId"
          placeholder="Event Description..."
          v-model="editable.description"
          required
        />
      </div>
      <div class="mb-3">
        <label for="img" class="form-label"></label>
        <input
          type="text"
          class="form-control"
          name="img"
          id="img"
          aria-describedby="helpId"
          placeholder="Event Image..."
          v-model="editable.coverImg"
          required
        />
      </div>
      <div class="mb-3">
        <label for="location" class="form-label"></label>
        <input
          type="text"
          class="form-control"
          name="location"
          id="location"
          aria-describedby="helpId"
          placeholder="Event location..."
          v-model="editable.location"
          required
        />
      </div>
      <div class="mb-3">
        <label for="capacity" class="form-label"></label>
        <input
          type="text"
          class="form-control"
          name="capacity"
          id="capacity"
          aria-describedby="helpId"
          placeholder="Event Capacity..."
          v-model="editable.capacity"
          required
        />
      </div>
      <div class="mb-3">
        <label for="date" class="form-label"></label>
        <input
          type="date"
          class="form-control"
          name="date"
          id="date"
          aria-describedby="helpId"
          placeholder="Event Date..."
          v-model="editable.startDate"
          required
        />
      </div>
      <div class="mb-3">
        <label for="type" class="form-label"></label>
        <input
          type="text"
          class="form-control"
          name="type"
          id="type"
          aria-describedby="helpId"
          placeholder="Event Type..."
          v-model="editable.type"
          required
        />
      </div>
      <button class="btn btn-success" type="submit">Submit</button>
    </form>
  </div>
</template>


<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { Modal } from 'bootstrap';
export default {
  setup() {
    const editable = ref({});
    const router = useRouter()
    return {
      editable,
      async create() {
        try {
          const newTowerEvent = await towerEventsService.createTowerEvent(editable.value)

          // REVIEW I'm not passing the eventId correctly
          document.getElementById("towerEventForm").reset();
          Modal.getOrCreateInstance(
            document.getElementById("newTowerEventModal")
          ).toggle();
          router.push({
            name: "TowerEventDetailsPage",
            params: { id: newTowerEvent.id }
          })
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