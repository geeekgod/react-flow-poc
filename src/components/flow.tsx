import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Edge,
  Node,
  Connection,
  addEdge,
} from "@xyflow/react";
import { useCallback } from "react";

const initialNodes: Array<Node> = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Input" },
    type: "input",
    draggable: true,
  },
];

const initialEdges: Array<Edge> = [];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const addNode = () => {
    const lastNode = nodes[nodes.length - 1];
    const newNode: Node = {
      id: String(nodes.length + 1),
      position: { x: lastNode.position.x + 200, y: lastNode.position.y },
      data: { label: "New Node" },
      draggable: true,
    };
    setNodes([...nodes, newNode]);
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  return (
    <div className="h-full">
      <div className="">
        <h1 className="text-3xl font-bold text-center">Flow</h1>
        <div className="flex justify-center">
          <button
            onClick={addNode}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Node
          </button>
        </div>
      </div>
      <div className="h-[80vh]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodesConnectable={true}
          nodesDraggable={true}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default Flow;
