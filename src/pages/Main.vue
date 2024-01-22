<template>
    <div class="main">
        <div class="container">
            <div class="main-wrapper">
                <div class="heading d-flex align-items-center justify-content-between">
                    <div class="page-heading">Услуги</div>
                    <a href="#" @click.prevent="this.$router.push('/create')" class="button button-m button-blue">Создать задание</a>
                </div>
                <Loader :wrapper="true" v-if="this.loading"/>
                <div v-else class="job-wrapper d-flex flex-column">

                    <template v-if="services.length">
                        <CardJob 
                            v-for="(service, indx) of this.services" 
                            :key="indx" 
                            :service="service"
                            :lock="this.requests.includes(service.job_id)" 
                            @send="sendRequest"
                        />
                    </template>
                    <div v-else>Пока что ничего нет :(</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import CardJob from '@/components/CardJob.vue'
export default{
    components: { CardJob },
    data(){
        return{
            loading: true,
            services: null,
            userId: null,
            
        }
    },
    computed:{
        requests(){
            return this.$store.getters.requests
        }
    },
    methods: {
        async sendRequest(job_id, creator_id, job_name){
            try{
                this.$store.commit('addRequest', job_id)
                await this.$store.dispatch('sendRequest',{ job_id, creator_id, job_name })
                await this.$store.dispatch('saveRequest', {job_id, creator_id})
            } catch (e) {
                console.log('sendRequest', e)
            }
        }
    },
    async mounted(){
        try{
            let city;

            if(!this.$store.getters.info){
                city = (await this.$store.dispatch('fetchInfo')).city;
            } else {
                city = this.$store.getters.info.city;
            }
            console.log(city)
            this.userId = await this.$store.dispatch('getUID')

            
            const services = await this.$store.dispatch('fetchServices', city); 

            const promises = (Object.keys(services).map(async (serviceId) => {
                return {
                    job_id: serviceId,
                    creator_id: services[serviceId].creator_id,
                    name: services[serviceId].name,
                    description: services[serviceId].description,
                    price: services[serviceId].price,
                    date: services[serviceId].date,
                    creator_name: services[serviceId].creator_name,
                    avatarUrl: await this.$store.dispatch('getAvatarWithId', services[serviceId].creator_id),
                    
                }
            }))

            
            this.services = (await Promise.all(promises)).reverse()
            
            this.loading = false;

        } catch(e){
            console.log(e, 'Ошибка path: /')
        }
    }

}
</script>

<style lang="scss" scoped>
.main{
    margin-top: 65px;
    flex-grow: 1;
    &-wrapper{   
    }
}

.heading{
    margin-bottom: 65px;
}

.job{
    background-color: #1E1F21;
    position: relative;
    border-top-left-radius: 8px;

    &-wrapper{
        row-gap: 3px;

        & > :first-child{
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }

        & > :last-child{
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }
    }
}
</style>