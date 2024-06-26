<template>
  <div class="content">
      <div class="di-container left drop-zone" target="left">
        <div class="canvas" id="canvas-left"></div>
      </div>

      <div class="di-container right drop-zone" target="right">
        <div class="canvas" id="canvas-right"></div>
      </div>
    </div>
</template>

<script>

import $ from "jquery";
import { forEach, isObject, every, filter } from "min-dash";
import BpmnViewer from "bpmn-js/lib/NavigatedViewer";
import { diff } from "bpmn-js-differ";

export default {
data() {
  return {
    viewers: []
  }
  
},
props: {
    leftBPMNUrl: String,
    rightBPMNUrl: String,
    leftFile: File,
    rightFile: File
},

methods: {
  createViewer(side) {
    return new BpmnViewer({
      container: "#canvas-" + side,
      height: "100%",
      width: "100%",
      canvas: {
        deferUpdate: false
      }
    });
  },

  syncViewers(a, b) {
    var changing;

    function update(viewer) {
      return function (e) {
        if (changing) {
          return;
        }

        changing = true;
        viewer.get("canvas").viewbox(e.viewbox);
        changing = false;
      };
    }

    function syncViewbox(a, b) {
      a.on("canvas.viewbox.changed", update(b));
    }

    syncViewbox(a, b);
    syncViewbox(b, a);
  },

  // creates canvas for each side.
  createViewers(left, right) {
    var sides = {};

    sides[left] = this.createViewer(left);
    sides[right] = this.createViewer(right);

    // sync navigation
    this.syncViewers(sides[left], sides[right]);

    return sides;
  },
  getViewer(side) {
    return this.viewers[side];
  },

  isLoaded(v) {
    return v.loading === false;
  },

  allDiagramsLoaded() {
    return every(this.viewers, this.isLoaded);
  },

  setLoading(viewer, loading) {
    viewer.loading = loading;
  },

  clearDiffs(viewer) {
    viewer.get("overlays").remove({ type: "diff" });

    forEach(viewer.get("elementRegistry")._elements, function (container) {
      var gfx = container.gfx,
        secondaryGfx = container.secondaryGfx;

      $(secondaryGfx || gfx)
        .removeClass("diff-added")
        .removeClass("diff-changed")
        .removeClass("diff-removed")
        .removeClass("diff-layout-changed");
    });
  },
  diagramLoading(side, viewer) {
    this.setLoading(viewer, true);

    var loaded = filter(this.viewers, this.isLoaded);

    // clear diffs on loaded
    forEach(loaded, this.clearDiffs);
  },

  diagramLoaded(err, side, viewer) {
    if (err.error) {
      console.error("load error", err);
    }
    this.setLoading(viewer, err.error || false);
    if (this.allDiagramsLoaded()) {
      // sync viewboxes
      var other = this.getViewer(side === "left" ? "right" : "left");
      viewer.get("canvas").viewbox(other.get("canvas").viewbox());
      this.showDiff(this.getViewer("left"), this.getViewer("right"));
    }
  },


  async loadDiagram(side, diagram) {
    var viewer = this.getViewer(side);
    
    const done = (err)=> {
      this.diagramLoaded(err, side, viewer);
    }

    this.diagramLoading(side, viewer);

    try {
      if (diagram.xml) {
        const result = await viewer.importXML(diagram.xml);
        viewer.get('canvas').zoom('fit-viewport');
        done(result);
        return;
      }
    } catch {

    }
    

    $.get(diagram.url, function (xml) {
      
      viewer.importXML(xml).then(function(result) {
        viewer.get('canvas').zoom('fit-viewport');
        done(result);
      }).catch(function(err) {
      });

      
    });
  },

  showDiff(viewerOld, viewerNew) {
    var result = diff(viewerOld.getDefinitions(), viewerNew.getDefinitions());
    forEach(this.viewers, this.clearDiffs);

    $.each(result._removed, (i, obj) => {
      this.highlight(viewerOld, i, "diff-removed");
      this.addMarker(viewerOld, i, "marker-removed", "&minus;");
    });

    $.each(result._added, (i, obj) => {
      this.highlight(viewerNew, i, "diff-added");
      this.addMarker(viewerNew, i, "marker-added", "&#43;");
    });

    $.each(result._layoutChanged, (i, obj) => {
      this.highlight(viewerOld, i, "diff-layout-changed");
      this.addMarker(viewerOld, i, "marker-layout-changed", "&#8680;");

      this.highlight(viewerNew, i, "diff-layout-changed");
      this.addMarker(viewerNew, i, "marker-layout-changed", "&#8680;");
    });

    function prettyPrint(obj) {
      return JSON.stringify(obj, null, "  ").replace(/"/g, "&quot;");
    }

    $.each(result._changed, (i, obj) => {
      this.highlight(viewerOld, i, "diff-changed");
      this.addMarker(viewerOld, i, "marker-changed", "&#9998;");

      this.highlight(viewerNew, i, "diff-changed");
      this.addMarker(viewerNew, i, "marker-changed", "&#9998;");

      var details = "<table><tr><th>Attribute</th><th>old</th><th>new</th></tr>";
      $.each(obj.attrs, function (attr, changes) {
        details =
          details +
          "<tr>" +
          "<td>" +
          attr +
          "</td>" +
          "<td " +
          (isObject(changes.oldValue)
            ? 'title="' + prettyPrint(changes.oldValue) + '"'
            : "") +
          ">" +
          changes.oldValue +
          "</td>" +
          "<td " +
          (isObject(changes.newValue)
            ? 'title="' + prettyPrint(changes.newValue) + '"'
            : "") +
          ">" +
          changes.newValue +
          "</td>" +
          "</tr>";
      });

      details = details + "</table></div>";

      viewerOld
        .get("elementRegistry")
        .getGraphics(i)
        .addEventListener("click", function (event) {
          $("#changeDetailsOld_" + i).toggle();
        });

      var detailsOld =
        '<div id="changeDetailsOld_' + i + '" class="changeDetails">' + details;

      // attach an overlay to a node
      viewerOld.get("overlays").add(i, "diff", {
        position: {
          bottom: -5,
          left: 0
        },
        html: detailsOld
      });

      $("#changeDetailsOld_" + i).toggle();

      viewerNew
        .get("elementRegistry")
        .getGraphics(i)
        .addEventListener("click", function (event) {
          $("#changeDetailsNew_" + i).toggle();
        });

      var detailsNew =
        '<div id="changeDetailsNew_' + i + '" class="changeDetails">' + details;

      // attach an overlay to a node
      viewerNew.get("overlays").add(i, "diff", {
        position: {
          bottom: -5,
          left: 0
        },
        html: detailsNew
      });

      $("#changeDetailsNew_" + i).toggle();
    });

  },



  openDiagram(xml, side) {
    this.loadDiagram(side, { xml: xml });
  },

  openFile(file, target, done) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var xml = e.target.result;
      done(xml, target);
    };

    reader.readAsText(file);
  },

  addMarker(viewer, elementId, className, symbol) {
    var overlays = viewer.get("overlays");

    try {
      // attach an overlay to a node
      overlays.add(elementId, "diff", {
        position: {
          top: -12,
          right: 12
        },
        html: '<span class="marker ' + className + '">' + symbol + "</span>"
      });
    } catch (e) {
      // wow
    }
  },

  highlight(viewer, elementId, marker) {
    viewer.get("canvas").addMarker(elementId, marker);
  },

  unhighlight(viewer, elementId, marker) {
    viewer.get("canvas").removeMarker(elementId, marker);
  },

  handleFileSelect(e) {
    var files = e.target.files;
    this.openFile(files[0], e.target.attributes.target.value, this.openDiagram);
  }
},
mounted() {
  document.getElementById('canvas-left').innerHTML = '';
  document.getElementById('canvas-right').innerHTML = '';
  const resetButton = document.getElementById('reset-button');
  if(resetButton) {
    resetButton.style.display = "none";
  }
  this.viewers = this.createViewers("left", "right");
  if(this.leftFile) {
    setTimeout(()=> {
      this.handleFileSelect(this.leftFile);
    }, 0)
  } else {
    this.loadDiagram("left", { url: this.leftBPMNUrl });
  }
  if(this.rightFile) {
    setTimeout(()=> {
      this.handleFileSelect(this.rightFile);
    }, 0)
  } else {
    this.loadDiagram("right", { url: this.rightBPMNUrl });
  }

  $("#changes-overview .show-hide-toggle").click(() => {
    $("#changes-overview").toggleClass("collapsed");
  });
  $("body").removeClass("preload");
},
}
</script>
<style scoped>
html,
body,
#container {
  font-size: 12px;
  height: 100%;
  margin: 0;
  overflow: hidden;
  padding: 0;
}

</style>