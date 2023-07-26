import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

type Props = {
  yaw?: number;
  pitch?: number;
  roll?: number;
};

type BoxProps = {
  rotation: [x: number, y: number, z: number];
};

const Box: React.FC<BoxProps> = (props) => {
  const mesh = useRef<Mesh>(null!);
  // useFrame(() => (mesh.current.rotation.y += 0.01));

  return (
    <mesh {...props} position={[0, 0, 0]} ref={mesh} scale={3}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const standardYaw = (yaw?: number): number => {
  if (yaw == undefined) return 0;
  const deg = yaw + 90;
  return deg * (Math.PI / 180);
};

const standardPitch = (pitch?: number): number => {
  if (pitch == undefined) return 0;
  const deg = pitch + 180;
  return deg * (Math.PI / 180);
};

const standardRoll = (roll?: number): number => {
  if (roll == undefined) return 0;
  const deg = (roll + 360) / 2;
  return deg * (Math.PI / 180);
};

export const OrientationModel = ({ yaw, pitch, roll }: Props) => {
  return (
    <div
      className="has-background-black-ter"
      style={{ height: "200px", width: "200px" }}
    >
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box
          rotation={[
            -standardYaw(yaw),
            standardRoll(roll),
            -standardPitch(pitch),
          ]}
        />
      </Canvas>
    </div>
  );
};
