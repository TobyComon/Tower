<template>
  <div class="text-light">
    <div>
      <h3>{{ ticket.event.name }}</h3>
      <i
        class="mdi mdi-trash-can-outline text-light selectable"
        @click="cancelTicket"
      ></i>
    </div>
    <img
      class="img-fluid"
      :src="ticket.event.coverImg"
      :alt="ticket.event.coverImg"
    />
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { ticketsService } from '../services/TicketsService.js'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'
export default {
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      myTickets: computed(() => AppState.myTickets),
      async cancelTicket() {
        try {
          if (await Pop.confirm('Cancel Ticket?')) {
            await ticketsService.cancelTicket(props.ticket.id)
            Pop.toast('Ticket Cancelled', 'success')
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