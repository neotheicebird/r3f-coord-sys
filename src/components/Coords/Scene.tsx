import { useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { suspend } from "suspend-react";
import { folder, useControls, buttonGroup } from "leva";
import CentralBox from "./CentralBox";
import CoordinateSystem from "./CoordinateSystem";
import { EllipseCurve } from "three";
import { EllipseVisualizer, MovingObject } from "./EllipticalSystem";

const hdris = {
  sky: import("@pmndrs/assets/hdri/sky.exr"),
  apartment: import("@pmndrs/assets/hdri/apartment.exr"),
  bridge: import("@pmndrs/assets/hdri/bridge.exr"),
  city: import("@pmndrs/assets/hdri/city.exr"),
  dawn: import("@pmndrs/assets/hdri/dawn.exr"),
  esplanade: import("@pmndrs/assets/hdri/esplanade.exr"),
  forest: import("@pmndrs/assets/hdri/forest.exr"),
  hall: import("@pmndrs/assets/hdri/hall.exr"),
  lab: import("@pmndrs/assets/hdri/lab.exr"),
  lobby: import("@pmndrs/assets/hdri/lobby.exr"),
  night: import("@pmndrs/assets/hdri/night.exr"),
  park: import("@pmndrs/assets/hdri/park.exr"),
  studio: import("@pmndrs/assets/hdri/studio.exr"),
  sunrise: import("@pmndrs/assets/hdri/sunrise.exr"),
  sunset: import("@pmndrs/assets/hdri/sunset.exr"),
  venice: import("@pmndrs/assets/hdri/venice.exr"),
  warehouse: import("@pmndrs/assets/hdri/warehouse.exr"),
  workshop: import("@pmndrs/assets/hdri/workshop.exr"),
};

const ellipticalPath = new EllipseCurve(
  0,
  0, // ax, aY: X and Y of the center of the ellipse
  3,
  5, // xRadius, yRadius: the radii of the ellipse
  0,
  2 * Math.PI, // Starting angle and ending angle (0 to 2PI makes a full ellipse)
  false, // Clockwise: true or false for counter clockwise
  Math.PI / 2, // Rotation: amount to rotate the ellipse in radians
);

function Scene({ onCameraChange }) {
  // environment backgrounds
  const hdriNames = Object.keys(hdris);
  const [{ asset, ...optionsConfig }, set] = useControls(() => ({
    asset: { value: hdriNames[0], options: hdriNames },
    prevnext: buttonGroup({
      label: "",
      opts: {
        prev: (get) =>
          set({
            asset:
              hdriNames[
                Math.abs(
                  (hdriNames.indexOf(get("asset")) - 1 + hdriNames.length) %
                    hdriNames.length,
                )
              ],
          }),
        next: (get) =>
          set({
            asset:
              hdriNames[
                Math.abs(
                  (hdriNames.indexOf(get("asset")) + 1 + hdriNames.length) %
                    hdriNames.length,
                )
              ],
          }),
      },
    }),
    options: folder({
      background: true,
      blur: { value: 0.0, min: 0, max: 1 },
      fov: { value: 35, min: 0.001, max: 179.999 },
      sphereSize: { value: 5, min: 0, max: 5 },
    }),
  }));

  // update camera position
  const { camera, gl } = useThree();

  return (
    <>
      <Environment files={suspend(hdris[asset]).default} {...optionsConfig} />
      <CentralBox />
      <CoordinateSystem />
      <EllipseVisualizer curve={ellipticalPath} angle={Math.PI / 3} />
      <MovingObject curve={ellipticalPath} angle={Math.PI / 3} />
      <OrbitControls
        args={[camera, gl.domElement]}
        onChange={({ target }) => {
          // update when user interacts
          const { x, y, z } = target.object.position;
          onCameraChange({ x: x.toFixed(2), y: y.toFixed(2), z: z.toFixed(2) });
        }}
      />
    </>
  );
}

export default Scene;
