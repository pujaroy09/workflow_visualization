<script>
import BpmnModeler from 'bpmn-js/lib/Modeler';

export default {
  inject: ["eventBus"],
  props:{
    type: String,
    department: String
  },
  data() {
    return {
      viewer: null,
    };
  },
  methods: {
    async downloadBpmnFile() {
      // Get BPMN XML from the viewer
      const { xml } = await this.viewer.saveXML({ format: true });
      this.downloadFile(xml, 'yourBpmnDiagram.bpmn');
    },
    downloadFile(content, fileName) {
      const blob = new Blob([content], { type: 'application/xml' });
      const link = document.createElement('a');

      link.href = URL.createObjectURL(blob);
      link.download = fileName;

      // Trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
    },
    async showDiagram(xmlData) {
      this.viewer = new BpmnModeler({
        container: '#canvas',
        keyboard: {
          bindTo: window
        }
      });
      await this.viewer.importXML(xmlData).then(function(result) {

        const { warnings } = result;

        console.log('success !', warnings);
      }).catch(function(err) {

        const { warnings, message } = err;

        console.log('something went wrong:', warnings, message, err);
      });
      this.viewer.get('canvas').zoom('fit-viewport');
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
  },
  unmounted() {
    this.eventBus.off('resetDiagram');
  }
};

</script>

<template>
  <div id = "canvas">
  </div>
  <button class="download-button" @click="downloadBpmnFile">Download</button>
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
    .download-button {
      position: absolute;
      right: 100px;
      top: 0;
      width: 100px;
    }
    
</style>
