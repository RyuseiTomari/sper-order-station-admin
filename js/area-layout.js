document.addEventListener("DOMContentLoaded", () => {
  function createSelectionBox() {
    const box = document.createElement("div");
    box.className = "selected-area-layout-shape";

    // コーナーハンドルを追加
    const corners = ["top-left", "top-right", "bottom-left", "bottom-right"];
    corners.forEach((position) => {
      const handle = document.createElement("div");
      handle.className = `corner-handle ${position}`;
      box.appendChild(handle);
    });

    // エッジハンドルを追加
    const edges = ["top", "bottom", "left", "right"];
    edges.forEach((position) => {
      const handle = document.createElement("div");
      handle.className = `edge-handle ${position}`;
      box.appendChild(handle);
    });

    return box;
  }

  function selectElement(element, selectionBox) {
    selectionBox.classList.add("active");
    element.dataset.selected = "true";
  }

  function deselectElement(element, selectionBox) {
    selectionBox.classList.remove("active");
    element.dataset.selected = "false";
  }

  function deselectAllElements(elementsData) {
    elementsData.forEach((data) => {
      if (data.element.dataset.selected === "true") {
        deselectElement(data.element, data.selectionBox);
      }
    });
  }

  function toggleElement(element, selectionBox, elementsData) {
    if (element.dataset.selected === "true") {
      deselectElement(element, selectionBox);
    } else {
      deselectAllElements(elementsData);
      selectElement(element, selectionBox);
    }
  }

  const elementsData = [];
  const containers = document.querySelectorAll(".area-layout-shape-container");

  containers.forEach((container) => {
    const element = container.querySelector(".area-layout-shape");

    const selectionBox = createSelectionBox();
    container.appendChild(selectionBox);
    element.dataset.selected = "false";

    const data = { element, selectionBox };
    elementsData.push(data);

    element.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleElement(element, selectionBox, elementsData);
    });
  });

  document.addEventListener("click", () => {
    deselectAllElements(elementsData);
  });
});
