<script>
import CompareDaigram from '../../components/CompareDaigram.vue';

export default {
  components: { CompareDaigram },
  data() {
      return {
        type1: "rcs",
        departments1: ['Mathematics', 'Statistics', 'Computer Science'],
        professors1: ['Professor 1', 'Professor 2', 'Professor 3'],
        selectedDepartment1: "Mathematics",
        selectedProfessor1: "Professor 1",
        type2: "rcs",
        departments2: ['Mathematics', 'Statistics', 'Computer Science'],
        professors2: ['Professor 1', 'Professor 2', 'Professor 3'],
        selectedDepartment2: "Mathematics",
        selectedProfessor2: "Professor 1",
        formSubmitted: false
      };
    },
    methods: {
      compare: function () {
        this.formSubmitted = true
      },
    },
}

</script>

<template>
  <header>
    <div class="wrapper">
      <div class="parent-container">
        <h2>Workflow Comparison</h2>

        <div class="form-container" v-if="!formSubmitted">
            <!-- Form 1 -->
            <form>
            <h3>Information:</h3>
            <span>Workflow Type</span>
            <input type="radio" v-model="type1" value="rcs">RCS
            <input type="radio" v-model="type1" value="bakery">Bakery
            <input type="radio" v-model="type1" value="car assemble">Car Assemble
            <br>
            <div v-if="type1 === 'rcs'">
                <span>Choose Department</span>
                <select name="" id="" v-model="selectedDepartment1">
                <option value="" disabled>Select a car</option>
                <option v-for="department in departments1" :key="department">{{ department }}</option>
                </select><br>
                <span>Select Professor</span>
                <select name="" id="" v-model="selectedProfessor1">
                <option value="" disabled>Select a car</option>
                <option v-for="professor in professors1" :key="professor">{{ professor }}</option>
                </select><br>
            </div>
            </form>
            <!-- Form 2 -->
            <form>
            <h3>Information:</h3>
            <span>Workflow Type</span>
            <input type="radio" v-model="type2" value="rcs">RCS
            <input type="radio" v-model="type2" value="bakery">Bakery
            <input type="radio" v-model="type2" value="car assemble">Car Assemble
            <br>
            <div v-if="type2 === 'rcs'">
                <span>Choose Department</span>
                <select name="" id="" v-model="selectedDepartment2">
                <option value="" disabled>Select a car</option>
                <option v-for="department in departments2" :key="department">{{ department }}</option>
                </select><br>
                <span>Select Professor</span>
                <select name="" id="" v-model="selectedProfessor2">
                <option value="" disabled>Select a car</option>
                <option v-for="professor in professors2" :key="professor">{{ professor }}</option>
                </select><br>
            </div>
            </form>
        </div>
                         
        <input
            v-if="!formSubmitted" 
            class="submit" 
            type="button" 
            value="Compare"
            @click="compare"
        >   

        <div v-if="formSubmitted" class="form-data">
          <compare-daigram :type="type"></compare-daigram>
        </div>
        <!-- <router-link to="/home">Home</router-link> -->
      </div>
      
    </div>
  </header>
<router-view></router-view>
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
    width: 40%;
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

  .form-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 10px 0;
  }
  .parent-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
  }
</style>
