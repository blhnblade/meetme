<template>
    <div :class="{'loader-wrapper': wrapper}">
        <div class="loader">
        </div>
    </div>
</template>

<script>
export default{
    props:{
      wrapper: {
        default: false,
      }
    },
}
</script>


<style scoped lang="scss">
.loader{
    width: 40px;
    height: 40px;
    border-radius: 100px;
    border: 5px solid #65BFF0;
    border-top: 5px solid transparent;
    animation-name: loaderMove;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    

    &-wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        padding-top: 60px;
    }
  }
  @keyframes loaderMove{
    0%{
      transform: rotateZ(0deg);
    }
  
    100%{
      transform: rotateZ(360deg);
    }
  }
</style>