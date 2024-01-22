<template>
    <div class="main">
        <div class="container">
            <div class="main-wrapper">
                <div class="heading d-flex align-items-center justify-content-between">
                    <div class="page-heading">Запросы на исполнение</div>
                </div>
                <Loader :wrapper="true" v-if="loading"/> 
                <template v-else>
                    <div class="content" v-if="this.requests.length">
                        <div class="warning-performer-agree">Ваши отклики на задания:</div>
                        <div class="user-card-wrapper d-flex">
                            <CardRequest 
                                v-for="request of requests"
                                :request="request"
                                :key="request.id"
                            />
                        </div>
                    </div>
                    <div class="warning-create-job" v-else>
                        <div>Пусто :(</div>
                        <a @click.prevent="this.$router.push('/')" >Откликайтесь на задания, здесь отобразятся ваши отклики</a>
                    </div>
                </template>
                
            </div>
        </div>
    </div>
</template>

<script>
import CardRequest from '@/components/CardRequest'
export default{
    components: {
        CardRequest,
    },
    data(){
        return {
            loading: true,
            requests: null,
        }
    },

    async mounted(){
        if(!this.requests){
            this.requests = await this.$store.dispatch('fetchCityRequests')
            console.log(this.requests)
            this.loading = false
        }
    }

}
</script>

<style lang="scss" scoped>
.page-heading{
    margin-bottom: 25px
}
</style>