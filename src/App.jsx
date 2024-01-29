import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background } from 'reactflow';
import 'reactflow/dist/style.css';

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

const initialNodes = [
  {
    id: "A",
    type: "group",
    position: { x: 0, y: 0 },
    style: {
      width: 390,
      height: 160,
    },
  },
  {
    id: "A-1",
    type: "input",
    data: { label: "What type of coffee do you primarily enjoy?" },
    position: { x: 120, y: 10 },
    parentNode: "A",
    extent: "parent",
  },
  {
    id: "A-2",
    data: { label: "Cold coffee" },
    position: { x: 10, y: 90 },
    parentNode: "A",
    extent: "parent",
  },
  {
    id: "A-3",
    data: { label: "Hot Coffe" },
    position: { x: 220, y: 90 },
    parentNode: "A",
    extent: "parent",
  },
  {
    id: "B",
    type: "output",
    position: { x: -500, y: 300 },
    data: null,
    style: {
      width: 390,
      height: 160,
      backgroundColor: "rgba(240,240,240,0.25)",
    },
  },
  {
    id: "B-1",
    data: { label: "What type of cold coffee do you prefer?" },
    position: { x: 100, y: 10 },
    parentNode: "B",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "B-2",
    data: { label: "Make a cold brew yourself" },
    position: { x: 30, y: 90 },
    parentNode: "B",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "B-3",
    data: { label: "Instant cold coffee" },
    position: { x: 220, y: 90 },
    parentNode: "B",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "R1",
    type: "output",
    position: { x: -50, y: 400 },
    data: { label: "https://sleepyowl.co/products/latte" },
    style: {
      width: 260,
    },
  },
  {
    id: "C",
    type: "output",
    position: { x: 400, y: 300 },
    data: null,
    style: {
      width: 990,
      height: 160,
      backgroundColor: "rgba(240,240,240,0.25)",
    },
  },
  {
    id: "C-1",
    data: { label: "What type of hot coffee do you prefer?" },
    position: { x: 400, y: 10 },
    parentNode: "C",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "C-2",
    data: { label: "Ground coffee" },
    position: { x: 30, y: 90 },
    parentNode: "C",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "C-3",
    data: { label: "Hot Brew" },
    position: { x: 220, y: 90 },
    parentNode: "C",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "C-4",
    data: { label: "Instance Coffee" },
    position: { x: 420, y: 90 },
    parentNode: "C",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "C-5",
    data: { label: "Latte" },
    position: { x: 620, y: 90 },
    parentNode: "C",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "C-6",
    data: { label: "Filter Coffee" },
    position: { x: 820, y: 90 },
    parentNode: "C",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "E",
    type: "output",
    position: { x: -500, y: 600 },
    data: null,
    style: {
      width: 590,
      height: 160,
      backgroundColor: "rgba(240,240,240,0.25)",
    },
  },
  {
    id: "E-1",
    data: { label: "Do you prefer a specific flavor in your cold brew?" },
    position: { x: 220, y: 10 },
    parentNode: "E",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "E-2",
    data: { label: "Assorted" },
    position: { x: 30, y: 90 },
    parentNode: "E",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "E-3",
    data: { label: "Classic Coffee Flavours" },
    position: { x: 220, y: 90 },
    parentNode: "E",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "E-4",
    data: { label: "Specialty or Regional Blends" },
    position: { x: 420, y: 90 },
    parentNode: "E",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "R2",
    type: "output",
    position: { x: -50, y: 400 },
    data: { label: "https://sleepyowl.co/products/latte" },
    style: {
      width: 260,
    },
  },
  {
    id: "G",
    type: "output",
    position: { x: -520, y: 800 },
    data: {
      label: "https://sleepyowl.co/products/cold-brew-coffee-packs-assorted",
    },
    style: {
      width: 260,
    },
  },
  {
    id: "H",
    type: "output",
    position: { x: -1200, y: 1000 },
    data: null,
    style: {
      width: 990,
      height: 160,
      backgroundColor: "rgba(240,240,240,0.25)",
    },
  },
  {
    id: "H-1",
    data: { label: "Which classic coffee flavour do you love?" },
    position: { x: 430, y: 10 },
    parentNode: "H",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "H-2",
    data: { label: "Caramel" },
    position: { x: 30, y: 90 },
    parentNode: "H",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "H-3",
    data: { label: "Cinnamon" },
    position: { x: 220, y: 90 },
    parentNode: "H",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "H-4",
    data: { label: "HazeInut" },
    position: { x: 420, y: 90 },
    parentNode: "H",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "H-5",
    data: { label: "Mocha" },
    position: { x: 620, y: 90 },
    parentNode: "H",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "H-6",
    data: { label: "French Vanilla" },
    position: { x: 820, y: 90 },
    parentNode: "H",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "I",
    type: "output",
    position: { x: -1320, y: 1200 },
    data: {
      label: "https://sleepyowl.co/products/cold-brew-coffee-packs-caramel",
    },
    style: {
      width: 260,
    },
  },
  {
    id: "J",
    type: "output",
    position: { x: -1000, y: 1200 },
    data: {
      label: "https://sleepyowl.co/products/cold-brew-coffee-packs-cinnamon",
    },
    style: {
      width: 260,
    },
  },
  {
    id: "K",
    type: "output",
    position: { x: -700, y: 1200 },
    data: {
      label: "https://sleepyowl.co/products/cold-brew-coffee-packs-haze-inut",
    },
    style: {
      width: 260,
    },
  },
  {
    id: "L",
    type: "output",
    position: { x: -420, y: 1200 },
    data: {
      label: "https://sleepyowl.co/products/cold-brew-coffee-packs-mocha",
    },
    style: {
      width: 260,
    },
  },
  {
    id: "M",
    type: "output",
    position: { x: -110, y: 1200 },
    data: {
      label:
        "https://sleepyowl.co/products/cold-brew-coffee-packs-french-vanilla",
    },
    style: {
      width: 260,
    },
  },
  {
    id: "N",
    type: "output",
    position: { x: 400, y: 1200 },
    data: null,
    style: {
      width: 990,
      height: 160,
      backgroundColor: "rgba(240,240,240,0.25)",
    },
  },
  {
    id: "N-1",
    data: { label: "Which of these blends excites you?" },
    position: { x: 400, y: 10 },
    parentNode: "N",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "N-2",
    data: { label: "Dark Roast" },
    position: { x: 10, y: 90 },
    parentNode: "N",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "N-3",
    data: { label: "New Orleans" },
    position: { x: 30, y: 90 },
    parentNode: "E",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "N-4",
    data: { label: "Original" },
    position: { x: 220, y: 90 },
    parentNode: "E",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },
  {
    id: "N-4",
    data: { label: "Emirates Blend" },
    position: { x: 420, y: 90 },
    parentNode: "E",
    extent: "parent",
    draggable: false,
    style: {
      width: 160,
    },
  },

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
