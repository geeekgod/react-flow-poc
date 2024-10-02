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
import { useCallback, useEffect } from "react";

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
  const storedNodes = localStorage.getItem("nodes");
  const initialNodesState = storedNodes
    ? JSON.parse(storedNodes)
    : initialNodes;

  const storedEdges = localStorage.getItem("edges");
  const initialEdgesState = storedEdges
    ? JSON.parse(storedEdges)
    : initialEdges;

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesState);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdgesState);

  useEffect(() => {
    const storedNodes = localStorage.getItem("nodes");
    const storedEdges = localStorage.getItem("edges");

    if (storedNodes) {
      setNodes(JSON.parse(storedNodes));
    }
    if (storedEdges) {
      setEdges(JSON.parse(storedEdges));
    }
  }, [setNodes, setEdges]);

  useEffect(() => {
    localStorage.setItem("nodes", JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem("edges", JSON.stringify(edges));
  }, [edges]);

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

  const clearElements = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  return (
    <div className="h-full">
      <div className="flex-col gap-4">
        <h1 className="text-3xl font-bold text-center">Flow</h1>
        <div className="flex justify-center gap-4">
          <button
            onClick={addNode}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Node
          </button>
          <button
            onClick={clearElements}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="h-[80vh]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodesConnectable
          nodesDraggable
          panOnScroll
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
