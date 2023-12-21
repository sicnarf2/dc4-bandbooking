<template>
  <div class="home-container">
    <div class="bs">
      <h1 class="h"> Hello!! Welcome To my Vue</h1>

    </div>
  </div>
</template>

<script>
export default {
  // Your component logic goes here
}
</script>

<style>

@keyframes rgbAnimation {
    0% {
      background-color: rgb(255, 0, 0); /* Red */
    }
    50% {
      background-color: rgb(0, 255, 0); /* Green */
    }
    100% {
      background-color: rgb(0, 0, 255); /* Blue */
    }
  }
.home-container {
  height: 70vh;
  border: 1px solid;
  width: 90vh;
  margin: 3.5rem 16rem;
  display: flex;
  border-radius: 10px;
  box-shadow: 7px 7px 15px;
  background-color: rgb(161, 159, 159);
}

.bs{
  margin-top: 143px;
  margin-left: 85px;
  height: 150px;
  border: 1px solid;
  border-radius: 10px;
  box-shadow: 2px 2px 10px;
  background-color: rgb(218, 217, 217);
}
.h{
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 44px;
  color: #12E193;
  text-shadow: 2px 2px 5px black;
}
.h {
    animation: fadeIn 2s ease-in-out infinite alternate;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

</style>
