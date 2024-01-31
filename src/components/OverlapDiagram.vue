<template>
    <div class="canvas-container">
      <div id="static-canvas" class="canvas">
        <!-- Static BPMN Canvas -->
      </div>
      <div id="overlay-container" class="overlay-container" v-if="overlayVisible">
        <!-- Overlay BPMN Canvas -->
      </div>
    </div>
  </template>
  
  <script>
  import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
  import BpmnModeler from 'bpmn-js/lib/Modeler';
  
  export default {
    props: {
      leftBPMNUrl: String,
      rightBPMNUrl: String,
    },
    data() {
      return {
        overlayVisible: true, // Set to true to initially show the overlay
        leftViewer: null,
        overlayViewer: null,
      };
    },
    methods: {
      initializeViewers() {
        // Initialize the static BPMN viewer
        this.leftViewer = new BpmnViewer({
          container: '#static-canvas',
          keyboard: {
            bindTo: window
          }
        });
  
        // Load and display the static BPMN
        this.loadBPMN(this.leftViewer, this.leftBPMNUrl, "static-canvas");
  
        // Initialize the overlay BPMN viewer
        this.overlayViewer = new BpmnModeler({
          container: '#overlay-container',
          keyboard: {
            bindTo: window
          }
        });
  
        // Load and display the overlay BPMN
        this.loadBPMN(this.overlayViewer, this.rightBPMNUrl, "overlay-container");
      },
      loadBPMN(viewer, bpmnUrl, name) {
        fetch(bpmnUrl)
          .then(response => response.text())
          .then(xml => {
            viewer.importXML(xml);
            console.log(viewer.get('canvas'));
            viewer.get('canvas').zoom('fit-viewport');
          });
      },
    },
    mounted() {
      this.initializeViewers();
    },
  };
  </script>
  
  <style scoped>
  .canvas-container {
    position: relative;
    height: 100vh;
  }
  
  .canvas {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  #static-canvas {
    padding: 20px 20px;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    background: #fff;
  }
  
  .overlay-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  #overlay-container canvas {
    width: 100%;
    height: 100%;
    pointer-events: none; /* Make the overlay non-interactive */
    opacity: 0.4; /* Set the overlay opacity as needed (0.5 for semi-transparent) */
  }
  </style>
  
   
  