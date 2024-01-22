<template>
    <div class="main">
        <div class="container">
            <div class="main-wrapper">
                <div class="heading d-flex align-items-center">
                    <div class="page-heading">Создать задание</div>
                </div>
                <form>
                    <div class="form-items d-flex flex-column">
                        <div class="d-flex flex-column">
                            <div class="create-job-heading">Как назвать задание?</div>
                            <input 
                                class="form-input create-job-input" 
                                :class="{ 'form-input-error': v$.jobName.$error }"
                                type="text" 
                                v-model="jobName"
                            >
                        </div>
                        <div class="d-flex flex-column">
                            <div class="create-job-heading">Полное описание задания:</div>
                            <textarea 
                                v-model="jobDescription" 
                                class="create-job-textarea"
                                :class="{ 'form-input-error': v$.jobDescription.$error }"
                            >
                            </textarea>
                        </div>
                        <div class="d-flex flex-column">
                            <div class="create-job-heading">Предлагаемая цена:</div>
                            <input 
                                class="form-input create-job-input" 
                                :class="{ 'form-input-error': v$.price.$error }"
                                type="text" 
                                v-model="price"
                            >
                        </div>
                    </div>
                    <input 
                        type="submit" 
                        value="Разместить" 
                        @click.prevent="submitHandler"
                        @click="notificationShow"
                        class="create-job-btn-create"
                    >
                </form>
            </div>
        </div>
        <teleport to="#notification-wrapper" v-if="notification">
            <div class="notification">Задание успешно создано</div>
        </teleport>
    </div>    
</template>

<script>
import notification from '@/mixins/notification';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, minValue } from '@vuelidate/validators'
export default{
    data(){
        return{
            jobName: '',
            jobDescription: '',
            price: null,
            v$: useVuelidate(),
        }
    },
    validations:{
        jobName: { 
            required,
            minLength: minLength(5)
        },
        jobDescription:{
            required,
            minLength: minLength(5)
        },
        price: {
            required,
            minValue: minValue(10)
        }
    },
    mixins: [ notification ],
    methods:{
        submitHandler(){
            if(this.v$.$invalid){
                this.v$.$touch()
                return
            }

            if(this.notificationIsActive) return
            try{
                const data = {
                    name: this.jobName,
                    description: this.jobDescription,
                    price: this.price,
                    date: (new Date()).toLocaleDateString(),
                }
                this.$store.dispatch('createJob', data)
                this.jobName = '';
                this.jobDescription = '';
                this.price = '';
                this.v$.$reset()
            } catch(e) {
                console.log('submitHandler', e)
            }
        },
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

.create-job{
    &-heading{
        margin-bottom: 8px;
        font-size: 20px;
    }

    &-textarea{
        background-color: #2A2B2E;
        resize: none;
        min-height: 90px;
        border-radius: 8px;
        border: 1px solid #4F5457;
        padding: 10px;
        font-size: 16px;
        &:focus{
            outline: none;
        }
    }
    
    &-input{
        background-color: #2A2B2E;
    }

    &-btn{
        &-create{
            margin-top: 40px;
            width: 100%;
            background-color: #65BFF0;
            border: none;
            font-size: 18px;
            padding: 10px 10px;
            cursor: pointer;
            border-radius: 8px;
            color: #151617;
            &:hover{

            }
        }
    }
}

.form-input-error{
    border-color: #683232;
}
</style>