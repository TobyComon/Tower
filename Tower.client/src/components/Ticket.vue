<template>
    <div class="container">
<div class="row">
    <div class="col-md-12">
     {{ticket.name}}
    </div>
   <img :src="ticket.img" :alt="ticket.img">
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
    setup(){
        return {
        
        }
    }
}
</script>


<style lang="scss" scoped>

</style>