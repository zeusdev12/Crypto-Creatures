import React, { useEffect } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import _ from 'lodash';
import { OrbitControls, useAnimations, useFBX } from "@react-three/drei";

const Scene = (props) => {
  const { filePath, scale, withAnimation } = props;
  const fbx = useFBX(filePath);
  const { names, actions } = useAnimations(fbx.animations, fbx.parent);

  useEffect(() => {
    if (withAnimation)
      actions[names[1]].play();
  }, [actions, names]);
  
  return <primitive object={_.clone(fbx.parent)} scale={scale} />;
};

const ModelViewer = (props) => {
  const { filePath, className, scale, withAnimation } = props;  
  
  return (
    <>
      <Canvas className={className}>
        <Suspense fallback={null}>
          <Scene filePath={filePath} scale={scale} withAnimation={withAnimation}/>
          <ambientLight/>
          <OrbitControls />
        </Suspense>
      </Canvas>
    </>
  );
};

ModelViewer.defaultProps = {
  withAnimation: false,
};

export default ModelViewer;