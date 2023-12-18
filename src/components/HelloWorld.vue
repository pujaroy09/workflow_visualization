<script>
import BpmnViewer from 'bpmn-js';
var diagramUrl = '../../public/pizza-collaboration.bpmn';
export default {
  methods: {
    showDiagram(xmlData) {
      


      var viewer = new BpmnViewer({
        container: '#canvas'
      });


      viewer.importXML(xmlData).then(function(result) {

        const { warnings } = result;

        console.log('success !', warnings);

        viewer.get('canvas').zoom('fit-viewport');
      }).catch(function(err) {

        const { warnings, message } = err;

        console.log('something went wrong:', warnings, message);
      });
    },  
  },
  mounted() {
    $.get(diagramUrl, this.showDiagram, 'text');
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
