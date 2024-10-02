import { ReactFlow, Controls, Background } from "@xyflow/react";

function Flow() {
  return (
    <div style={{ height: "100%" }}>
      <p>Flow component</p>
      <div style={{ height: "80vh", position: "relative" }}>
        <ReactFlow>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default Flow;
