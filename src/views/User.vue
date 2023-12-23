<template>
    <div class="container">
      <div class="content">
        <div class="nav-content">
          <h1 class="cust">
            USER
            <RouterLink to="/usercreate" class="plus">Add</RouterLink>
          </h1>
        </div>
        <div class="table-users">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user . id}}</td>
                <td>{{ user . name }}</td>
                <td>{{ user . email }}</td>               
                <td>
                  <button @click="deleteUser(user.id)" class="btn btn-danger">Delete</button>
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

  th,
  td {
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
    margin-left: 75.75rem;
    font-weight: 500;
    /* justify-content: flex-end; */
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

  const users = ref([]);

  onMounted(() => {
    fetch('http://localhost:8000/api/users')
      .then(response => response.json().then(data => (users.value = data)));
  });

  const deleteUser = async (bandId) => {
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

//     import { onMounted, ref } from 'vue';
  
//   const vehicles = ref([]);
  
//   onMounted(async () => {
//   try {
//     const response = await fetch('http://localhost:8000/api/vehicles');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();

//     const promises = data.map(async (vehicle) => {
//       const orderResponse = await fetch(`http://localhost:8000/api/orders/${vehicle.order_id}`);
//       if (!orderResponse.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const orderData = await orderResponse.json();
//       return { ...vehicle, order: orderData };
//     });

//     const vehiclesWithOrder = await Promise.all(promises);
//     console.log('Vehicles with order:', vehiclesWithOrder);
//     vehicles.value = vehiclesWithOrder;
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//   }
// });

  
//   const deleteVehicle = async (vehicleId) => {
//     try {
//       const response = await fetch(`http://localhost:8000/api/vehicles/${vehicleId}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         vehicles.value = vehicles.value.filter((vehicle) => vehicle.id !== vehicleId);
//         alert('Vehicle deleted successfully!');
//       } else {
//         console.error('Failed to delete vehicle:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error deleting vehicle:', error);
//     }
//   };
  </script>
  