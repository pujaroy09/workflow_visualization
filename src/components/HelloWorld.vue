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
      


      var modeler = new BpmnModeler({
        container: '#canvas',
        keyboard: {
          bindTo: window
        }
      });

      console.log(modeler)
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

<style scoped>
html, body, #canvas, #canvas > div {
      height: 100vh;
    }

    
</style>
