<template>
<div class="card-list d-flex align-items-center">
    <div class="card-list-date">{{ job.date }}</div>
    <div class="card-list-name d-flex flex-column">
        <div class="card-list-name-f">{{ job.name }}</div>
        <div class="card-list-name-s">{{ job.description }}</div>
    </div>
    <div class="card-list-price">{{ job.price }} Р</div>
    <button 
        class="card-list-delete"
        @click="()=>{deleteJob(job.job_id)}"
    >
        Удалить
    </button>
</div>
</template>

<script>
export default {
    props: [
        'job'
    ],
    methods: {
        deleteJob(job_id){
            this.$emit('delete', job_id)
        }
    }
}
</script>

<style lang="scss" scoped>
.card-list{
    padding: 32px 25px 15px;
    border-radius: 12px;
    background-color: rgba(0, 0, 0, 0.486);
    position: relative;
    &-date{
        position: absolute;
        top: 0;
        left: 0;
        background-color: #333638;
        border-radius: 8px;
        padding: 2px 9px 2px;
    }
    &-name{
        flex-grow: 1;
        &-f{
            margin-bottom: 8px;
            font-size: 18px;
        }
        &-s{}
    }
    &-price{
        margin-left: 40px;
        font-size: 20px;
    }
    &-delete{
        padding: 8px 15px;
        background-color: transparent;
        border: 1px solid #65BFF0;
        border-radius: 8px;
        color: #65BFF0;
        margin-left: 40px;
        cursor: pointer;
        transition-property: color, border;
        transition-duration: .15s;

        &:hover{
            color: #ACDEF9;
            border-color: #ACDEF9;
        }
    }
}
</style>