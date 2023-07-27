import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { EulerOrder } from "three";

type Props = {
  yaw?: number;
  pitch?: number;
  roll?: number;
};

type RocketProps = {
  rotation: [x: number, y: number, z: number, order: EulerOrder];
};

type GLTFResult = GLTF & {
  nodes: {
    ["H-58_406K_500cc_(1)_v1"]: THREE.Mesh;
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  materials: {};
};

const Rocket = (props: RocketProps) => {
  const { nodes, materials } = useGLTF("/model.gltf") as GLTFResult;

  return (
    <group {...props} dispose={null} scale={0.003}>
      <mesh
        geometry={nodes["H-58_406K_500cc_(1)_v1"].geometry}
        material={nodes["H-58_406K_500cc_(1)_v1"].material}
      />
    </group>
  );
};

useGLTF.preload("/model.gltf");

const standardYaw = (yaw?: number): number => {
  if (yaw == undefined) return 0;
  const deg = yaw;
  return deg * (Math.PI / 180);
};

const standardPitch = (pitch?: number): number => {
  if (pitch == undefined) return 0;
  const deg = pitch;
  return deg * (Math.PI / 180);
};

const standardRoll = (roll?: number): number => {
  if (roll == undefined) return 0;
  const deg = roll + 90;
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
        <Rocket
          rotation={[
            standardYaw(yaw),
            standardRoll(roll),
            standardPitch(pitch),
            "XZY",
          ]}
        />
      </Canvas>
    </div>
  );
};
