<template>
  <div class="row">
    <div class="col s12 m6" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">{{ smoothie.title }}</span>
          <ul class=" ingredients">
            <li  v-for="(ingredient,index) in smoothie.ingredients" :key="index">
              <span class="clip">{{ ingredient }}</span>
            </li>
          </ul>
        </div>

        <div class="card-action flex">
          <router-link :to="{name:'EditSmoothie', params:{'slug':smoothie.slug}}"><a class="flex"><i class="material-icons">create</i>Edit</a></router-link>
          <a class="flex" @click="deleteSmoothie(smoothie.id)"> <i class="material-icons">delete</i>Delete</a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.ingredients {
  margin: 10px 5px 0 0;
  /*display: grid;*/
  /*grid-gap: 5px;*/
  /*justify-items: baseline;*/
  /*grid-template-columns: repeat( auto-fit, minmax(10px, max-content) )*/
  display: flex;
  justify-items: center;
  flex-wrap: wrap;

}

.ingredients > li {
  border-radius: 7px;
  background-color: #ffab40;
  padding: 0 5px;
  /*justify-self: baseline;*/
  margin: 4px;
}

.flex {
  display: flex;
}

a {
  cursor: pointer;
}

</style>
<script>
import db from '@/firebase/init'

export default {
  name: 'Index',
  data: function () {
    return {
      smoothies: []
      // [{title: 'Ninja Brew', slug: 'ninja-brew', ingredients: ['banana', 'milk', 'apple'], id: 1},
      // {title: 'Morning Mood', slug: 'morning-mood', ingredients: ['mango', 'lime', 'juice'], id: 2}]

    }
  },
  methods: {
    deleteSmoothie(id) {
      db.collection('smoothies').doc(id).delete()
        .then(_ => {
          this.smoothies = this.smoothies.filter(smoothie => smoothie.id != id)
        })
    }
  },
  created() {
    db.collection('smoothies').get().then(snapshot => {
      snapshot.forEach(doc => {
        let smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
      })

    })
  }
}
</script>
