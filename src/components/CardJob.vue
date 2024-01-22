<template>
    <div class="job d-flex align-items-center">
        <div class="job-date">{{ service?.date }}</div>
        <div class="job-left d-flex flex-column">
            <div class="job-name">{{ service.name }}</div>
            <div class="d-flex flex-column">
                <div class="job-description-heading">Описание задачи:</div>
                <div class="job-description">{{ service.description }}</div>
            </div>
        </div>
        <div class="job-line"></div>    
        <div class="job-right">
                <div class="d-flex align-items-center">
                    <img class="job-user-avatar" :src="service.avatarUrl">
                    <div class="job-connect d-flex flex-column align-items-center">
                        <div class="job-author-name">{{ service?.creator_name }}</div>
                        <button 
                            class="button button-s button-white job-btn-request"
                            :class="{request: lock}"
                            @click="()=>{this.$emit('send', service.job_id, service.creator_id, service.name)}"
                            :disabled="!(service.creator_id !== userId) || lock">
                            <template v-if="lock">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M22 2L11 13" stroke="#28282C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#28282C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Запрос отправлен
                            </template>
                            <template v-else>
                                Откликнуться
                            </template>
                        </button>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
export default{
    props: ['service', 'lock'],
    data(){
        return{
            userId: null
        }
    },
    async mounted(){
        this.userId = await this.$store.dispatch('getUID')
    }
}
</script>

<style lang="scss" scoped>
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

    &-left{
        flex-grow: 1;
        padding: 40px 10px 30px 30px;
    }

    &-line{
        align-self: stretch;
        width: 2px;
        background-color: #151617;
    }

    &-right{
        width: 358px;
        padding: 20px 20px 24px;
    }

    &-name{
        color: #FFF;
        font-size: 20px;
        line-height: 130%;
        margin-bottom: 10px;
    }

    &-date{
        position: absolute;
        top: 0;
        left: 0;
        padding: 4px 9px 5px 10px;
        background-color: #333638;
        border-bottom-right-radius: 8px;
        border-top-left-radius: 8px;
    }

    &-description{
        color: #FFF;
        font-size: 16px;
        line-height: normal;

        &-heading{
            color: #989898;
            font-size: 16px;
            line-height: normal;
        }
    }

    &-user{
        &-avatar{
            width: 75px;
            height: 75px;
            min-width: 75px;
            min-height: 75px;
            max-width: 75px;
            max-height: 75px;
            object-fit: cover;
            object-position: center;
            border-radius: 100%;
            margin-right: 35px;
        }
    }

    &-author{
        &-name{

        }
    }

    &-btn{
        &-request{
            margin-top: 8px;
            width: 100%;
            min-width: 218px;
            text-align: center;
        }
    }

    &-connect{
        flex-grow: 1;
    }
}

.request{
    border-color: #ACDEF9;
    display: flex;
    align-items: flex-start;
    white-space: nowrap;
    color: #ACDEF9;
    & svg{
        width: 20px;
        height: 20px;
        margin-right: 10px;
        
        & path{
            stroke: #ACDEF9;
        }
    }
}
</style>