<template>
  <div class="container-fluid">
    <div v-if="towerEvent">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="bg-dark shadow rounded p-2">
            <h1>{{ towerEvent.name }}</h1>
            <i
              v-if="
                towerEvent.creatorId == account.id && !towerEvent.isCanceled
              "
              class="mdi mdi-trash-can-outline selectable"
              @click="cancelTowerEvent"
            ></i>
            <p v-if="!towerEvent.isCanceled">{{ towerEvent.description }}</p>
            <p v-else class="text-danger">Event Has Been Cancelled :(</p>
          </div>
        </div>
        <div class="col-md-6 text-light">
          <img :src="towerEvent.coverImg" :alt="towerEvent.coverImg" />
          <h4>{{ towerEvent.location }}</h4>
          <h5>{{ new Date(towerEvent.startDate).toDateString() }}</h5>
          <h5>{{ towerEvent.capacity }} Spots left</h5>

          <button
            v-if="
              towerEvent.capacity > 0 && !hasTicket && !towerEvent.isCanceled
            "
            class="btn btn-success"
            @click="createTicket"
          >
            Attend
          </button>
        </div>
      </div>

      <div class="row">
        <Ticket v-for="t in tickets" :key="t.id" :ticket="t" />
      </div>

      <div>
        <Comment v-for="c in comments" :key="c.id" :comment="c" />
      </div>
      <CommentForm />
    </div>

    <div v-else class="justify-contents-center">
      <div class="loader">
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <span class="text-light">Loading...</span>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'
import { AppState } from '../AppState.js'
import { towerEventsService } from '../services/TowerEventsService.js'
import { ticketsService } from '../services/TicketsService.js'
import Comment from '../components/Comment.vue'
import { commentsService } from '../services/CommentsService.js'
import CommentForm from '../components/CommentForm.vue'
import Ticket from '../components/Ticket.vue'
export default {
  setup() {
    const route = useRoute();
    const ticket = ref({});
    watchEffect(async () => {

      try {
        await towerEventsService.getTowerEventById(route.params.id);
        await towerEventsService.getTicketsByTowerEventId(route.params.id);
        await commentsService.getComments(route.params.id)
      }
      catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }

    })
    return {
      ticket,
      towerEvent: computed(() => AppState.towerEvent),
      // TODO need to create a computed here - call it "hasTicket" - iterate through the tickets, and see if the account Id on any ticket matches the logged in users account id
      //NFT from last week is great reference for this 
      hasTicket: computed(() => {
        let ticket = AppState.myTickets.find(t => t.eventId == route.params.id)
        if (ticket) {
          return true
        }
        return false
      }),
      tickets: computed(() => AppState.tickets),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      async createTicket() {
        try {
          await ticketsService.createTicket({ eventId: route.params.id });
          Pop.toast("Ticket Created!", "success");
        }
        catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async cancelTowerEvent() {
        try {
          await towerEventsService.cancelTowerEvent(route.params.id);
        }
        catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      }
    };
  },
  components: { Comment, CommentForm, Ticket }
}
</script>


<style lang="scss" scoped>
.loader {
  width: 120px;
  height: 75px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
}
.loader span {
  font-size: 22px;
  text-transform: uppercase;
  margin: auto;
}
.ball {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: var(--bs-light);
  animation: bounce 0.5s alternate infinite;
}
.ball:nth-child(2) {
  animation-delay: 0.16s;
}
.ball:nth-child(3) {
  animation-delay: 0.32s;
}
@keyframes bounce {
  from {
    transform: scaleX(1.25);
  }
  to {
    transform: translateY(-50px) scaleX(1);
  }
}
h1 {
  animation-duration: 2s;
  animation-name: slidein;
}
@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }
  to {
    margin-left: 0%;
    width: 100%;
  }
}
p {
  animation-duration: 3.5s;
  animation-name: slideup;
}
@keyframes slideup {
  from {
    color: rgba($color: #ecdbdb, $alpha: 0);
  }

  to {
    color: rgba($color: #e9e9e9, $alpha: 1);

    display: contents;
  }
}
</style>