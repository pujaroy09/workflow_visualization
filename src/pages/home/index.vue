<template>
    <div class="homepage-wrapper">
        <div class = "title">
            <span class="web">Web-based</span> 
            <span class="int">Interactive</span>
            <span class="work">Workflow Visualation</span>
            <span class="compare">compare and visualize workflow that is interactive at real time</span>
            <div class="button-container">
                <input @click="$router.push('workflow_visualization')" class="button-3 color-yellow" type="button" value="Visualize Workflow" />
                <input @click="$router.push('workflow_comparison')" class="button-3" type="button" value="Compare Workflow" />
            </div>
        </div>
    </div>
    
    
</template>

<style scoped>
#app {
    height: 100vh;
}
.homepage-wrapper {
    background-image:  linear-gradient(45deg, 
              rgba(161, 71, 70, 0.75), 
              rgba(1, 8, 15, 0.75)), url("../../assets/home_cover.jpg");
    background-size: cover;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.logo{

}
.title{
    

}
.button-container {
    display: flex;
    align-content: center;
    justify-content: space-evenly;
    padding: 40px 0;
}

.button-3 {
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  line-height: 20px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  font-size: 20px;
  padding: 15px 25px;
}

.button-3:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.button-3:hover {
  background-color: #2c974b;
}

.button-3:focus {
  box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
  outline: none;
}

.button-3:disabled {
  background-color: #94d3a2;
  border-color: rgba(27, 31, 35, .1);
  color: rgba(255, 255, 255, .8);
  cursor: default;
}

.button-3:active {
  background-color: #298e46;
  box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}

.color-yellow {
    background-color: #b2d630;
}

.color-yellow:active {
    background-color: #7e9924;
}
.color-yellow:hover {
    background-color: #7e9924;
}
.color-yellow:focus {
    background-color: #7e9924;
}

.title .web{
    font-size: 50px;
    color: aliceblue;
    padding-right: 5px;
    align-content: center;
}

.title .work{
    font-size: 50px;
    padding-right: 3px;
    color: aliceblue;
    align-content: center;
}

.title .int{
    font-size: 50px;
    padding-left: 5px;
    padding-right: 7px;
    color:burlywood;
    
}

.title .compare{
    font-size: 20px;
    padding-right: 5px;;
    color: aliceblue;
    align-content: center;
    text-align: center;
    display: block;
}
</style>