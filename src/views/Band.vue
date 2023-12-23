<template>
    <div class="container">
      <div class="content">
        <div class="nav-content">
          <h1 class="cust">
           BAND
            <RouterLink to="/bandcreate" class="plus">Add</RouterLink>
          </h1>
        </div>
        <div class="table-bands">
          <table class="table table-bordered table-striped " >
            <thead>
              <tr>
                <th>Band Name</th>
                <th>Genre</th>
                <th>Started since</th>
                <th>Members</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="band in bands" :key="band.id">
                <td>{{ band.band_name }}</td>
                <td>{{ band.genre }}</td>
                <td>{{ band.year_started }}</td>
                <td>{{ band.membersCount }}</td>
                <td>
                  <button @click="deleteBand(band.id)" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <style>
  .container {
    padding: 0;
    height: 75vh;
  }
  
.content {
  padding: 1rem;
}

  .nav-content h1 {
    font-size: 2rem;
    margin-left: 2rem;
    font-weight: 700;
    justify-content: flex-start;
    color:#4d4a4b;
  }
  
  .nav-content {
    border-bottom: 1px solid #2b292a;
    padding-bottom: 10px;
    display: flex;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
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
  
  .plus {
    padding: 1vh 1vw;
    color: #fff;
    background-color: rgb(71, 65, 65);
    border-radius: 5px;
    font-size: 25px;
    text-decoration: none;
    margin-left: 70rem;
    font-weight: 500;
  }
  
  .btn {
    background-color: #dc3545; 
    color: #ffffff;
    border-radius: 5px;
    padding: 5px 10px;
    border-style: none;
  }
  </style>
  <script setup>
  import { onMounted, ref } from 'vue';
  
  const bands = ref([]);
  
  onMounted(() => {
    fetch('http://localhost:8000/api/bands')
      .then(response => response.json().then(data => (bands.value = data)));
  });
  
  const deleteBand = async (bandId) => {
    try {
        const response = await fetch('http://localhost:8000/api/bands/' + bandId, {
        method: 'DELETE',
    });

  
      if (response.ok) {
        bands.value = bands.value.filter((band) => band.id !== bandId);
        alert('Band deleted successfully!');
      } else {
        console.error('Failed to delete band:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting band:', error);
    }
  };
</script>

  
  