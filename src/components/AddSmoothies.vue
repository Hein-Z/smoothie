<template>
  <div class="row">
    <form class="col offset-m2 m8 s12" @submit.prevent="addSmoothiec">
      <h4 class="blue-grey-text">Add New Smoothies</h4>
      <div class="row">
        <div class="input-field col s12">
          <input id="title" type="text" class="validate" v-model="title">
          <label for="title">Title</label>
          <p class="deep-orange-text" v-if="feedback.title">{{ feedback.title }}</p>
        </div>
        <div class=" col s12 field" v-for="(ingredient,index) in ingredients" :key="index">
          <label>Added Ingredient</label>
          <input type="text" class="validate" v-model="ingredients[index]">
          <a class="btn-delete" @click="deleteIngredient(index)"><i class="material-icons">delete</i></a>
        </div>
        <div class="input-field col s12 field">
          <input id="Ingredient" ref="ingredient" type="text" class="validate " v-model="another"
                 v-on:keydown.tab="addIngredient">
          <label for="Ingredient">Add Ingredient</label>
          <a class="btn-add  btn-small blue-grey"><i class="material-icons" @click="addIngredient">add</i></a>
          <p class="deep-orange-text col  s11" v-if="feedback.ingredient">{{ feedback.ingredient }}</p>
        </div>
        <a class="waves-effect waves-light btn-large blue-grey col offset-s3 s4 flex" @click="addSmoothie"><i
          class="material-icons ">add</i><span>Add Smoothie</span></a>
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
  top: 0px;
  cursor: pointer;
}

.flex {
  display: flex;
  justify-content: space-around;
}
</style>
<script>
import db from '@/firebase/init';
import slugify from 'slugify'
// import index from "../router";

export default {
  name: 'AddSmoothies',
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      slug: null,
      feedback: {
        title: null,
        ingredient: null
      }
    }
  }, methods: {
    addSmoothie() {
      this.addIngredient();
      this.feedback.ingredient = null;

      const array = this.ingredients.filter(function (e) {
        return e != '';
      });
      const isEmpty = array.length;
      if (!this.title || isEmpty == 0) {
        if (!this.title) {
          this.feedback.title = "You Must Add title"
        }
        if (isEmpty == 0) {
          this.feedback.ingredient = "You Must Add ingredients"
        }
        return;
      } else {
        this.feedback.ingredient = this.feedback.title = null;
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection('smoothies').add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug+'_id='+this.randNumber()
        }).then(_ => this.$router.push({name: 'Index'}))
          .catch(err => console.log(err));
      }
    },
    deleteIngredient(index) {
      this.ingredients.splice(index, 1);
    },
    addIngredient() {
      if (this.another) {
        if (this.another.trim()) {
          this.ingredients.push(this.another);
          this.another = null;
        }
      } else {
        this.feedback.ingredient = "You Must Add ingredients"
      }
      this.$refs.ingredient.focus();
    },
    randNumber() {
      return Math.random() * 10000;
    },
    goBack(){
      this.$router.push({name:'Index'})
    }
  }

}
</script>
