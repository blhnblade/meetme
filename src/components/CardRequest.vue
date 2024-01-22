<template>
<div class="user-card card d-flex flex-column">
    <div class="user-card-heading d-flex align-items-center">
        <img class="user-card-avatar" :src="request?.creator_avatar ">
        <div class="user-card-name">{{ request.creator_name }}</div>
    </div>
    <div class="user-card-job d-flex flex-column">
        <div class="d-flex flex-column">
            <div class="user-card-description-heading">Задание:</div>
            <div class="user-card-description">{{ request.name }}</div>
        </div>
    </div>
    <div class="user-card-number d-flex flex-column">
        <div class="d-flex flex-column">
            <div class="user-card-description-heading">Цена:</div>
            <div>{{ request.price }}</div>
        </div>
    </div>
    <!-- {{ request }} -->
</div>    
</template>

<script>
export default{
    props: ['request']

}
</script>

<style lang="scss" scoped>
.card{
    background-color: #1E1F21;
}
</style>