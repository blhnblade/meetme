<template>
<div class="header header-auth">
    <div class=" header-heading-container">
        <svg class="header-heading-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="10.041481971740723 -4.76837158203125e-7 179.91705322265625 199.99996948242188"><g data-paper-data="{&quot;fillRule&quot;:&quot;evenodd&quot;,&quot;isIcon&quot;:&quot;true&quot;,&quot;iconType&quot;:&quot;icon&quot;,&quot;rawIconId&quot;:&quot;3550798&quot;,&quot;selectedEffects&quot;:{&quot;container&quot;:&quot;&quot;,&quot;transformation&quot;:&quot;&quot;,&quot;pattern&quot;:&quot;&quot;},&quot;isDetailed&quot;:false,&quot;iconStyle&quot;:&quot;standalone&quot;,&quot;bounds&quot;:{&quot;x&quot;:218.28059665093892,&quot;y&quot;:115.00000000000003,&quot;width&quot;:113.43880669812214,&quot;height&quot;:126.10206318158825}}"><path d="M109.99539,2.67826l69.9677,39.98154c6.19947,3.57935 10.01204,10.20029 9.99539,17.35865v79.96308c0.01666,7.15836 -3.79591,13.77931 -9.99539,17.35865l-69.9677,39.98154c-6.18514,3.57102 -13.80563,3.57102 -19.99077,0l-69.9677,-39.98154c-6.19947,-3.57935 -10.01204,-10.20029 -9.99539,-17.35865v-79.96308c-0.01666,-7.15836 3.79591,-13.77931 9.99539,-17.35865l69.9677,-39.98154c6.18514,-3.57102 13.80563,-3.57102 19.99077,0zM132.91814,38.86156l-32.91814,-18.82464l-51.20969,29.3198c25.78276,5.46115 49.13698,19.04154 66.6359,38.74878c9.98239,-14.63025 16.00861,-31.59475 17.49192,-49.24393zM145.57896,153.90845l24.38874,-13.9269v-79.96308l-18.22492,-10.42852c-3.22818,20.09072 -11.4034,39.06297 -23.78902,55.20785c9.33636,14.91345 15.34791,31.66405 17.6252,49.11066zM102.43221,103.56502c-18.12263,-21.58237 -44.27723,-34.82226 -72.39991,-36.64975v66.40268c27.10915,0.00133 53.12514,-10.69006 72.39991,-29.75293zM50.35625,151.60951l49.64375,28.35358l26.65436,-15.15967c-0.81462,-15.61912 -5.19094,-30.84509 -12.79409,-44.51278c-17.63852,16.44141 -39.72266,27.33271 -63.50402,31.31887z" fill-rule="evenodd"></path></g></svg>
        <div class="header-heading">Give Me Job!</div> 
    </div>
    <a 
        href="#" 
        @click.prevent="this.$router.push(this.page === '/reg' ? '/login' : '/reg')"
        :class="{
            'login': this.$route.path === '/login',
            'registration': this.$route.path === '/reg'
        }"
    >
        {{ this.page === '/reg' ? 'Войти' : 'Регистрация' }}
    </a>
</div>
</template>

<script>
export default{
    props: ['page'],

}
</script>

<style lang="scss" scoped>
.header{
    width: 100%;
    padding: 20px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-heading{
        font-size: 26px;
        font-weight: 500;
        color: #fff;

        &-icon{
            fill: #fff;
            width: 24px;
            height: 24px;
        }

        &-container{
            display: flex;
            align-items: center;
            column-gap: 8px; 
        }
    }
    &-auth{
        padding: 10px 70px 0;
    }
}

.registration{
    padding: 16px 30px;
    border: 1px solid #65BFF0;
    background-color: transparent;
    border-radius: 8px;
    color: #65BFF0;
    font-size: 18px;
    font-weight: 500;
    line-height: 120%;
    text-decoration: none;
    user-select: none;
    cursor: pointer;
    transition-property: border, color;
    transition-duration: .15s;
    &:hover{
        border: 1px solid #ACDEF9;
        color: #ACDEF9;
    }
}

.login{
    padding: 17px 31px;
    background-color: #65BFF0;
    border-radius: 8px;
    color: #1E1F21;
    font-size: 18px;
    font-weight: 500;
    line-height: 120%;
    text-decoration: none;
    user-select: none;
    cursor: pointer;
    transition-property: background-color;
    transition-duration: .15s;

    &:hover{
        background-color: #ACDEF9;
    }
}
</style>