<template>
<div @click.stop class="d-flex flex-column menu">
    <div 
        @click="toggleMenu"
        class="d-flex align-items-center menu-title-container"
    >
        <div class="menu-title-name">
            {{userName}}
        </div>
        <svg class="menu-title-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
    <div 
        class="menu-content d-flex flex-column align-items-start"
        v-if="this.menuIsActive"
    >
    <div @click="goToProfile" class="menu-item d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="menu-title">Профиль</div>
    </div>
    
    <div @click="goToList" class="menu-item d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M13 14H9C8.73478 14 8.48043 14.1054 8.29289 14.2929C8.10536 14.4804 8 14.7348 8 15C8 15.2652 8.10536 15.5196 8.29289 15.7071C8.48043 15.8946 8.73478 16 9 16H13C13.2652 16 13.5196 15.8946 13.7071 15.7071C13.8946 15.5196 14 15.2652 14 15C14 14.7348 13.8946 14.4804 13.7071 14.2929C13.5196 14.1054 13.2652 14 13 14ZM17 4H15.82C15.6137 3.41645 15.2319 2.911 14.7271 2.55294C14.2222 2.19488 13.6189 2.00174 13 2H11C10.3811 2.00174 9.7778 2.19488 9.27293 2.55294C8.76807 2.911 8.38631 3.41645 8.18 4H7C6.20435 4 5.44129 4.31607 4.87868 4.87868C4.31607 5.44129 4 6.20435 4 7V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V7C20 6.20435 19.6839 5.44129 19.1213 4.87868C18.5587 4.31607 17.7956 4 17 4ZM10 5C10 4.73478 10.1054 4.48043 10.2929 4.29289C10.4804 4.10536 10.7348 4 11 4H13C13.2652 4 13.5196 4.10536 13.7071 4.29289C13.8946 4.48043 14 4.73478 14 5V6H10V5ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V7C6 6.73478 6.10536 6.48043 6.29289 6.29289C6.48043 6.10536 6.73478 6 7 6H8V7C8 7.26522 8.10536 7.51957 8.29289 7.70711C8.48043 7.89464 8.73478 8 9 8H15C15.2652 8 15.5196 7.89464 15.7071 7.70711C15.8946 7.51957 16 7.26522 16 7V6H17C17.2652 6 17.5196 6.10536 17.7071 6.29289C17.8946 6.48043 18 6.73478 18 7V19ZM15 10H9C8.73478 10 8.48043 10.1054 8.29289 10.2929C8.10536 10.4804 8 10.7348 8 11C8 11.2652 8.10536 11.5196 8.29289 11.7071C8.48043 11.8946 8.73478 12 9 12H15C15.2652 12 15.5196 11.8946 15.7071 11.7071C15.8946 11.5196 16 11.2652 16 11C16 10.7348 15.8946 10.4804 15.7071 10.2929C15.5196 10.1054 15.2652 10 15 10Z" fill="#989898"/>
        </svg>
        <div class="menu-title">Задания</div>
    </div>
    <div @click="goToPerformers" class="menu-item menu-item-job d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="menu-title">Исполнители</div>
    </div>
    <div @click="goToRequests" class="menu-item menu-item-job d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="menu-title">Запросы</div>
    </div>
    <div @click="goToApproval" class="menu-item d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 11L19 13L23 9" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="menu-title">Одобрения</div>
    </div>
    <button class="menu-logout d-flex align-items-center" @click="logout">
        Выйти
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10.8768 5.375L13.5018 8L10.8768 10.625M6.5 8H13.5M7.5 13.5H3C2.86739 13.5 2.74021 13.4473 2.64645 13.3536C2.55268 13.2598 2.5 13.1326 2.5 13V3C2.5 2.86739 2.55268 2.74021 2.64645 2.64645C2.74021 2.55268 2.86739 2.5 3 2.5H7.5" stroke="#4C7A93" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
    </div> 
</div>
</template>

<script>
export default{
    props: [
        'userName',
    ],
    data(){
        return {
            menuIsActive: false
        }
    },
    methods: {
        async logout(){
            this.$router.push('/login')
            this.$store.dispatch('logout')
        },
        goToProfile(){
            this.$router.push('/profile')
            this.closeMenu()
        },
        goToList(){
            this.$router.push('/list')
            this.closeMenu()
        },
        goToApproval(){
            this.$router.push('/approval')
            this.closeMenu()
        },
        goToPerformers(){
            this.$router.push('/performers')
            this.closeMenu()
        },
        goToRequests(){
            this.$router.push('/requests')
            this.closeMenu()
        },
        toggleMenu(){
            this.menuIsActive = !this.menuIsActive; 
        },
        closeMenu(){
            this.menuIsActive = false;
        },
        windowCloseMenu(){
            if(this.menuIsActive){
                this.menuIsActive = false
            }
        }
    },
    mounted(){
        window.addEventListener('click', this.windowCloseMenu)
    },
    beforeUnmount(){
        window.removeEventListener('click', this.windowCloseMenu)
    }
}
</script>

<style scoped lang="scss">
.menu{
    position: relative;

    &-content{
        position: absolute;
        border-radius: 8px;
        background: #333638;
        width: 250px;
        top: calc(100% + 8px);
        right: 0px;
        z-index: 99;
        padding: 24px 16px 65px;
        row-gap: 16px;
    }

    &-title{
        font-size: 18px;
        line-height: normal;

        &-container{
            cursor: pointer;
            background: #333638;
            padding: 3px 8px 3px 15px;
            border-radius: 8px;
            min-width: 100px;
            justify-self: flex-end;
        }

        &-name{
            font-size: 16px;
            margin-right: 10px;
            flex-grow: 1;
        }

        &-icon{
            width: 18px;
            height: 18px;
        }
    }

    &-item{
        cursor: pointer;
        column-gap: 16px;
    }

    &-logout{
        position: absolute;
        cursor: pointer;
        bottom: 14px;
        right: 16px;
        color: #4C7A93;
        font-size: 16px;
        background: none;
        border: none;
        transition-property: color;
        transition-duration: .15s;
        
        & svg{
            margin-left: 5px;
            & path{
                transition-property: stroke;
                transition-duration: .15s;
            }
        }
        
        &:hover{
            color: #ACDEF9;
            & path{
                stroke: #ACDEF9;
            }
        }

        &:focus{
            outline: none;
            color: #ACDEF9;
            & path{
                stroke: #ACDEF9;
            }
        }
    }
}
</style>