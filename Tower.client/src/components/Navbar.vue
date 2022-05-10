<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column">
        <img alt="logo" src="../assets/img/Logo.png" height="45" />
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      
      
        <!-- <li>
          <router-link
            :to="{ name: 'About' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            
          </router-link>
        </li> -->
        <div class="d-flex">
          <button
          class="btn btn-success text-light"
          type="button"
          @click="openModal"
          >Add Event</button>
        </div>
       <Modal id="newTowerEventModal">
         <template #title>
           <h3>Add Event</h3>
         </template>
         <template #body>
           <TowerEventForm />
         </template>
       </Modal>
      
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>


import { Modal } from "bootstrap";
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import TowerEventForm from "./TowerEventForm.vue";
export default {
    setup() {
        return {
          towerEvents: computed(() => AppState.towerEvents),
          openModal() {
            document.getElementById("towerEventForm").reset();
            Modal.getOrCreateInstance(
              document.getElementById("newTowerEventModal")
            ).toggle();
          },
        };
    },
    // components: { Modal, TowerEventForm, TowerEventForm }
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
