import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { EulerOrder, AxesHelper, GridHelper } from "three";

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
    ["model"]: THREE.Mesh;
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  materials: {};
};

const Rocket = (props: RocketProps) => {
  const { nodes, materials } = useGLTF("/model.gltf") as GLTFResult;

  return (
    <group {...props} dispose={null} scale={0.003}>
      <mesh
        geometry={nodes["model"].geometry}
        material={nodes["model"].material}
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
  const deg = roll;
  return deg * (Math.PI / 180);
};

export const OrientationModel = ({ yaw, pitch, roll }: Props) => {
  return (
    <div
      className="has-background-black-ter"
      style={{ height: "200px", width: "200px" }}
    >
      <Canvas
        camera={{
          position: [4, 2, 4],
          rotation: [
            -15 * (Math.PI / 180),
            45 * (Math.PI / 180),
            0 * (Math.PI / 180),
            "YXZ",
          ],
          isPerspectiveCamera: true,
        }}
      >
        <directionalLight position={[1, 1, 1]} intensity={0.8} />
        <ambientLight args={[0xffffff]} intensity={0.2} />

        <primitive
          object={new AxesHelper(10)}
          rotation={[
            standardYaw(yaw),
            standardRoll(roll),
            standardPitch(pitch),
            "XZY",
          ]}
        />
        <primitive object={new GridHelper()} />

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
