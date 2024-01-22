<template>
    <div class="main">
        <div class="container">
            <div class="main-wrapper">
                <div class="heading d-flex align-items-center justify-content-between">
                    <div class="page-heading">Исполнители</div>
                </div>
                <Loader :wrapper="true" v-if="loading"></Loader>
                <template v-else>
                    <div class="content" v-if="performers.length">
                        <div class="warning-performer-request">Эти люди хотят быть вашим исполнителем:</div>
                        <div class="user-card-wrapper d-flex">

                            <CardOffer 
                                v-for="performer of performers" 
                                :key="performer.performerListId" 
                                :person="performer"
                                
                                @send="()=>{sendNumber(performer.performer_id, performer.job_name, performer.job_id)}"
                            />

                        </div>
                    </div>

                    <div class="warning-create-job" v-else>
                        <div>Пусто :(</div>
                        <a @click.prevent="this.$router.push('/')" >Создайте свой первый заказ, чтобы привлечь исполнителей!</a>
                    </div>

                </template>
            </div>
        </div>
    </div>
</template>

<script>
import CardOffer from '@/components/CardOffer.vue'

export default{
    components: { CardOffer },
    data(){
        return {
            loading: true,
            performers: null,
        }
    },
    methods:{
        async sendNumber(performer_id, job_name, job_id){
            console.log('send', performer_id, job_name, job_id)
            await this.$store.dispatch('sendNumber', {performer_id, job_name, job_id})
        }
    },
    async mounted(){
        try{
            const response = await this.$store.dispatch('fetchPerformers')
            this.performers = await Promise.all(response)
            this.loading = false;
            console.log(this.performers, 'perf')
        } catch(e) {
            console.log(e)
        }
    }
}
</script>

<style scoped lang="scss">
.page-heading{
    margin-bottom: 25px;
}
</style>