"use client";

import Matter from 'matter-js';
import { useRef, useState, useEffect } from 'react';

let engine;
let runner;
let ground;

export function initPhysics() {
  if (typeof window === 'undefined') return;
  if (engine) return;

  engine = Matter.Engine.create({
    positionIterations: 12,
    velocityIterations: 10,
    constraintIterations: 4
  });
  runner = Matter.Runner.create();
  
  const width = window.innerWidth;
  const height = 10000; // arbitrary large height for walls
  
  // Default ground position
  let initialGroundY = 99999;
  
  let groundWidth = width;
  let groundX = width / 2;
  
  // Try to find the footer divider immediately in case it's already in the DOM
  if (typeof document !== 'undefined') {
    const divider = document.getElementById('physics-divider');
    const container = document.getElementById('physics-container');
    if (divider && container) {
      const rect = divider.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      initialGroundY = rect.top + window.scrollY;
      
      // Use the untransformed container width, because the divider might be animating its scaleX to 0!
      groundWidth = containerRect.width;
      groundX = containerRect.left + window.scrollX + containerRect.width / 2;
    }
  }
  
  ground = Matter.Bodies.rectangle(groundX, initialGroundY + 50, groundWidth, 100, { 
    isStatic: true,
    friction: 1.0,
    restitution: 0.05
  });

  Matter.World.add(engine.world, [ground]);

  Matter.Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;
      const relVelX = bodyA.velocity.x - bodyB.velocity.x;
      const relVelY = bodyA.velocity.y - bodyB.velocity.y;
      const impactVel = Math.hypot(relVelX, relVelY);

      if (impactVel > 0.8) {
        const dynamicBody = bodyA.isStatic ? bodyB : bodyA;
        const width = dynamicBody.bounds
          ? dynamicBody.bounds.max.x - dynamicBody.bounds.min.x
          : 120;
        playBlockImpactSound(impactVel, width);
      }
    });
  });

  Matter.Runner.run(runner, engine);
}

export function updateWorldBounds() {
  if (typeof window === 'undefined') return;
  if (!engine) initPhysics();
  
  const divider = document.getElementById('physics-divider');
  const container = document.getElementById('physics-container');
  if (divider && container && ground) {
      const rect = divider.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      const newWidth = containerRect.width;
      const newX = containerRect.left + window.scrollX + containerRect.width / 2;
      const newY = rect.top + window.scrollY + 50;

      // Recreate the ground body to handle width changes on resize
      Matter.World.remove(engine.world, ground);
      ground = Matter.Bodies.rectangle(newX, newY, newWidth, 100, {
        isStatic: true,
        friction: 1.0,
        restitution: 0.05
      });
      Matter.World.add(engine.world, ground);
  }
}

import { playClickSound, playDropSound, playBlockImpactSound } from "@/lib/audio";

export function usePhysicsPill(fallenClassName = '') {
  const pillRef = useRef(null);
  const [isFallen, setIsFallen] = useState(false);
  const bodyRef = useRef(null);
  const cloneRef = useRef(null);
  const animationFrameRef = useRef(null);

  const handleClick = () => {
    if (isFallen) return;
    if (typeof window === 'undefined') return;
    
    if (pillRef.current) {
      if (!engine) initPhysics();

      const originalEl = pillRef.current;
      if (originalEl.classList.contains('fallen')) return;

      playClickSound();

      const rect = originalEl.getBoundingClientRect();
      const startX = rect.left + window.scrollX;
      const startY = rect.top + window.scrollY;
      const width = rect.width;
      const height = rect.height;

      // Create a visual clone that lives in the document body
      const clone = originalEl.cloneNode(true);
      clone.classList.add('fallen');
      if (fallenClassName) {
        clone.classList.add(fallenClassName);
      }
      clone.style.position = 'absolute';
      clone.style.left = '0px';
      clone.style.top = '0px';
      clone.style.margin = '0px';
      clone.style.width = `${width}px`;
      clone.style.height = `${height}px`;
      clone.style.whiteSpace = 'nowrap';
      clone.style.boxSizing = 'border-box';
      clone.style.transition = 'none';
      clone.style.pointerEvents = 'none';
      document.body.appendChild(clone);
      cloneRef.current = clone;

      // Hide the original element but keep it in the DOM flow so layout doesn't collapse
      originalEl.style.opacity = '0';
      originalEl.style.pointerEvents = 'none';

      // Random push to make stacking look natural, very subtle like a dropped Jenga block
      const randomPushX = (Math.random() - 0.5) * 1.0; 
      const randomAngularVel = (Math.random() - 0.5) * 0.02;
      
      const body = Matter.Bodies.rectangle(startX + width / 2, startY + height / 2, width, height, {
        restitution: 0.05,
        friction: 0.9,
        frictionStatic: 1.0,
        density: 0.005,
        chamfer: { radius: 3 },
        slop: 0
      });
      
      Matter.Body.setVelocity(body, { x: randomPushX, y: -2 }); // Slight jump up when clicked
      Matter.Body.setAngularVelocity(body, randomAngularVel);

      Matter.World.add(engine.world, body);
      bodyRef.current = body;
      setIsFallen(true);

      let restingFrames = 0;
      let hasPlayedDropSound = false;

      const updateDom = () => {
         if (cloneRef.current && bodyRef.current) {
             const x = bodyRef.current.position.x - width / 2;
             const y = bodyRef.current.position.y - height / 2;
             const angle = bodyRef.current.angle;
             
             cloneRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}rad)`;
             
             // Play drop sound on first landing near ground
             if (!hasPlayedDropSound && ground && bodyRef.current.position.y >= ground.position.y - 65) {
               hasPlayedDropSound = true;
               playDropSound();
             }

             // Check if body has come to rest to stop unnecessary RAF updates
             const speed = bodyRef.current.speed || 0;
             const angularSpeed = bodyRef.current.angularSpeed || 0;
             if (speed < 0.05 && angularSpeed < 0.005) {
               restingFrames++;
               if (restingFrames > 30) {
                 animationFrameRef.current = null;
                 return; // Stop animation loop when fully at rest
               }
             } else {
               restingFrames = 0;
             }

             if (y > (ground ? ground.position.y : 99999) + 1000) {
                Matter.World.remove(engine.world, bodyRef.current);
                cloneRef.current.remove();
                cloneRef.current = null;
                bodyRef.current = null;
                return;
             }
             
             animationFrameRef.current = requestAnimationFrame(updateDom);
         }
      };
      
      animationFrameRef.current = requestAnimationFrame(updateDom);
    }
  };

  // Cleanup loop on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (bodyRef.current && engine) {
        Matter.World.remove(engine.world, bodyRef.current);
      }
      if (cloneRef.current) {
        cloneRef.current.remove();
      }
    };
  }, []);

  return { pillRef, isFallen, handleClick };
}
