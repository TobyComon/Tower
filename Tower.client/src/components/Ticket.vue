<template>
    <div class="container">
<div class="row">
    <div class="col-md-12">
     {{ticket.name}}
    </div>
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
    setup(props){
        return {
        
        }
    }
}
</script>


<style lang="scss" scoped>

</style>