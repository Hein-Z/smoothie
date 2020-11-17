<template>
  <div class="row" v-if="smoothies">
    <form class="col offset-m2 m8 s12">
      <h4>Edit Smoothie <span class="blue-grey-text">{{ smoothies.title }}</span></h4>
      <div class="row">
        <div class="col s12">
          <label for="title">Title</label>
          <input id="title" type="text" class="validate" v-model="smoothies.title">
          <p class="deep-orange-text" v-if="feedback.title">{{ feedback.title }}</p>
        </div>
        <div class=" col s12 field" v-for="(ingredient,index) in smoothies.ingredients" :key="index">
          <label for="Ingredient">Added Ingredient</label>
          <input type="text" class="validate" v-model="smoothies.ingredients[index]">
          <a class="btn-delete" @click="deleteIngredient(index)"><i class="material-icons">delete</i></a>
        </div>
        <div class=" col s12 field">
          <label for="Ingredient">Add Ingredient</label>
          <input id="Ingredient" ref="ingredient" type="text" class="validate " v-model="another"
                 v-on:keydown.tab="addIngredient">
          <a class="btn-add  btn-small"><i class="material-icons" @click="addIngredient">add</i></a>
          <p class="deep-orange-text col  s11" v-if="feedback.ingredient">{{ feedback.ingredient }}</p>
        </div>
        <a class="waves-effect waves-light btn-large blue-grey col offset-s3 s4 flex" @click="editSmoothie"><i
          class="material-icons ">create</i><span>edit Smoothie</span></a>
        <a class="waves-effect waves-light btn-large red  s2" @click="goBack">Back</a>

      </div>
    </form>
  </div>

</template>
<style scoped>
.field {
  position: relative;
}

.btn-delete {
  position: absolute;
  right: 5px;
  bottom: 7px;
  cursor: pointer;
}

.btn-add {
  position: absolute;
  right: 5px;
  bottom: 15px;
  cursor: pointer;
}

.flex {
  display: flex;
  justify-content: space-around;
}
</style>
<script>
import db from '@/firebase/init';
import slugify from "slugify";

export default {
  data() {
    return {
      smoothies: null,
      another: null,

      feedback: {
        title: null,
        ingredient: null
      }
    }
  },
  created() {
    db.collection('smoothies').where('slug', '==', this.$route.params.slug)
      .get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothies = doc.data();
        this.smoothies.id = doc.id;
      });
    })
  },
  methods: {
    editSmoothie() {


      this.addIngredient();
      this.feedback.ingredient = null;

      const array = this.smoothies.ingredients.filter(e => e != '');
      const isEmpty = array.length;
      if (!this.smoothies.title || isEmpty == 0) {
        if (!this.title) {
          this.feedback.title = "You Must Add title"
        }
        if (isEmpty == 0) {
          this.feedback.ingredient = "You Must Add ingredients"
        }
        return;
      } else {
        this.feedback.ingredient = this.feedback.title = null;
        this.slug = slugify(this.smoothies.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection('smoothies').doc(this.smoothies.id).update({
          title: this.smoothies.title,
          ingredients: this.smoothies.ingredients,
          slug: this.smoothies.slug+'_id='+this.randNumber()
        }).then(_ => this.$router.push({name: 'Index'}))
          .catch(err => console.log(err));
      }
    },
    deleteIngredient(index) {
      this.smoothies.ingredients.splice(index, 1);
    },
    addIngredient() {
      if (this.another) {
        if (this.another.trim()) {
          this.smoothies.ingredients.push(this.another);
          this.another = null;
        }
      } else {
        this.feedback.ingredient = "You Must Add ingredients"
      }
      this.$refs.ingredient.focus();
    },
    randNumber() {
      return Math.random()*10000;
    },
    goBack(){
      this.$router.push({name:'Index'})
    }
  }
}
</script>


