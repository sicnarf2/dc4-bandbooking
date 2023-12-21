<template>
  <div class="bord">
    <h1 class="titlecreate">Add New Artist</h1>
    <div class="row">
      <div class="col-md-5">
        <form @submit.prevent="addNewArtist" class="form">
          <div class="form-group">
            <label for="artist_name">Name</label>
            <input v-model="newArtist.artist_name" type="text" name="artist_name" class="form-control">
            <p v-if="formErrors.artist_name" class="error">{{ formErrors.artist_name }}</p>
          </div>
          <div class="form-group">
            <label for="genre">Genre</label>
            <input v-model="newArtist.genre" type="text" name="genre" class="form-control">
            <p v-if="formErrors.genre" class="error">{{ formErrors.genre }}</p>
          </div>
          <div class="form-group">
            <label for="origin">Origin</label>
            <input v-model="newArtist.origin" type="text" name="origin" class="form-control">
            <p v-if="formErrors.origin" class="error">{{ formErrors.origin }}</p>
          </div>
          
          <div class="form-group my-3 d-grid gap-2 d-md-flex justify-content-end">
            <button type="submit" class="btnc btn-primary">Add Artist</button>
          </div>
          <p v-if="successMessage" class="success">{{ successMessage }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.name {
  font-size: 24px;
  margin-bottom: 20px;
}

.form {
  margin-top: 20px;
}

.form-group {
  margin-top: 10px;
}

.error {
  color: #3f3e3e; 
  margin-top: 5px;
}

.success {
  color: #454645; 
  margin-top: 5px;
}
.btnc {
  background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}
.btnc:hover{
  background-color: #45a049;
}
.row{
  margin: 3.5rem 12rem;

}
.titlecreate{
  margin-left: 5.5cm;
  margin-top: 25px;
  color: teal;
  text-shadow: 2px 2px 5px;
}
.bord{
  border: 1px solid;
  width: 100vh;
  margin-left: 200px;
  margin-top: 100px;
  border-radius: 10px;
  box-shadow: 5px 5px 15px;
}
</style>

<script setup>
import { ref } from 'vue';

const newArtist = ref({
  artist_name: '',
  genre: '',
  origin: '',
});

const formErrors = ref({
  artist_name: '',
  genre: '',
  origin: '',
});

const successMessage = ref('');

const addNewArtist = async () => {
  
  formErrors.value = {};
  successMessage.value = '';

  
  if (!newArtist.value.artist_name) {
    formErrors.value.artist_name = 'Name is required';
  }

  if (!newArtist.value.genre) {
    formErrors.value.genre = 'Genre is required';
  }

  if (!newArtist.value.origin) {
    formErrors.value.origin = 'Origin is required';
  }

  
  if (!Object.values(formErrors.value).some(Boolean)) {
    try {
      const response = await fetch('http://localhost:8000/api/artists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArtist.value),
      });

      if (response.ok) {
        successMessage.value = 'Artist added successfully!';
       
        newArtist.value = {
          artist_name: '',
          genre: '',
          origin: '',
        };
      } else {
        console.error('Failed to submit form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
};
</script>


<!-- <template>
    <div>
      <h1 class="title">Add New Artist</h1>
      <div class="row">
        <div class="col-md-5">
          <form @submit.prevent="addNewArtist" class="form">
            <div class="form-group">
              <label for="artist_name">Name</label>
              <input v-model="newArtist.artist_name" type="text" name="artist_name" class="form-control">
              <p v-if="formErrors.artist_name" class="error">{{ formErrors.artist_name }}</p>
            </div>
            <div class="form-group">
              <label for="genre">Genre</label>
              <input v-model="newArtist.genre" type="text" name="genre" class="form-control">
              <p v-if="formErrors.genre" class="error">{{ formErrors.genre }}</p>
            </div>
            <div class="form-group">
              <label for="origin">Origin</label>
              <input v-model="newArtist.origin" type="text" name="origin" class="form-control">
              <p v-if="formErrors.origin" class="error">{{ formErrors.origin }}</p>
            </div>
            
            <div class="form-group my-3 d-grid gap-2 d-md-flex justify-content-end">
              <button type="submit" class="btnc btn-primary">Add Artist</button>
            </div>
            <p v-if="successMessage" class="success">{{ successMessage }}</p>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <style>
  .name {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .form {
    margin-top: 20px;
  }
  
  .form-group {
    margin-top: 10px;
  }
  
  .error {
    color: #3f3e3e; /* Bootstrap red color */
    margin-top: 5px;
  }
  
  .success {
    color: #454645; /* Bootstrap green color */
    margin-top: 5px;
  }
  .btnc{
    background-color: #333232;
    color: #ffffff; 
    border-radius: 10px;
    width: 100px;
  }
  </style>
  
  <script setup>
  import { ref } from 'vue';
  
  const newArtist = ref({
    artist_name: '',
    genre: '',
    origin: '',
   
  });
  
  const formErrors = ref({
    artist_name: '',
    genre: '',
    origin: '',
   
  });
  
  const successMessage = ref('');
  
  const addNewArtist = async () => {
    // Reset previous errors and success message
    formErrors.value = {};
    successMessage.value = '';
  
    // Perform validation
    if (!newArtist.value.artist_name) {
      formErrors.value.artist_name = 'Name is required';
    }
  
    if (!newArtist.value.genre) {
      formErrors.value.genre = 'Contact # is required';
    }

    if (!newArtist.value.origin) {
      formErrors.value.origin = 'origin # is required';
    }

  

    // If there are no errors, proceed with form submission
    if (!Object.values(formErrors.value).some(Boolean)) {
      try {
        const response = await fetch('http://localhost:8000/api/artists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCustomer.value),
        });
  
        if (response.ok) {
          successMessage.value = 'Artist added successfully!';
          // Optionally, you can reset the form fields here
          newCustomer.value = {
            artist_name: '',
            genre: '',
            origin: '',
           
          };
        } else {
          console.error('Failed to submit form:', response.statusText);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };
  </script> -->