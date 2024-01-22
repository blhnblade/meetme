<template>
    <div class="form-container" v-if="formVisible">
        <div class="form">
            <div class="form-header">
                <div class="form-heading">Регистрация</div>
                <div class="form-step-count">
                    <div class="form-step" :class="{active: step === 1}">1</div>
                    <div class="form-step" :class="{active: step === 2}">2</div>
                    <div class="form-step" :class="{active: step === 3}">3</div>
                </div>
            </div>
            <div class="form-body">
                <!-- <transition name="form-inputs-appearance"> -->
                <div class="form-inputs" v-if="step === 1">
                    <div class="form-input-container">
                        <label for="email">E-mail</label>
                        <input 
                            type="text" 
                            id="email" 
                            class="form-input"
                            :class="{'form-input-error': v$.email.$error}" 
                            v-model="email" 
                            autocomplete="off"
                        >
                    </div>
                    <div class="form-input-container">
                        <label for="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            class="form-input"
                            :class="{'form-input-error': v$.password.$error}"  
                            v-model="password" 
                            autocomplete="off"
                        >
                    </div>
                </div>
                <!-- </transition> -->
                <!-- <transition name="form-inputs-appearance"> -->
                <div class="form-inputs" v-if="step === 2">
                    <div class="form-input-container">
                        <label for="name">Как вас зовут?</label>
                        <input 
                            type="text" 
                            id="name" 
                            class="form-input"
                            :class="{'form-input-error': v$.name.$error}"  
                            v-model="name" 
                            autocomplete="off"
                        >
                    </div>
                    <div class="form-input-container" @click.stop>
                        <label for="city">Ваш город</label>
                        <div class="form-input-dropdown-container">
                            <div @click="openCityList">
                                <input 
                                    type="text" 
                                    id="city" 
                                    class="form-input" 
                                    :class="{'form-input-error': v$.city.$error || notCityInList}" 
                                    v-model="city" 
                                    autocomplete="off" 
                                    placeholder="Выберите город"
                                    @input="filterCity"
                                >
                            </div>
                            <div class="form-input-dropdown" v-if="cityListIsOpen">
                                <div 
                                    class="form-input-dropdown-item" 
                                    v-for="filterCity of filterCities" 
                                    :key="filterCity"
                                    @click="()=>{changeCity(filterCity)}"
                                >
                                    {{ filterCity }}
                                </div>
                                <div 
                                    class="form-input-dropdown-item" 
                                    v-if="!filterCities.length"
                                >
                                    Пусто :(
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-inputs" v-if="step === 3">
                    <div class="form-input-container">
                        <label for="name">Ваш номер телефона</label>
                        <input 
                            type="text" 
                            id="name" 
                            class="form-input" 
                            :class="{'form-input-error': v$.number.$error}" 
                            v-model="number" 
                            autocomplete="off"
                        >
                    </div>
                    <div class="form-input-container">
                        <input 
                            type="checkbox" 
                            class="checkbox-input hidden" 
                            id="agree" 
                            v-model="userAgree"
                        >
                        <label for="agree" class="checkbox-label d-flex align-items-center">
                            <div class="checkbox-external">
                                <svg class="checkbox-inner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 7" fill="none">
                                    <path d="M1 4.03906L3.25444 6.29305L8.2917 1.25578" stroke="#989898"/>
                                </svg>
                            </div>
                            <div class="checkbox-text">Я согласен с обработкой персональных данных</div>
                        </label>
                    </div>
                </div>
                <!-- </transition> -->
                <div class="form-buttons">
                    <div class="form-button-next" @click="step++" v-if="step !== 3">Вперед →</div>
                    <div class="form-button-next" @click="submitForm" v-if="step === 3">Зарегистрироваться</div>

                    <div class="form-button-prev" v-if="step !== 1" @click="step--">← Назад</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { minLength, required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

import cities from '@/utils/cities'
export default{
    data(){
        return{
            email: '',
            password: '',
            name: '',
            city: '',
            number: '+7',
            userAgree: false,
            v$: useVuelidate(),
            step: 1,
            objectCities: Object.keys(cities),
            filterCities: Object.keys(cities),
            cityListIsOpen: false,
            notCityInList: false,
            formVisible: true,
        }
    },
    watch:{
        number(newValue, oldValue){
            if(isNaN(parseInt(newValue[newValue.length - 1]))){
                this.number = oldValue;
            }
            if(newValue.length > 12){
                this.number = oldValue
            }
            if(newValue.length < 2){
                this.number = '+7'
            }
        }
    },
    validations:{
        email: {
            required,
            minLength: minLength(4),
            email
        },
        password: {
            required,
            minLength: minLength(3)
        },
        name: {
            required,
            minLength: minLength(3)
        },
        city: {
            required,
            minLength: minLength(3)
        },
        number:{
            required,
            minLength: minLength(12)
        },
        userAgree:{
            checked: (v) => v
        }

    },
    methods:{
        async submitForm(){
            if(!this.objectCities.includes(this.city)){this.notCityInList = true; console.log('Нет такого города!'); return}
            
            if(this.v$.$invalid){
                this.v$.$touch();
                return
            }

            let formData = {
                email: this.email,
                password: this.password,
                name: this.name,
                city: cities[this.city],
                number: this.number
            }

            try{

                await this.$store.dispatch('register', formData)
                this.formVisible = false;
                this.$router.push('/')
            } catch(e){
                console.log(e, 'Ошибка')
            }
            
        },
        changeCity(city){
            this.city = city;
            this.closeCityList()
            console.log(this.city)
        },
        openCityList(){
            this.cityListIsOpen = true
        },
        closeCityList(){
            this.cityListIsOpen = false;
        },
        filterCity(){
            if(!this.cityListIsOpen){ this.cityListIsOpen = true }
            if(this.notCityInList){ this.notCityInList = false }
            this.filterCities = this.objectCities.filter(city => city.includes(this.city))
        }
    },
    mounted(){
        window.addEventListener('click', this.closeCityList)
    },
    beforeUnmount(){
        window.removeEventListener('click', this.closeCityList)
    }
}
</script>

<style lang="scss" scoped>
    /*
    .form-inputs-appearance-enter-from, .span-move-leave-to{
        opacity: 0;
        visibility: hidden;
    }

    .form-inputs-appearance-enter-active, .form-inputs-appearance-leave-active{
        transition-property: opacity, visibility;
        transition-duration: .15s, 0s;
    }

    .form-inputs-appearance-enter-to{
        opacity: 1;
    }
    */

.checkbox{
    &-external{
        width: 16px;
        height: 16px;
        border: 1px solid #989898;
        transition-property: border;
        transition-duration: .15s;
        position: relative;
    }

    &-inner{
        opacity: 0;
        transition-property: opacity;
        transition-duration: .15s;
        widows: 7px;
        height: 7px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &-text{
        color: #989898;
        transition-property: color;
        transition-duration: .15s;
        user-select: none;
        margin-left: 12px;
    }

    &-input:checked{
        & ~ .checkbox-label{
            .checkbox-external{
                border-color: #EBEBEB;
            }

            .checkbox-inner{
                opacity: 1;
                & path{
                    stroke: #EBEBEB;
                }
            }

            .checkbox-text{
                color: #EBEBEB;
            }
        }
    }
}
.form-input-error{
    border-color: #683232;
}
</style>