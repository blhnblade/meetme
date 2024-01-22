<template>
    <div class="wrapper">
        <div class="linear-background"></div>
        <div class="content">
            <HeaderAuth :page="page"/>
            <router-view></router-view>
            <div class="appeal" v-if="page === '/login'">Помогай и зарабатывый прямо сейчас!</div>
        </div>
    </div>
</template>

<script>
import HeaderAuth from '../components/HeaderAuth.vue';
export default{
    components:{
        HeaderAuth,
    },
    computed:{
        page(){
            return this.$route.path
        }
    },
}
</script>

<style scoped lang="scss">
.appeal{
    font-size: 14px;
    text-align: center;
    padding-bottom: 7px;
    color: #a2a0a0;
}
</style>