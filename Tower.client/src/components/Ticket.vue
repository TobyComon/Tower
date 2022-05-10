<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
       <h1>
           text
       </h1> {{ ticket.account.name }}
      </div>
      <img :src="ticket.account.picture" :alt="ticket.account.picture" :title="ticket.account.name" />
      <!-- //TODO this is your choice, but you could also have some logic here that determines if the logged in user is the user that created this ticket - if they are, render a delete button -->
    </div>
  </div>
</template>


<script>
export default {
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {

    }
  }
}
</script>


<style lang="scss" scoped>
</style>