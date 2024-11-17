import { Handle } from "@xyflow/react";
import Image from "next/image";

export default function SkillNode({ data: { image } }) {
  return (
    <div className='node'>
      <Image
        src={image}
        className='w-20 aspect-square rounded-full'
        width={300}
        height={300}
        alt='profile skill'
        priority
      />
      <Handle type='target' position='top' />
    </div>
  );
}
