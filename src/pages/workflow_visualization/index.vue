<script>
import ModelDiagram from '../../components/ModelDiagram.vue';

export default {
  components: { ModelDiagram },
  data() {
      return {
        type: "rcs",
        formSubmitted: false,
        rcsDepartments: ['Mathematics', 'Statistics', 'Computer Science'],
        bakeryDepartments: ['Pizza', 'Cake'],
        professors: ['Professor 1', 'Professor 2', 'Professor 3'],
        selectedRcsDepartment: "",
        selectedBakeryDepartment: "",
        selectedProfessor: "",
      };
    },
    methods: {
      submitForm: function () {
        this.formSubmitted = true;
        document.querySelector('body').style.color = "black";
        document.querySelector('body').style.backgroundImage = "unset";
      },
      onChange() {
        this.selectedBakeryDepartment = '';
        this.selectedRcsDepartment = '';
      },
    },
    mounted() {
      document.querySelector('body').style.color = "white";
      document.querySelector('body').style.backgroundImage = 
      "linear-gradient(45deg, rgba(161, 71, 70, 0.8), rgba(1, 8, 15, 0)), url(/src/assets/home_cover.jpg)";
    }
}

</script>

<template>
  <header>
    <div class="wrapper">
      <div>
        <h1 class="header-text">Workflow Visualization</h1>
        <div class="subtext-container">
          <span>This page is interactive and allows to do modification</span>
        </div>
        <form @submit.prevent="submitForm" v-if="!formSubmitted">
          <span>Workflow Type</span>
          <input type="radio" @change="onChange()" v-model="type" value="rcs">RCS
          <input type="radio" @change="onChange()" v-model="type" value="bakery">Bakery
          <br>
          <div v-if="type === 'rcs'">
            <span>Department</span>
            <select name="" id="" v-model="selectedRcsDepartment">
              <option value="" disabled>Select a department</option>
              <option v-for="department in rcsDepartments" :key="department">{{ department }}</option>
            </select><br>
            <span>Select Professor</span>
            <select name="" id="" v-model="selectedProfessor">
              <option value="" disabled>Select a professor</option>
              <option v-for="professor in professors" :key="professor">{{ professor }}</option>
            </select><br><br>
          </div>
          <div v-if="type === 'bakery'">
            <span>Menu</span>
            <select name="" id="" v-model="selectedBakeryDepartment">
              <option value="" disabled>Select a menu</option>
              <option v-for="department in bakeryDepartments" :key="department">{{ department }}</option>
            </select><br><br>
          </div>
          
          <input 
            :disabled="!((selectedRcsDepartment && selectedProfessor) || selectedBakeryDepartment)"
            class="submit" 
            type="submit" 
            value="Submit"
          >
        </form>
        <div v-if="formSubmitted" class="form-data">
          <p>Workflow Type: <span class="inner-child">{{ type }}</span></p>
          <div v-if="type === 'rcs'">  
            <p>Department: <span>{{ selectedRcsDepartment }}</span></p>
            <p>Professor: <span>{{ selectedProfessor }}</span></p>
          </div>
          <div v-if="type === 'bakery'">  
            <p>Menu: <span>{{ selectedBakeryDepartment }}</span></p>
          </div>
          <model-diagram :type="type" :department="selectedBakeryDepartment || selectedRcsDepartment"></model-diagram>
        </div>
        <router-link to="/home">Home</router-link>
      </div>
      
    </div>
  </header>
<router-view></router-view>
</template>

<style scoped>
.header-text {
  font-size: 45px;
}
.subtext-container {
text-align: center;
}
body {
  background: #fff;
}
p {
  font-weight: bold;
  text-transform: capitalize;
}
h1 {
  text-align: center;
    font-weight: bold;
}
.form-data {
    padding: 0 40px;
    position: relative;
}
input[type="submit"]:disabled {
  cursor: not-allowed;
}
form {
    padding: 30px 10px;
    border-radius: 5px;
    text-align: center;
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
  body {
    background-image: linear-gradient(45deg, rgba(161, 71, 70, 0.8), rgba(1, 8, 15, 0)), url(/src/assets/home_cover.jpg);
    color: white;
    font-family: ui-rounded !important;
  }
</style>
