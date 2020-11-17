<template>
  <nav class=" blue-grey">
    <div class="nav-wrapper">
      <router-link :to="{name:'Index'}"><a style="padding-left: 5px"> Ninja Smoothies</a></router-link>
      <ul id="nav-mobile" class="right ">
        <router-link :to="{name:'AddSmoothies'}" tag="li"><a><i class="material-icons right">add</i>Add Smoothies</a></router-link>
      </ul>
    </div>
  </nav>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
