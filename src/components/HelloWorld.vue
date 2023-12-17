<script>
import BpmnViewer from 'bpmn-js';
export default {
  methods: {
    funcUpload(event) {
      // var input = event.target;
      // var text = "";
      // var reader = new filereader();
      // var onload = function(event) {
      //     text = reader.result;
      //     console.log(text);

      // };

      // reader.onload = onload;
      // reader.readastext(input.files[0]);
      var example = event.target.files[0]
      console.log(event.target.files[0]);

      var viewer = new BpmnViewer({
  container: '#canvas'
});


viewer.importXML(example).then(function(result) {

  const { warnings } = result;

  console.log('success !', warnings);

  viewer.get('canvas').zoom('fit-viewport');
}).catch(function(err) {

  const { warnings, message } = err;

  console.log('something went wrong:', warnings, message);
});
    },
  }
};

</script>

<template>
  <input type='file' @change='funcUpload'>
  <div id = "canvas">
  </div>
</template>

<style scoped>

</style>
