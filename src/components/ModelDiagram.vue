<script>
import BpmnModeler from 'bpmn-js/lib/Modeler';

export default {
  inject: ["eventBus"],
  props:{
    type: String,
    department: String
  },
  methods: {
    showDiagram(xmlData) {
      var modeler = new BpmnModeler({
        container: '#canvas',
        keyboard: {
          bindTo: window
        }
      });
      modeler.importXML(xmlData).then(function(result) {

        const { warnings } = result;

        console.log('success !', warnings);

        modeler.get('canvas').zoom('fit-viewport');
      }).catch(function(err) {

        const { warnings, message } = err;

        console.log('something went wrong:', warnings, message);
      });
    },  
  },
  mounted() {
    $.get(`../../public/${this.type}-${this.department}.bpmn`, this.showDiagram, 'text');
    this.eventBus.on("resetDiagram", () => {
      document.getElementById("canvas").innerHTML = '';
      setTimeout(()=> {
        document.getElementById("canvas").innerHTML = '';
      }, 100)
      setTimeout(()=> {
        $.get(`../../public/${this.type}-${this.department}.bpmn`, this.showDiagram, 'text');
      }, 200)
    });
  }
};

</script>

<template>
  <div id = "canvas">
  </div>
</template>

<style>
html, body, #canvas, #canvas > div {
      height: 100vh;
      
      
    }

    body {
      padding: 0px;
    }
    #canvas {
      margin-top: 20px;
      padding: 10px 40px;
      box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
      background: #fff;
    }

    
</style>
