<template>
  <div class="mt-8 mb-8 justify-center flex">
    <button @click="moreDogs()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Показать еще
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount} from 'vue';
import {useDogsStore} from "@/store/DogsStore";
export default defineComponent({
  name: 'LasyLoad',
  components: {},
  props: {
    routeName: { type: String, required: true},
    routeId: { type: String}
  },
  setup(props){
      const moreDogs = () => {
        if(props.routeId && props.routeName == 'breed'){
          console.log('Условие breed')
          useDogsStore().getDogs('https://dog.ceo/api/breed/' + props.routeId + '/images/random/20');
        }
        else if ( props.routeName == 'home') {
          console.log('Условие home')
          useDogsStore().getDogs('https://dog.ceo/api/breeds/image/random/20')
        }

      }

    const lazyLoad = () => {
      let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
      if (windowRelativeBottom < document.documentElement.clientHeight) {
        moreDogs()
      }
    }

    window.addEventListener('scroll', lazyLoad);

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', lazyLoad);
    })

    return { moreDogs }

  }

});
</script>

<style scoped lang="scss">

</style>