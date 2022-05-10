<template>
  <div class="container">
    <img
      :src="ticket.account.picture"
      :alt="ticket.account.picture"
      :title="ticket.account.name"
    />
    <!-- //TODO this is your choice, but you could also have some logic here that determines if the logged in user is the user that created this ticket - if they are, render a delete button -->
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
img {
  border-radius: 5%;
  max-height: 3em;
  max-width: 3em;
}
</style>