<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
       <h1>
           text
       </h1> {{ ticket.account.name }}
      </div>
      <img :src="ticket.account.picture" :alt="ticket.account.picture" :title="ticket.account.name" />
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