<template>
    <div class="main">
        <div class="container">
            <div class="main-wrapper">
                <div class="heading d-flex align-items-center">
                    <div class="page-heading">Мои задания</div>
                </div>
                <Loader :wrapper="true" v-if="loading"/>
                <template v-else>
                    <div v-if="this.jobs?.length" class="jobs-wrapper d-flex flex-column">

                        <CardPropsedJobs
                            v-for="job of this.jobs"
                            :key="job.job_id" 
                            :job="{
                                date: job.date,
                                name: job.name,
                                description: job.description,
                                price: job.price,
                                job_id: job.job_id
                            }"
                            @delete="(job_id)=>{deleteJob(job_id)}"
                        />
                    </div>
                    <div class="warning-create-job" v-else>
                        <div>Пусто :(</div>
                        <a @click.prevent="this.$router.push('/')" >Создайте свой первый заказ!</a>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import CardPropsedJobs from '@/components/CardPropsedJobs'
export default{
    components: {
        CardPropsedJobs,
    },
    data(){
        return{
            jobs: null,
            loading: true,
        }
    },
    methods: {
        async deleteJob(id){
            this.jobs = this.jobs.filter(job => job.job_id !== id)
            await this.$store.dispatch('deleteJob', id);
            console.log('Удалено')
        },

        async getJobs(){
            let response = await this.$store.dispatch('fetchMyExistingJobs')
            console.log(response)
            if(!response){ this.loading = false; this.jobs = null; return } 
            
            this.jobs = Object.keys(response).map(id => {
                return {
                    job_id: id,
                    name: response[id].name,
                    description: response[id].description,
                    price: response[id].price,
                    date: response[id].date
                }
            }).reverse()
            
            this.loading = false;
        }
    },
    async mounted(){
       await this.getJobs()
    }
}
</script>

<style scoped lang="scss">
.main{
    margin-top: 65px;
    flex-grow: 1;
    &-wrapper{   
    }
}
.heading{
    margin-bottom: 65px;
}

.form-items{
    row-gap: 20px;
}

.jobs-wrapper{
    row-gap: 3px;
}

.job{
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.486);
    border-radius: 12px;
}
</style>