<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="container">
    <div class="navbar-container">
      <div class="title">
        <h1>BAND BOOKING</h1>   
      </div>
      <div class="navbar">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/band">Band</RouterLink>    
        <RouterLink to="/booking">Booking</RouterLink>  
        <RouterLink to="/user">User</RouterLink>
      </div>
    </div>
    <div class="content">
      <RouterView />   
    </div>

  </div>


</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik+Doodle+Triangles&display=swap');

  .navbar-container {
    display: inline-block;
    width: 100%;
    margin-bottom: 2rem;
  }


  .title h1 {
    margin: 1rem 2rem;
    font-family: 'Rubik Doodle Triangles';
    font-size: 3rem;
  }

  .navbar {
    font-size: 1.5rem;
    margin-left: 33vw;
  }

  .navbar a{
    text-decoration: none;
    color: white;
    padding: 1vh 1vw;
    margin: 0 0.5rem;
    border-radius: 10px;
    transition: .5s ease;
  }

  .navbar a:hover{
    
    color: rgb(46, 41, 43);
    background-color:  rgb(255, 239, 239);
  }
  .navbar a.router-link-active{
    color: rgb(66, 66, 66);
    background-color:  rgb(255, 235, 235);
    border-radius: 10px;
  }

  .content{
    background: rgb(190, 189, 190);
    background: linear-gradient(180deg, rgb(255, 253, 253) 7%, rgba(255,255,255,1) 100%); 
  }
  
</style>

