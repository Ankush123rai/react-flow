import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import initialNodes from './nodes';

const initialEdges = [
  { id: "a1-a2", source: "A-1", target: "A-2" },
  { id: "a1-a2", source: "A-1", target: "A-3" },
  { id: "a3-b", source: "A-2", target: "B" },
  { id: "a3-c", source: "A-3", target: "C" },
  { id: "b1-b2", source: "B-1", target: "B-2" },
  { id: "b1-b3", source: "B-1", target: "B-3" },
  { id: "b1-d", source: "B-3", target: "D" },
  { id: "c1-c2", source: "C-1", target: "C-2" },
  { id: "c1-c3", source: "C-1", target: "C-3" },
  { id: "c1-c4", source: "C-1", target: "C-4" },
  { id: "c1-c5", source: "C-1", target: "C-5" },
  { id: "c1-c6", source: "C-1", target: "C-6" },
  { id: "c-b", source: "C", target: "B" },
  { id: "b1-b2", source: "B-2", target: "E" },
  { id: "e1-e2", source: "E-1", target: "E-2" },
  { id: "e1-e3", source: "E-1", target: "E-3" },
  { id: "e1-e4", source: "E-1", target: "E-4" },
  { id: "e1-e2", source: "E-2", target: "G" },
  { id: "e1-e3", source: "E-3", target: "H" },
  { id: "h1-h2", source: "H-1", target: "H-2" },
  { id: "h1-h3", source: "H-1", target: "H-3" },
  { id: "h1-h4", source: "H-1", target: "H-4" },
  { id: "h1-h5", source: "H-1", target: "H-5" },
  { id: "h1-h6", source: "H-1", target: "H-6" },
  { id: "h1-h2", source: "H-2", target: "I" },
  { id: "h1-h3", source: "H-3", target: "J" },
  { id: "h1-h4", source: "H-4", target: "K" },
  { id: "h1-h5", source: "H-5", target: "L" },
  { id: "h1-h6", source: "H-6", target: "M" },
  { id: "e1-e4", source: "E-4", target: "N" },
];



const rfStyle = { height: '100vh' };

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div style={rfStyle}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        style={{ width: '100%', height: '100%' }}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
