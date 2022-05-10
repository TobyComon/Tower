<template>
  <div v-if="!editing" class="about text-center text-light">
    <div class="d-flex justify-content-center">
      <h1 class="me-2">Welcome {{ account.name }}</h1>
      <i
        class="text-light selectable mdi mdi-pencil-outline mdi-24px"
        @click="editing = true"
      ></i>
    </div>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <div class="row">
      <div class="col-6">
        <div>
          <!-- TODO render tickets here - remember, it doesn't have to look pretty to pass -->
          <MyTicket v-for="m in myTickets" :key="m.accountId" :ticket="m" />
        </div>
      </div>
    </div>
  </div>
  <form v-if="editing" @submit.prevent="editAccount">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input
        type="text"
        class="form-control"
        name="name"
        id="name"
        aria-describedby="helpId"
        placeholder="Name..."
        v-model="editable.name"
      />
    </div>
    <div>
      <label for="img" class="form-label">Profile Picture</label>
      <input
        type="text"
        class="form-control"
        name="img"
        id="img"
        v-model="editable.picture"
      />
    </div>
    <button type="submit" class="btn btn-success">Submit</button>
  </form>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'
import { towerEventsService } from '../services/TowerEventsService.js'
import { accountService } from '../services/AccountService.js'
import Ticket from '../components/Ticket.vue'
import { ticketsService } from '../services/TicketsService.js'
export default {
  name: "Account",
  setup() {
    const route = useRoute();
    const editing = ref(false);
    const editable = ref({});
    onMounted(async () => {

      try {
        await ticketsService.getTicketsByAccount(route.params.id);
      }
      catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      editing,
      editable,
      async editAccount() {
        try {
          await accountService.editAccount(editable.value);
          Pop.toast("Account Updated!", "success");
          editing.value = false;
        }
        catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      account: computed(() => AppState.account),
      //TODO need to iterate through this collection and render the Ticket component you already have
      myTickets: computed(() => AppState.myTickets)
    };
  },
  components: { Ticket }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
