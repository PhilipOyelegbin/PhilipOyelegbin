import { Handle } from "@xyflow/react";
import Image from "next/image";

export default function ProfileNode({ data: { image } }) {
  return (
    <div className="node">
      <Image
        src={image}
        className="w-20 aspect-square rounded-full"
        width={300}
        height={300}
        alt="profile avatar"
        priority
      />
      <Handle type="source" position="bottom" />
    </div>
  );
}
