import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ProfileNode from "./ProfileNode";
import SkillNode from "./SkillNode";

const profileImage = "/profile.png";
const webImage = "/backend.png";
const cloudImage = "/cloud.png";

export const nodes = [
  {
    id: "1",
    data: { image: profileImage },
    position: { x: 100, y: 0 },
    type: "profile",
  },
  {
    id: "2",
    data: { image: webImage },
    position: { x: 0, y: 200 },
    type: "skill",
  },
  {
    id: "3",
    data: { image: cloudImage },
    position: { x: 200, y: 200 },
    type: "skill",
  },
];

export const edges = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    animated: true,
    label: "Backend Developer",
  },
  {
    id: "1-3",
    source: "1",
    target: "3",
    animated: true,
    label: "Cloud Engineer",
  },
];

const nodeTypes = {
  profile: ProfileNode,
  skill: SkillNode,
};

function Flow() {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      zoomOnPinch={false}
      zoomActivationKeyCode={null}
      zoomOnScroll={false}
    />
  );
}

export default Flow;
