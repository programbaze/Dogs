import {defineStore} from "pinia";
import { ref } from 'vue';
import Dog from "@/types/Dog";
export const useDogsStore = defineStore('dogsStore', () => {

    const dogsSort = ref<Dog[]>([])
    const keys = ref<Dog[]>([])
    const favoriteStore = ref<Dog[]>([])
    const getDogs = async (url: string) => {
        const res = await fetch(url);
        const data = await res.json();
        for (const value of Object.values(data.message)) {
            keys.value.push({'img': value, 'breed': defineBreed(`${value}`), 'isFavorites': false})
        }
        dogsSort.value = keys.value
    }

    const defineBreed = (text: string) => {
        const strStart = text.replace('https://images.dog.ceo/breeds/','')
        const strFinal = strStart.split('/')[0];
        return strFinal
    }

    const delDogs = () => {
        keys.value = []
    }

    const addRemomeFavoriteStore = (obj: { breed: string; img: string; isFavorites: boolean; }) =>{
        dogsSort.value.map( (item) => {
            if(item.img == obj.img && item.isFavorites == false){
                item.isFavorites = true
                favoriteStore.value.push(item)
            }
            else if(item.img == obj.img && item.isFavorites == true){
                item.isFavorites = false
                favoriteStore.value = []
                dogsSort.value.forEach(function(entry: { breed: string; img: any; isFavorites: boolean; }) {
                  if(entry.isFavorites == true){
                      favoriteStore.value.push(entry)
                  }
                });
            }
        })
    }

    return {
        getDogs, dogsSort, delDogs, addRemomeFavoriteStore, favoriteStore
    }
})
