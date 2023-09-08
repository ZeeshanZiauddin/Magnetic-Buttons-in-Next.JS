import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

const MagneticButton = (link) => {
  console.log(link);
  const buttonRef = useRef(null);
  const txtRef = useRef(null);

  const Button = styled.a`
    width: 100px;
    border-radius: 50%;
    height: 100px;
    font-size: 16px;
    background-color: black;
    color: #fff;
    border: none;
    cursor: pointer;
    overflow: hidden;
  `;
  const BtnText = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 2;
    color: var(--color-dark);
    position: relative;
    pointer-events: none;
    will-change: transform, color;
  `;

  useEffect(() => {
    const button = buttonRef.current;
    const btnTxt = txtRef.current;
    const bounding = button.getBoundingClientRect();

    // Define the maximum radius within which the button will follow the cursor
    const maxRadius = 200;

    // Define variables to track if the button is being hovered
    let isHovered = false;

    // Define the starting position of the button
    const startX = button.offsetLeft + button.offsetWidth / 2;
    const startY = button.offsetTop + button.offsetHeight / 2;

    // Add mousemove event listener
    const handleMouseMove = (event) => {
      if (isHovered) {
        // Calculate the distance between the button and the cursor
        const dx =
          ((event.clientX - button.getBoundingClientRect().left) /
            button.offsetWidth -
            0.5) *
          100;
        const dy =
          ((event.clientY - button.getBoundingClientRect().top) /
            button.offsetHeight -
            0.5) *
          100;
        const txtdx =
          ((event.clientX - button.getBoundingClientRect().left) /
            button.offsetWidth -
            0.5) *
          30;
        const txtdy =
          ((event.clientY - button.getBoundingClientRect().top) /
            button.offsetHeight -
            0.5) *
          30;

        // Calculate the distance between the button and the cursor
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check if the distance is within the maximum radius
        if (distance <= maxRadius) {
          // Apply the magnetic effect to the button
          gsap.to(button, 1.5, {
            x: dx,
            y: dy,
            rotate: '0.01deg',
            ease: 'Power4.easeOut'
          });
          gsap.to(btnTxt, 1.5, {
            x: txtdx,
            y: txtdy,
            ease: `Power4.easeOut`
          });
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Add event listeners for hover effect
    const handleMouseEnter = () => {
      isHovered = true;
      // gsap.to(button, { scale: 1.1, duration: 0.2 });
    };

    const handleMouseLeave = () => {
      isHovered = false;
      // Fall back to the starting point
      gsap.to(button, 1.5, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'Elastic.easeOut'
      });
      gsap.to(btnTxt, 1.5, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'Elastic.easeOut'
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    // Set initial state of the button
    gsap.set(button, { scale: 1, x: 0, y: 0 });

    // Animate entering transition
    gsap.fromTo(
      button,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'Elastic.easeOut' }
    );

    // Clean up event listeners
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Button ref={buttonRef} className="magnetic-button">
      <BtnText className="btn-txt" ref={txtRef}>
        {link.link}
      </BtnText>
    </Button>
  );
};

export default MagneticButton;
