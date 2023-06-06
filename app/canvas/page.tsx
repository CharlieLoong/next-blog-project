'use client';

import { useEffect, useRef, useState } from 'react';
import Ball from '@/lib/ball';

const Page = () => {
  const canvasRef = useRef(null);
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let balls: Ball[] = [];
      function draw() {
        // ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < balls.length; i++) {
          if (balls[i].radius <= 1) {
            balls.splice(i, 1);
            continue;
          }
          balls[i].update();
          ctx.beginPath();
          ctx.arc(balls[i].x, balls[i].y, balls[i].radius, 0, Math.PI * 2);
          ctx.fillStyle = balls[i].color;
          ctx.fill();
        }
        if (balls.length === 0) return;
        requestAnimationFrame(draw);
      }

      function handleMouseDown(event) {
        for (let i = 0; i < 30; i++) {
          balls.push(new Ball(mouse.x, mouse.y));
        }
        draw();
      }

      canvas.addEventListener('mousedown', handleMouseDown);

      return () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
      };
    }
  }, [mouse]);
  function handleMouseMove(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - Math.round(rect.left);
    const mouseY = event.clientY - Math.round(rect.top);
    setMouse({
      x: mouseX,
      y: mouseY,
    });
  }

  return (
    <div className="grow flex">
      {/* <p>
        {mouse.x} == {mouse.y}
          <br/>pointer down effect
      </p> */}
      <canvas
        className="h-[800px] w-[800px] border m-auto"
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        width={800}
        height={800}
      ></canvas>
    </div>
  );
};

export default Page;
