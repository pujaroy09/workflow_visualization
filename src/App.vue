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

        // New data property for user name
        userName: "Guest User",
        editedUserName: "", // to hold the edited name temporarily
      };
    },

    created() {
    // Check if the user name is stored in local storage
      this.userName = "Guest User";
      
    },

      methods: {
        submitForm: function () {
          this.formSubmitted = true
        },
    
      saveUserName: function () {
        if (this.editedUserName.trim() === "") {
          this.nameRequiredError = true; // Show the error
        } else {
          this.userName = this.editedUserName;
          this.editedUserName = ""; // Clear the temporary name
        }
      },
    },
}

</script>

<template>
  <header>
    <div class="wrapper">
      <div>
        
        <h1>Workflow Visualization</h1>
        <div class="user_name">
          <h2>Hello <span>{{ userName }}</span></h2>
          
          <!-- Input to edit the user name -->
          <input v-model="editedUserName" id='change_user' placeholder="Enter your name">
          <button @click="saveUserName" id="change_user_button">Change Name</button>

        </div>
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
          
          <input onclick="$('#change_user').hide(), $('#change_user_button').hide()"
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