<script>
import BpmnModeler from 'bpmn-js/lib/Modeler';

var rcsUrl = '../../public/rcs.bpmn';
var bakeryUrl = '../../public/pizza-collaboration.bpmn';
var carUrl = '';
export default {
  props:{
    type: String
  },
  methods: {
    showDiagram(xmlData) {
      console.log(xmlData);
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
    if(this.type== 'rcs'){
      $.get(rcsUrl, this.showDiagram, 'text');
    } else if (this.type == 'bakery'){
      $.get(bakeryUrl, this.showDiagram, 'text');
    } else
    $.get(carUrl, this.showDiagram, 'text');
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
      background: rgb(243, 244, 246);
    }
    #canvas {
      margin-top: 20px;
      padding: 10px 40px;
      box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
      background: #fff;
    }

    
</style>
