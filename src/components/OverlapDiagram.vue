<template>
    <div class="canvas-container" v-if="overlayVisible">
      <div id="static-canvas" class="canvas">
        <!-- Static BPMN Canvas -->
      </div>
      <div id="overlay-container" class="overlay-container">
        <!-- Overlay BPMN Canvas -->
      </div>
      <button class="download-button" @click="downloadBpmnFile">Download</button>
    </div>
  </template>
  
  <script>
  import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
  import BpmnModeler from 'bpmn-js/lib/Modeler';
  import BpmnColorPickerModule from 'bpmn-js-color-picker';
  
  export default {
    props: {
      leftBPMNUrl: String,
      rightBPMNUrl: String,
      leftFile: File,
      rightFile: File
    },
    inject: ["eventBus"],
    data() {
      return {
        overlayVisible: true, // Set to true to initially show the overlay
        leftViewer: null,
        overlayViewer: null,
      };
    },
    methods: {
      async downloadBpmnFile() {
        // Get BPMN XML from the viewer
        const { xml } = await this.overlayViewer.saveXML({ format: true });
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
      initializeViewers() {
        // Initialize the static BPMN viewer
        this.leftViewer = new BpmnViewer({
          container: '#static-canvas',
          keyboard: {
            bindTo: window
          }
        });
  
        // Load and display the static BPMN
        
        if(this.leftFile) {
          this.handleFileSelect(this.leftViewer, this.leftFile, "static-canvas");
        } else {
          this.loadBPMN(this.leftViewer, this.leftBPMNUrl, "static-canvas");
        }
  
        // Initialize the overlay BPMN viewer
        this.overlayViewer = new BpmnModeler({
          container: '#overlay-container',
          keyboard: {
            bindTo: window
          },
          additionalModules: [
            BpmnColorPickerModule // to add options for colors.
          ]
        });
  
        // Load and display the overlay BPMN
        if(this.rightFile) {
          this.handleFileSelect(this.overlayViewer, this.rightFile, "overlay-container");
        } else {
          this.loadBPMN(this.overlayViewer, this.rightBPMNUrl, "overlay-container");
        }
      },
      openFile(viewer, file, target, done) {
        var reader = new FileReader();

        reader.onload = function (e) {
          var xml = e.target.result;
          done(viewer, {xml: xml}, target);
        };

        reader.readAsText(file);
      },
      handleFileSelect(viewer, e, side) {
        var files = e.target.files;
        this.openFile(viewer, files[0], side, this.loadBPMN);
      },
      loadBPMN(viewer, bpmnUrl, name) {
        if(bpmnUrl.xml) {
          viewer.importXML(bpmnUrl.xml).then(function(result) {
              const { warnings } = result;
              console.log('success !', warnings);
              viewer.get('canvas').zoom('fit-viewport');
              return;
              }).catch(function(err) {

              const { warnings, message } = err;

              console.log('something went wrong:', warnings, message);
              return;
            });
        }
        fetch(bpmnUrl)
          .then(response => response.text())
          .then(xml => {
            viewer.importXML(xml).then(function(result) {
              const { warnings } = result;
              console.log('success !', warnings);
              viewer.get('canvas').zoom('fit-viewport');
              }).catch(function(err) {

              const { warnings, message } = err;

              console.log('something went wrong:', warnings, message);
            });
          });
      },
    },
    mounted() {
      this.initializeViewers();
      this.eventBus.on("resetDiagram", () => {
        this.overlayVisible = false;
        this.leftViewer= '';
        this.overlayViewer= '';
        setTimeout(()=> {
          this.overlayVisible = true;
        }, 100)
        setTimeout(()=> {
          this.initializeViewers();
        }, 200)
      });
    },
    unmounted() {
      this.eventBus.off('resetDiagram');
    }
  };
  </script>
  
  <style scoped>
.download-button {
    position: absolute;
    right: 40px;
    top: -40px;
    width: 100px;
  }
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
    opacity: 60%;
  }
  
  #overlay-container canvas {
    width: 100%;
    height: 100%;
    pointer-events: none; /* Make the overlay non-interactive */
    opacity: 0.4; /* Set the overlay opacity as needed (0.5 for semi-transparent) */
  }
  </style>
  
   
  