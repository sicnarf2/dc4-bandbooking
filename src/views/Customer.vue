<template>
    <div class="container">
      <div class="content">
        <div class="nav-content">
          <h1 class="cust">
            CUSTOMER
            <RouterLink to="/customercreate" class="plus">Add</RouterLink>
          </h1>
        </div>
        <div class="table-customers">
          <table class="table table-bordered table-striped " >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="customer in customers" :key="customer.id">
                <td>{{ customer.id }}</td>
                <td>{{ customer.fullname }}</td>
                <td>{{ customer.email }}</td>
                <td>{{ customer.address }}</td>
                <td>{{ customer.phoneNumber }}</td>
                <td>
                  <button @click="deleteCustomer(customer.id)" class="btn btn-danger">Delete</button>
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
    /* margin-left: 4vw; */
  }
  </style>
  <script setup>
  import { onMounted, ref } from 'vue';
  
  const customers = ref([]);
  
  onMounted(() => {
    fetch('http://localhost:8000/api/customers')
      .then(response => response.json().then(data => (customers.value = data)));
  });
  
  const deleteCustomer = async (customerId) => {
    try {
        const response = await fetch('http://localhost:8000/api/customers/' + customerId, {
        method: 'DELETE',
    });

  
      if (response.ok) {
        customers.value = customers.value.filter((customer) => customer.id !== customerId);
        alert('Customer deleted successfully!');
      } else {
        console.error('Failed to delete customer:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };
</script>

  
  