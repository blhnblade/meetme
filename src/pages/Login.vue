<template>
    <div class="form-container">
        <div class="form">
            <div class="form-header">
                <div class="form-heading">Авторизация</div>
            </div>
            <div class="form-body">
                <!-- <transition name="form-inputs-appearance"> -->
                <div class="form-inputs">
                    <div class="form-input-container">
                        <label for="email">E-mail</label>
                        <input 
                            type="text" 
                            id="email" 
                            class="form-input" 
                            :class="{'form-input-error': v$.email.$error}"
                            v-model="email" 
                            autocomplete="off"
                            @input="()=>{v$.email.$touch(); clearErrorAuth()}"
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
                                @input="()=>{v$.password.$touch(); clearErrorAuth()}"
                            >
                    </div>
                    <div class="form-fetch-error" v-if="errorAuth">Введеные данные неверны</div>
                </div>
                <!-- </transition> -->
                <div class="form-buttons">
                    <div class="form-button-next" @click="submitForm">Авторизоваться</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { minLength, required, email } from '@vuelidate/validators';
export default{
    data(){
        return{
            email: '',
            password: '',
            v$: useVuelidate(),
            errorAuth: false,
        }
    },

    validations:{
        email:{
            required,
            minLength: minLength(4),
            email,
        },
        password:{
            required,
            minLength: minLength(3),
        }
    },
    methods:{
        async submitForm(){
            if(this.v$.$invalid){
                this.v$.$touch()
                return
            }

            const formData = {
                email: this.email,
                password: this.password,
            }

            try{
                await this.$store.dispatch('login', formData)
                this.$router.push('/')
            } catch(e){
                this.errorAuth = true
            }
        },
        clearErrorAuth(){
            this.errorAuth = false
        }
    }
}
</script>

<style scoped lang="scss">
.form-inputs{
    position: relative;
}
.form-fetch-error{
    position: absolute;
    bottom: -27px;
    left: 0;
    font-size: 14px;
}
.form-input-error{
    border-color: #683232;
}
</style>