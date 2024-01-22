<template>
<div class="user-card">   
    <div class="user-card-heading d-flex align-items-center">
        <img class="user-card-avatar" :src="person?.performer_avatar || person.customer_avatar ">
        <div class="user-card-name">{{ person.name }}</div>
    </div>
    <div class="user-card-job d-flex flex-column">
        <div class="d-flex flex-column">
            <div class="user-card-description-heading">Задание:</div>
            <div class="user-card-description">{{ person.job_name }}</div>
        </div>
    </div>
    <div class="user-card-number d-flex flex-column">
        <div class="d-flex flex-column">
            <div class="user-card-description-heading">Телефон:</div>
            <div>{{ person.number }}</div>
        </div>
    </div>
    <div class="user-card-number d-flex flex-column">
        <div class="d-flex flex-column">
            <div class="user-card-description-heading">E-mail:</div>
            <div>{{ person.email }}</div>
        </div>
    </div>
    <button v-if="buttonOn" class="button button-s button-blue" type="button" @click="() => { this.$emit('send', person.performer_id, person.job_name) }">Отправить свой номер телефона для связи</button>
</div>
</template>

<script>
export default{
    props: {
        person: {
            required: true,
        },
        buttonOn: {
            default: true,
        }
    },
    mounted(){
        console.log(this.person, 'person')
    }
}
</script>

<style lang="scss" scpoed>

</style>