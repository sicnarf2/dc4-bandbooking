<template>
    <div class="container">
      <div class="content">
      <div class="nav-content">
        <h1 class="cust">
          ORDER
          <RouterLink to="/ordercreate" class="plus">Add</RouterLink>
        </h1>
      </div>
      <div class="table-orders">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer ID</th>
              <th>Customer's Name</th>
              <th>Vehicle ID</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Transmission</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.customer?.id }}</td>
              <td>{{ order.customer?.fullname }}</td>
              <td>{{ order.vehicle?.id }}</td>
              <td>{{ order.vehicle?.make }}</td>
              <td>{{ order.vehicle?.model }}</td>
              <td>{{ order.vehicle?.year }}</td>
              <td>{{ order.vehicle?.transmission }}</td>
              <td>{{ order.quantity }}</td>
              <td>{{ order.total_amount }}</td>
              <td>
                <button @click="deleteOrder(order.id)" class="btn btn-danger">Delete</button>
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

const orders = ref([]);

onMounted(() => {
  fetch('http://localhost:8000/api/orders')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const promises = data.map(order => {
        // Fetch data for the customer
        const customerFetchUrl = `http://localhost:8000/api/customers/${order.customer_id}`;
        const customerPromise = fetch(customerFetchUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          });

        // Fetch data for the vehicle
        const vehicleFetchUrl = `http://localhost:8000/api/vehicles/${order.vehicle_id}`;
        const vehiclePromise = fetch(vehicleFetchUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          });

        // Combine promises for customer and vehicle
        return Promise.all([customerPromise, vehiclePromise])
          .then(([customerData, vehicleData]) => {
            console.log('Customer Data:', customerData);
            console.log('Vehicle Data:', vehicleData);

            // Return order with both customer, and vehicle data
            return { ...order, customer: customerData, vehicle: vehicleData };
          });
      });

      return Promise.all(promises);
    })
    .then(ordersWithCustomers => {
      console.log('Orders with Customers and Vehicles:', ordersWithCustomers);
      orders.value = ordersWithCustomers;
    })
    .catch(error => console.error('Error fetching data:', error.message));
});

</script>
  