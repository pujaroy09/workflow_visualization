<template>
    <div class="logo">
     
    </div>
    <div class="center">
    </div>
    <div class = "title">
        <span class="web">Web-based</span> 
        <span class="int">Intractive</span><br> 
        <span class="work">Workflow Visualation</span><br>
        <span class="compare">compare and visualize workflow that is intractive at real time</span>

    </div>
</template>

<style scoped>
.center {
    background-image:  linear-gradient(45deg, 
              rgba(161, 71, 70, 0.75), 
              rgba(1, 8, 15, 0.75)), url("../../assets/home_cover.png");
    background-size: cover;
    height: 100vh;
   
}
.logo{

}
.title{
    position: absolute;
    left: 10px;
    right: inherit;
    top:50px;

}
.title .web{
    font-size: 50px;
    font-family: ui-rounded;
    color: aliceblue;
    padding-right: 5px;
    align-content: center;
}

.title .work{
    font-size: 50px;
    font-family: ui-rounded;
    padding-right: 3px;
    color: aliceblue;
    align-content: center;
}

.title .int{
    font-size: 60px;
    font-family: ui-rounded; 
    padding-left: 5px;
    color:burlywood;
    
}

.title .compare{
    font-size: 20px;
    font-family: ui-rounded;
    padding-right: 5px;;
    color: aliceblue;
    align-content: center;
}
</style>