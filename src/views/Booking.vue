<template>
    <div class="container">
      <div class="content">
      <div class="nav-content">
        <h1 class="cust">
          BOOKING
          <RouterLink to="/ordercreate" class="plus">Add</RouterLink>
        </h1>
      </div>
      <div class="table-orders">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID number</th>
              <th>Band ID</th>
              <th>Band Name</th>
              <th>Booking Date</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in bookings" :key="booking.id">
              <td>{{ booking.id}}</td>
              <td>{{ booking.band?.id }}</td>
              <td>{{ booking.band?.band_name }}</td>
              <td>{{ booking.booking_date }}</td>
              <td>
                <button @click="deleteBooking(booking.id)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>

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
    margin-left: 74.05rem;
    font-weight: 500;    /* justify-content: flex-end; */
  }
  
  .btn {
    background-color: #dc3545; 
    color: #ffffff;
    border-radius: 5px;
    padding: 5px 10px;
    border-style: none;
    /* margin-left: 4vw; */
  }

</style>



<script setup>
import { onMounted, ref } from 'vue';

const bookings = ref([]);

onMounted(() => {
  fetch('http://localhost:8000/api/bookings')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const promises = data.map(booking => {
        return fetch(`http://localhost:8000/api/band/${booking.band_id}`)
        // return fetch(`http://localhost:8000/api/bands/${bookings.band_id}')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
        .then(bandData => {

            return { ...booking, band: bandData };
          });
    });

      return Promise.all(promises);
    })
    .then(bookingsWithBand => {
      console.log('Bookings with Band: ', bookingsWithBand);
      bookings.value = bookingsWithBand;
    })
    .catch(error => console.error('Error fetching data:', error.message));
});

const deleteBooking = async (bookingId) => {
  try {
    const response = await fetch(`http://localhost:8000/api/bookings/${bookingId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      bookings.value = bookings.value.filter((booking) => booking.id !== bookingId);
      alert('Booking deleted successfully!');
    } else {
      console.error('Failed to delete booking:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
  }
};
</script>
  