<template>
    <div class="bord">
      <h1 class="titlecreate">New Album</h1>
      <div class="row">
        <div class="col-md-5">
          <form @submit.prevent="addNewAlbum" class="form">
            <div class="form-group mt-2">
              <label for="album_id">Select Artist</label>
              <select v-model="newAlbum.artist_id" class="form-select">
                <option value="" disabled>Select Artist</option>
                <option v-for="artist in artists" :key="artist.id" :value="String(artist.id)">
                  {{ artist.artist_name }}
                </option>
              </select>
              <p v-if="formErrors.artist_id" class="error">{{ formErrors.artist_id }}</p>
            </div>
            <div class="form-group mt-2">
              <label for="title">Title</label>
              <input v-model="newAlbum.title" type="text" class="form-control">
              <p v-if="formErrors.title" class="error">{{ formErrors.title }}</p>
            </div>
            <div class="form-group mt-2">
              <label for="release_date">Release Date</label>
              <input v-model="newAlbum.release_date" type="date" class="form-control">
              <p v-if="formErrors.release_date" class="error">{{ formErrors.release_date }}</p>
            </div>
            <div class="form-group mt-2">
              <label for="genre">Genre</label>
              <input v-model="newAlbum.genre" type="text" class="form-control">
              <p v-if="formErrors.genre" class="error">{{ formErrors.genre }}</p>
            </div>
            <div class="form-group my-3 d-grid gap-2 d-md-flex justify-content-end">
              <button type="submit" class="btnc btn-primary">Add Album</button>
            </div>
          </form>
          <p v-if="successMessage" class="success">{{ successMessage }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <style>
    /* Styles remain unchanged */
    .success {
      color: #28a745; /* Bootstrap green color */
      margin-top: 5px;
    }

    /* .btn{
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
    } */
  </style>
  
  <script setup>
import { ref, onMounted } from 'vue';

const newAlbum = ref({
  artist_id: '',
  title: '',
  release_date: '',
  genre: '',
});

const formErrors = ref({
  artist_id: '',
  title: '',
  release_date: '',
  genre: '',
});

const artists = ref([]);
const successMessage = ref('');

onMounted(async () => {
  try {
    const responseArtists = await fetch('http://localhost:8000/api/artists');
    const dataArtists = await responseArtists.json();
    artists.value = dataArtists;

    const responseAlbums = await fetch('http://localhost:8000/api/albums');
    const dataAlbums = await responseAlbums.json();
   
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
  
  const addNewAlbum = async () => {

    formErrors.value = {};
  

    if (!newAlbum.value.artist_id) {
      formErrors.value.artist_id = 'Artist is required';
    }
    if (!newAlbum.value.title) {
      formErrors.value.title = 'Title is required';
    }
    if (!newAlbum.value.release_date) {
      formErrors.value.release_date = 'Release date is required';
    }
    if (!newAlbum.value.genre) {
      formErrors.value.genre = 'Genre is required';
    }
  

    if (!Object.values(formErrors.value).some(Boolean)) {
      try {
        const response = await fetch('http://localhost:8000/api/albums', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAlbum.value),
        });
  
        if (response.ok) {
          console.log('Album added successfully!');
          newAlbum.value = {
            artist_id: '',
            title: '',
            release_date: '',
            genre: '',
          };
          successMessage.value = 'Album added successfully!';
        } else {
          console.error('Failed to submit form:', response.statusText);
          successMessage.value = '';
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        successMessage.value = '';
      }
    } else {
      successMessage.value = '';
    }
  };
</script>
  