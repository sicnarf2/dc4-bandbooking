<template>
    <div class="oggg">
      <div class="perin">
        <h1 class="cust">
          Track
          <!-- <RouterLink to="/trackcreate" class="plus">Add</RouterLink> -->
        </h1>
      </div>
      <div class="table-customers">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Album Genre</th>
              <th>Duration</th>
              <th>Composer</th>
              <th>Track Number</th>
              <th>Delete</th>
           
            </tr>
          </thead>
          <tbody>
            <tr v-for="track in tracks" :key="track.id">
              <td>{{ track.title }}</td>
              <td>{{ track.album.genre}}</td>
              <td>{{ track.duration }}</td>
              <td>{{ track.composer }}</td>
              <td>{{ track.track_number }}</td>
              <td>
                <button @click="deleteTrack(track.id)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  
  const tracks = ref([]);
  
  onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8000/api/tracks');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    const promises = data.map(async (track) => {
      const albumResponse = await fetch(`http://localhost:8000/api/albums/${track.album_id}`);
      if (!albumResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const albumData = await albumResponse.json();
      return { ...track, album: albumData };
    });

    const tracksWithAlbum = await Promise.all(promises);
    console.log('Tracks with Album:', tracksWithAlbum);
    tracks.value = tracksWithAlbum;
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
});

  
  const deleteTrack = async (trackId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tracks/${trackId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        tracks.value = tracks.value.filter((track) => track.id !== trackId);
        alert('Track deleted successfully!');
      } else {
        console.error('Failed to delete track:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting track:', error);
    }
  };
  </script>
  