<template>
    <div class="main">
        <div class="container">
            <div class="main-wrapper">
                <div class="heading d-flex align-items-center justify-content-between">
                    <div class="page-heading">Одобрения</div>
                </div>
                <Loader :wrapper="true" v-if="loading"></Loader>
                <template v-else>
                    <div class="content" v-if="approval.length">
                        <div class="warning-performer-agree">Вас одобрили в качестве исполнителя:</div>
                        <div class="user-card-wrapper d-flex">
                            <CardOffer 
                                v-for="a of approval" 
                                :key="a.approvalId"
                                :person="a" 
                                :buttonOn="false" 
                            />
                        </div>
                    </div>
                    <div class="warning-create-job" v-else>
                        <div>Пусто :(</div>
                        <a @click.prevent="this.$router.push('/')" >Откликайтесь на задания, чтобы вас выбрали</a>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import CardOffer from '@/components/CardOffer'

export default{
    components: { CardOffer },
    data(){
        return {
            loading: true,
            approval: null,
        }
    },
    async mounted(){
        try{
            this.approval = await Promise.all(await this.$store.dispatch('fetchApproval'))
            console.log(this.approval, 'this')
            this.loading = false
            
        } catch (e) {
            
        }
    }
}
</script>

<style scoped lang="scss">
.page-heading{
    margin-bottom: 25px
}
</style>