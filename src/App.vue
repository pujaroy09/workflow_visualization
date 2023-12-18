<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  components: { HelloWorld },
  data() {
      return {
        type: "rcs",
        formSubmitted: false,
        departments: ['Maths', 'Statistics', 'Computer Science'],
        professors: ['Professor 1', 'Professor 2', 'Professor 3'],
        selectedDepartment: "Maths",
        selectedProfessor: "Professor 1",
      };
    },
    methods: {
      submitForm: function () {
        this.formSubmitted = true
      }
    },
}

</script>

<template>
  <header>
    <div class="wrapper">
      <div>
        <h2>Workflow Visualization</h2>
        <form @submit.prevent="submitForm" v-if="!formSubmitted">
          <h3>Information:</h3>
          <span>Workflow Type</span>
          <input type="radio" v-model="type" value="rcs">RCS
          <input type="radio" v-model="type" value="bakery">Bakery
          <input type="radio" v-model="type" value="car assemble">Car Assemble
          <br>
          <div v-if="type === 'rcs'">
            <span>Choose Department</span>
            <select name="" id="" v-model="selectedDepartment">
              <option value="" disabled>Select a car</option>
              <option v-for="department in departments" :key="department">{{ department }}</option>
            </select><br>
            <span>Select Professor</span>
            <select name="" id="" v-model="selectedProfessor">
              <option value="" disabled>Select a car</option>
              <option v-for="professor in professors" :key="professor">{{ professor }}</option>
            </select><br>
          </div>
          
          <input 
            class="submit" 
            type="submit" 
            value="Submit"
          >
        </form>
        <div v-if="formSubmitted" class="form-data">
          <p>Workflow Type: <span class="inner-child">{{ type }}</span></p>
          <div v-if="type === 'rcs'">  
          <p>Department: <span>{{ selectedDepartment }}</span></p>
          <p>Professor: <span>{{ selectedProfessor }}</span></p>
          </div>
          <hello-world :type="type"></hello-world>
        </div>
      </div>
      
    </div>
  </header>

</template>

<style scoped>
p {
  font-weight: bold;
  text-transform: capitalize;
}
h2 {
  text-align: center;
    font-weight: bold;
}
.form-data {
    padding: 0 40px;
}
form {
    padding: 10px;
    border: 2px solid black;
    border-radius: 5px;
  }

  input {
    padding: 4px 8px;
    margin: 4px;
  }

  span {
    font-size: 18px;
    margin: 4px;
    font-weight: 500;
  }

  .submit {
    font-size: 15px;
    color: #fff;
    background: #222;
    padding: 6px 12px;
    border: none;
    margin-top: 8px;
    cursor: pointer;
    border-radius: 5px;
  }
</style>
