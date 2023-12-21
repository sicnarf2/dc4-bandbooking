<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <div class="side-bar"> 

      <div class="title">
      <H1>Music Artist</H1>
      <p></p>        
      </div>


      <div class="navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/artist">Artist</RouterLink>    
        <RouterLink to="/album">Album</RouterLink>  
        <RouterLink to="/track">Track</RouterLink>  
        <!-- <RouterLink to="/portfolio">Portfolio</RouterLink>   -->
      </div>

      <!-- <div class="img">
        <img src="src/components/pink-removebg.png" alt="" class="rev">
      </div> -->

    </div>
    <div class="content">
      <RouterView />   
    </div>

  </div>


</template>

<style>
  .container{
    display: flex;
    
    
  }

  .side-bar{
    background-position: 0px 290px;
    background-repeat: no-repeat;
    background-size: 500px;
    margin-right: 0;
    background-color: rgb(255, 255, 255);

    width: 35%;
    height: 49.4rem;
    z-index: 1;
    background: rgb(53, 52, 52);
    background: linear-gradient(180deg, rgb(41, 41, 41) 7%, rgb(39, 39, 39) 65%);
  }
  /* .img img{
    position: 0px 290px;
    height: 50vh;
    margin-left: 17%;
  } */

  .title{
    margin: 3rem 0rem;
    margin-top: 2rem;
    color: rgb(131, 97, 97);
    text-shadow: 2px 2px 5px;
  }
  .title h1{
    text-align: right;
    font-size: 35px;
    font-weight: 1000;
    letter-spacing: -2px;
    font-family: 'Cavilant';
    margin: 0;
    color: white;

  }
  .side-bar p{
    text-align: right;
    font-family: 'Cavilant';
    margin: 0;
  }

  .wrapper h3{
    margin: 0;
  }

  .navigation {
    /* display: flex; */
    flex-direction: column;
    text-align: right;
    margin: 0rem 2rem;  
    display: inline-flex;
    font-size: 20px;
    font-family: 'Poppins';
    
  }
  .title h1 {
    animation: rgbAnimation 5s infinite alternate;
  }

  @keyframes rgbAnimation {
    0% {
      color: rgb(255, 0, 0); /* Red */
    }
    50% {
      color: rgb(0, 255, 0); /* Green */
    }
    100% {
      color: rgb(0, 0, 255); /* Blue */
    }
  }

  .navigation a{
    text-decoration: none;
    letter-spacing: -.5px;
    margin: .5rem 0rem;
    color: white;
    padding: 5px 25px;
    margin: 10px auto;
    border-radius: 10px;
    margin-right: 0;
    transition: .5s ease;
  }
  .navigation a:hover{
    
    color: rgb(46, 41, 43);
    background-color:  rgb(255, 239, 239);
  }
  .navigation a.router-link-active{
    color: rgb(66, 66, 66);
    background-color:  rgb(255, 235, 235);
    padding: 5px 25px;
    margin: 10px auto;
    margin-right: 0;
    text-align: right;
    border-radius: 10px;
  }

  .content{
    /* width: 65%; */
    /* height: 49.4rem; */
    /* overflow: scroll; */
    background: rgb(190, 189, 190);
    background: linear-gradient(180deg, rgb(255, 253, 253) 7%, rgba(255,255,255,1) 100%); 
  }
  
</style>

