<template>
    <div class="oggg">
      <div class="perin">
        <h1 class="cust">
          Artist
          <RouterLink to="/artistcreate" class="plus">Add</RouterLink>
        </h1>
      </div>
      <div class="table-artists">
        <table class="table table-bordered table-striped " >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Genre</th>
              <th>Origin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="artist in artists" :key="artist.id">
              <td>{{ artist.id }}</td>
              <td>{{ artist.artist_name }}</td>
              <td>{{ artist.genre }}</td>
              <td>{{ artist.origin }}</td>
              
              <td>
                <button @click="deleteArtist(artist.id)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <style>
  .oggg {
    margin: 3.5rem 21rem;
  }
  
  .perin h1 {
    font-size: 45px;
    margin-left: 2px;
    font-weight: 1000;
    letter-spacing: -2px;
    font-family: 'Cavilant';
  }
 
  
  .perin {
    border-bottom: 1px solid #2b292a;
    padding-bottom: 10px;
    display: flex;
  }
  
  .table-customers {
    margin-top: 20px;
  }
  
  table {
    width: 200%;
    border-collapse: collapse;
    margin-top: 10px;
    border-radius: 10px;
   padding-right: 0;
   margin-right: 150px;
   margin-left: -180px;
  }
  
  th, td {
    border: 1px solid #686667; 
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #4d4a4b; 
    color: white; 
  }
  
  .cust {
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
  
  .plus {
    padding: 5px;
    color: #3096f7;
    background-color: rgb(71, 65, 65);
    border-radius: 5px;
    font-size: 25px;
    text-decoration: none;
    margin-left: 150px;
  }
  
  .btn {
    background-color: #dc3545; 
    color: #ffffff;
    border-radius: 5px;
    padding: 5px 10px;
  }
  </style>
  <script setup>
  import { onMounted, ref } from 'vue';
  
  const artists = ref([]);
  
  onMounted(() => {
    fetch('http://localhost:8000/api/artists')
      .then(response => response.json().then(data => (artists.value = data)));
  });
  
  const deleteArtist = async (artistId) => {
    try {
        const response = await fetch('http://localhost:8000/api/artists/' + artistId, {
        method: 'DELETE',
    });

  
      if (response.ok) {
        artists.value = artists.value.filter((artist) => artist.id !== artistId);
        alert('Artist deleted successfully!');
      } else {
        console.error('Failed to delete artist:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting artist:', error);
    }
  };
</script>

  
  