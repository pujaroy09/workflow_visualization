<script>
import CompareDaigram from '../../components/CompareDaigram.vue';
import OverlapDiagram from '../../components/OverlapDiagram.vue';

export default {
  components: { CompareDaigram, OverlapDiagram },

  data() {
      return {
        type1: "rcs",
        rcsDepartments1: ['Mathematics', 'Statistics', 'Computer Science'],
        selectedRcsDepartment1: "",
        bakeryDepartments1: ['Pizza', 'Cake', 'Coffee'],
        selectedBakeryDepartment1: "",
        type2: "rcs",
        rcsDepartments2: ['Mathematics', 'Statistics', 'Computer Science'],
        selectedRcsDepartment2: "",
        bakeryDepartments2: ['Pizza', 'Cake', 'Coffee'],
        selectedBakeryDepartment2: "",
        formSubmitted: false,
        formOverlay: false,
        selectedDept1: "",
        selectedDept2: "",
        leftBpmn: '',
        rightBpmn: '',
      };
    },
    methods: {
      compare: function (buttonType) {
        this.selectedDept1 = this.selectedBakeryDepartment1 || this.selectedRcsDepartment1;
          this.selectedDept2 = this.selectedBakeryDepartment2 || this.selectedRcsDepartment2;
          console.log(this.selectedDept1, this.selectedDept2, this.type1, this.type2)
          this.leftBpmn = `../../public/${this.type1}-${this.selectedDept1}.bpmn`;
          this.rightBpmn = `../../public/${this.type2}-${this.selectedDept2}.bpmn`;
          console.log(this.leftBpmn, this.rightBpmn);
        if (buttonType == "compare"){
          
          this.formSubmitted = true
        }
        else{
          this.formOverlay = true
        }
        document.querySelector('body').style.color = "black";
        document.querySelector('body').style.backgroundImage = "unset";
        
        
      },
      onChange1(type) {
        this.selectedBakeryDepartment1 = '';
        this.selectedRcsDepartment1 = '';
      },
      onChange2(type) {
        this.selectedBakeryDepartment2 = '';
        this.selectedRcsDepartment2 = '';
      }
    },
}

</script>

<template>
  <header>
    <div class="wrapper">
      <div class="parent-container">
        <h1>Workflow Comparison</h1>
        <div class="subtext-container">
          <span>Compare - One Above the Other</span>
          <span>Overlay - One Overlaps the Other</span>
        </div>

        <div class="form-container" v-if="!(formSubmitted || formOverlay)">
            <!-- Form 1 -->
            <form>
              <div>
                <span>Workflow Type</span>
                <input type="radio" v-model="type1" @change="onChange1(type1)" value="rcs">RCS
                <input type="radio" v-model="type1" @change="onChange1(type1)" value="bakery">Bakery
              </div>
            <div v-if="type1 === 'rcs'">
                <span>Department</span>
                <select name="" id="" v-model="selectedRcsDepartment1">
                  <option value="" disabled>Top or Back</option>
                <option v-for="department in rcsDepartments1" :key="department">{{ department }}</option>
                </select><br>
            </div>
            <div v-if="type1 === 'bakery'">
                <span>Menu</span>
                <select name="" id="" v-model="selectedBakeryDepartment1">
                <option value="" disabled>Top or Back</option>
                <option v-for="department in bakeryDepartments1" :key="department">{{ department }}</option>
                </select><br>
            </div>
            </form>
            <!-- Form 2 -->
            <form>
              <div>
                <span>Workflow Type</span>
                <input type="radio" @change="onChange2(type2)" v-model="type2" value="rcs">RCS
                <input type="radio" @change="onChange2(type2)" v-model="type2" value="bakery">Bakery
              </div>
            <div v-if="type2 === 'rcs'">
                <span>Department</span>
                <select name="" id="" v-model="selectedRcsDepartment2">
                <option value="" disabled>Bottom or Front</option>
                <option v-for="department in rcsDepartments2" :key="department">{{ department }}</option>
                </select><br>
            </div>
            <div v-if="type2 === 'bakery'">
                <span>Menu</span>
                <select name="" id="" v-model="selectedBakeryDepartment2">
                <option value="" disabled>Bottom or Front</option>
                <option v-for="department in bakeryDepartments2" :key="department">{{ department }}</option>
                </select><br>
            </div>
            </form>
        </div>
                         
        <input
            v-if="!(formSubmitted || formOverlay)" 
            class="submit" 
            type="button" 
            value="Compare"
            @click="compare('compare')"
        > 
        
        <input
            v-if="!(formOverlay || formSubmitted)" 
            class="submit1" 
            type="button" 
            value="Overlay"
            @click="compare('overlay')"
        >
        
        

        <!-- <router-link to="/home">Home</router-link> -->
      </div>
      
    </div>
    <div v-if="formSubmitted" class="form-data">
          <compare-daigram :leftBPMNUrl = "leftBpmn" :rightBPMNUrl = "rightBpmn"></compare-daigram>
    </div>
    <div v-if="formOverlay" class="form-data">
          <overlap-diagram :leftBPMNUrl = "leftBpmn" :rightBPMNUrl = "rightBpmn"></overlap-diagram>
    </div>
  </header>
  <router-link to="/home">Home</router-link>
</template>

<style scoped>
body {
  background: #fff;
}
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
    height: 90vh;
}
form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    border: 2px solid black;
    border-radius: 5px;
    width: 40%;
    min-height: 200px;
    min-width: 270px;
    max-width: 270px;
  }
  form div {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
  .submit1 {
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
    padding: 30px 0;
    width: 50%;
  }
  .parent-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
  }
  .parent-container h1 {
    font-size: 45px;
  }
  header {
    height: 100vh;
  }
  .subtext-container {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  }
  .subtext-container span {
    margin: 0;
  }
  body {
    background-image: linear-gradient(45deg, rgba(161, 71, 70, 0.8), rgba(1, 8, 15, 0)), url(/src/assets/home_cover.jpg);
    color: white;
    font-family: ui-rounded !important;
  }
</style>
