<template>
    <div class="oggg">
      <div class="perin">
        <h1 class="cust">
          Album
          <RouterLink to="/albumcreate" class="plus">Add</RouterLink>
        </h1>
      </div>
      <div class="table-customers">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
                <th>Artist Name </th>
              <th>Title</th>
              <th>Release Date</th>
              <th>Genre</th>
              <th>Delete</th> 
        
            </tr>
          </thead>
          <tbody>
            <tr v-for="album in albums" :key="album.id">
             <td>{{ album.artist.artist_name}}</td>
              <td>{{ album.title }}</td>
              <td>{{ album.release_date }}</td>
              <td>{{ album.genre }}</td>
              <td>
                <button @click="deleteAlbum(album.id)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  
//   const albums = ref(null);
  
//   onMounted(() => {
  
//     fetch('http://localhost:8000/api/albums?include=artist')
//       .then(response => response.json())
//       .then(data => (albums.value = data))
//       .catch(error => console.error('Error fetching data:', error));
// });

const albums = ref([]);

    onMounted(() => {
      fetch('http://localhost:8000/api/albums')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Fetch artist details for each album
          const promises = data.map(album => {
            return fetch(`http://localhost:8000/api/artists/${album.artist_id}`)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(artistData => {
               
                return { ...album, artist: artistData };
              });
          });

        
          return Promise.all(promises);
        })
        .then(albumsWithArtist => {
          console.log('Albums with Artist:', albumsWithArtist);
          albums.value = albumsWithArtist;
        })
        .catch(error => console.error('Error fetching data:', error.message));
    });

  
  const deleteAlbum = async (albumId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/albums/${albumId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        albums.value = albums.value.filter((album) => album.id !== albumId);
        alert('Album deleted successfully!');
      } else {
        console.error('Failed to delete album:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };
  </script>
  