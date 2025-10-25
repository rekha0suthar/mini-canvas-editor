import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect, Image as KonvaImage, Transformer } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { selectShape, updateShape } from "../slices/shapesSlice";
import useImage from "use-image"; // handles async image loading
import "../styles/CanvasArea.css";

const CanvasImage = ({ shape, isSelected, transformerRef, commonProps, dispatch }) => {
  const [image] = useImage(shape.src, "anonymous"); // prevents broken state
  return (
    <KonvaImage
      {...commonProps}
      image={image}
      stroke={isSelected ? "#1E40AF" : null}
      strokeWidth={isSelected ? 3 : 0}
      ref={(node) => {
        if (isSelected && node && transformerRef.current) {
          transformerRef.current.nodes([node]);
        }
      }}
    />
  );
};

const CanvasArea = () => {
  const shapes = useSelector((s) => s.shapes.items);
  const selectedId = useSelector((s) => s.shapes.selectedId);
  const dispatch = useDispatch();

  const transformerRef = useRef(null);
  const stageRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  // ---------- Responsive canvas ----------
  useEffect(() => {
    const updateSize = () => {
      const maxWidth = Math.min(window.innerWidth - 320, 900);
      const maxHeight = Math.min(window.innerHeight - 200, 600);
      setCanvasSize({ width: maxWidth, height: maxHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // ---------- Transformer logic ----------
  useEffect(() => {
    const stage = stageRef.current;
    const transformer = transformerRef.current;
    if (!stage || !transformer) return;

    const selectedNode = stage.findOne(`#shape-${selectedId}`);
    if (selectedNode) transformer.nodes([selectedNode]);
    else transformer.nodes([]);
    transformer.getLayer()?.batchDraw();
  }, [selectedId, shapes]);

  // ---------- Click outside to deselect ----------
  const handleStageClick = (e) => {
    if (e.target === e.target.getStage()) {
      dispatch(selectShape(null));
    }
  };

  // ---------- Keep shapes within canvas ----------
  const checkBoundaries = (x, y, width, height) => {
    const { width: canvasWidth, height: canvasHeight } = canvasSize;
    return {
      x: Math.max(0, Math.min(x, canvasWidth - width)),
      y: Math.max(0, Math.min(y, canvasHeight - height)),
    };
  };

  const handleDragEnd = (id, e) => {
    const { x, y } = e.target.position();
    const shape = shapes.find((s) => s.id === id);
    if (!shape) return;
    const bounded = checkBoundaries(x, y, shape.width, shape.height);
    dispatch(updateShape({ id, updates: bounded }));
  };

  const handleTransformEnd = (id, e) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);
    dispatch(
      updateShape({
        id,
        updates: {
          x: node.x(),
          y: node.y(),
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(5, node.height() * scaleY),
        },
      })
    );
  };

  return (
    <div className="canvas-area">
      <Stage
        width={canvasSize.width}
        height={canvasSize.height}
        ref={stageRef}
        onMouseDown={handleStageClick}
        className="canvas-stage"
      >
        <Layer>
          {shapes.map((shape) => {
            const isSelected = shape.id === selectedId;

            const commonProps = {
              key: shape.id,
              id: `shape-${shape.id}`,
              draggable: true,
              x: shape.x,
              y: shape.y,
              width: shape.width,
              height: shape.height,
              onClick: () => dispatch(selectShape(shape.id)),
              onDragEnd: (e) => handleDragEnd(shape.id, e),
              onTransformEnd: (e) => handleTransformEnd(shape.id, e),
            };

            if (shape.type === "rectangle") {
              return (
                <Rect
                  {...commonProps}
                  fill={shape.fill}
                  stroke={isSelected ? "#1E40AF" : null}
                  strokeWidth={isSelected ? 3 : 0}
                  cornerRadius={4}
                  ref={(node) => {
                    if (isSelected && node && transformerRef.current) {
                      transformerRef.current.nodes([node]);
                    }
                  }}
                />
              );
            }

            if (shape.type === "image") {
              return (
                <CanvasImage
                  key={shape.id}
                  shape={shape}
                  isSelected={isSelected}
                  transformerRef={transformerRef}
                  commonProps={commonProps}
                  dispatch={dispatch}
                />
              );
            }

            return null;
          })}

          <Transformer
            ref={transformerRef}
            rotateEnabled={false}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 10 || newBox.height < 10) return oldBox;
              return newBox;
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasArea;
