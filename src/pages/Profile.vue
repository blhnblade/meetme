<template>
    <div class="main">
        <div class="container">
            <div class="main-wrapper">
                <div class="heading d-flex align-items-center">
                    <div class="page-heading">Мои профиль</div>
                </div>
                <Loader :wrapper="true" v-if="loading"/>
                <div 
                    class="d-flex flex-column" 
                    v-else
                >
                    <form 
                        action="#" 
                        @submit.prevent="saveChanges"
                        class="d-flex flex-column"
                    >
                        <div class="d-flex settings-wrapper">
                            <div class="d-flex flex-column align-items-center settings-avatar-container">
                                <img class="settings-avatar"  :src="''" ref="avatar">
                                <div 
                                    class="settings-avatar-upload"
                                    @click="clickInputFile"
                                    
                                >
                                    Загрузить аватар
                                </div>
                                <input 
                                    class="settings-avatar-input" 
                                    type="file" 
                                    ref="inputFile"
                                    @change="(e)=>{uploadAvatar(e); unlockBtnSave()}"
                                >
                            </div>
                            <div class="d-flex flex-column settings-container-right">
                                <div class="d-flex flex-column settings-input-container">
                                    <div class="settings-input-heading">Имя пользователя</div>
                                    <input 
                                        type="text" 
                                        class="settings-input form-input" 
                                        v-model="name"
                                        @input="unlockBtnSave"
                                    >
                                </div>
                                <div class="d-flex flex-column settings-input-container">
                                    <div class="settings-input-heading">Город</div>
                                    <input 
                                        type="text" 
                                        class="settings-input form-input" 
                                        v-model="city"
                                        @input="unlockBtnSave"
                                    >
                                </div>
                            </div>
                        </div>
                        <input 
                            type="submit" 
                            value="Сохранить"
                            class="settings-btn-save"
                            :disabled="btnSaveLock"
                            :class="{'settings-btn-save-lock': btnSaveLock}"
                        >
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import defaultAvatar from '@/assets/img/default-avatar.png'
export default{
    data(){
        return {
            loading: true,
            avatar: null,
            name: '',
            city: '',
            initialName: null,
            initialCity: null,
            initialAvatar: null,
            btnSaveLock: true,
        }
    },
    computed: {
        info(){
            return this.$store.getters.info
        }
    },
    watch: {
        info(newValue){
            let {name, city} = newValue;
            this.name = name;
            this.city = city;
            this.fillInitialValues()
        }
    },
    methods:{
        uploadAvatar(e){
            if(e.target.files[0]){
                let img = e.target.files[0];
                this.$refs.avatar.src = URL.createObjectURL(img);
                this.avatar = img;
                console.log(this.avatar,this.avatar === this.initialAvatar)
            }
        },
        async saveChanges(){
            try{
                console.log('save')
                await this.$store.dispatch('saveChanges', {
                    avatar: this.avatar === defaultAvatar ? null : this.avatar, 
                    name: this.name === this.initialName ? null : this.name, 
                    city: this.city === this.initialCity ? null : this.city
                })
                this.fillInitialValues(true)
                this.btnSaveLock = true;
            } catch (e){
                console.log(e)
            }
        },
        fillInitialValues(withAvatar = false){
            this.initialName = this.name
            this.initialCity = this.city
            if(withAvatar) { this.initialAvatar = this.avatar }
        },
        clickInputFile(){
            this.$refs.inputFile.click()
        },
        getUserData(){
            return this.$store.getters.info
        },
        unlockBtnSave(){
            this.btnSaveLock = true
            if(this.initialName !== this.name){
                this.btnSaveLock = false
            } else 
            if (this.initialCity !== this.city) {
                this.btnSaveLock = false
            } else
            if(this.initialAvatar !== this.avatar){ 
                this.btnSaveLock = false 
            }
            
        }
    },
    async mounted(){
        try{
            this.avatar = await this.$store.dispatch('getAvatar');
            this.initialAvatar = this.avatar
            console.log(this.avatar)
            
            setTimeout(()=>{
                this.$refs.avatar.src = this.avatar;
            }, 0)

            const userData = this.getUserData();
            if(userData){
                this.name = userData.name;
                this.city = userData.city;
                this.initialName = userData.name;
                this.initialCity = userData.city;
            }

            this.loading = false;
        }   catch(e){
            console.log(e)
        }
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
.settings{
    &-wrapper{
        column-gap: 100px
    }

    &-input{
        background-color: #2A2B2E;
        &-container{
            row-gap: 12px;
        }
        &-heading{
            font-size: 18px;
        }
    }

    &-container{
        &-right{
            flex-grow: 1;
            row-gap: 20px;
        }
    }

    &-avatar{
        width: 150px;
        height: 150px;
        border-radius: 50%;
        &-container{
            row-gap: 20px;
        }

        &-upload{
            text-align: center;
            border-radius: 8px;
            color: #65BFF0;
            border: 1px solid #65BFF0;
            font-size: 18px;
            line-height: normal;
            padding: 13px 30px;
            cursor: pointer;
            transition-property: color, border;
            transition-duration: .15s;

            &:hover{
                border: 1px solid #ACDEF9;
                color: #ACDEF9;
            }
        }

        &-input{
            display: none;
        }
    }

    &-btn{
        &-save{
            align-self: end;
            color: #65BFF0;
            border-radius: 8px;
            border: 1px solid ( #65BFF0);
            background-color: transparent;
            padding: 13px 65px;
            font-size: 18px;
            cursor: pointer;
            transition-property: color, border;
            transition-duration: .15s;
            
            &:not([disabled]):hover{
                color: #ACDEF9;
                border: 1px solid ( #ACDEF9);
            }
            
            &-lock{
                cursor: default;
                color: gray;
                border: 1px solid ( gray);
            }
        }
    }
}
</style>