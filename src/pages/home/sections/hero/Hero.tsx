import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";

import "./hero.scss";
import imgLeft from "../../../../images/hero/hero1.jpg";
import imgRight from "../../../../images/hero/hero2.jpg";
import Button from "../../../../components/button/Button";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imgLeftRef = useRef<HTMLDivElement>(null);
  const imgRightRef = useRef<HTMLDivElement>(null);
  const [prevLR, setPrevLR] = useState(0);
  const [prevFB, setPrevFB] = useState(0);

  const imgTilt = useCallback(e => {
    const { offsetX, offsetY, target } = e;
    const { clientHeight, clientWidth } = target;
    const xPos = offsetX / clientWidth - 0.5;
    const yPos = offsetY / clientHeight - 0.5;
    [imgLeftRef.current, imgRightRef.current].forEach(img => {
      gsap.to(img, {
        duration: 0.7,
        x: xPos * 20,
        y: yPos * 40,
        rotationX: -yPos * 10,
        rotationY: xPos * 40,
        ease: "power3.out"
      });
    });
  }, []);

  const imgTiltGyro = useCallback(e => {
    let { beta: frontToBack, gamma: leftToRight } = e;
    if (prevFB >= 175 && frontToBack <= -175) frontToBack = 179;
    else if (prevFB <= -175 && frontToBack >= 175) frontToBack = -179;
    setPrevFB(frontToBack);

    if (prevLR >= 85 && leftToRight <= -85) leftToRight = 89;
    else if (prevLR <= -85 && leftToRight >= 85) leftToRight = -89;
    setPrevLR(leftToRight);

    [imgLeftRef.current, imgRightRef.current].forEach(img =>
      gsap.to(img, {
        duration: 0.7,
        rotationX: -(frontToBack % 90) * 0.35,
        rotationY: leftToRight * 0.35,
        ease: "power3.out"
      })
    );
  }, []);

  const buttonAnimation = useCallback(() => {
    gsap.to(".hero-btn svg", {
      y: 10,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "power4.inOut"
    });
  }, []);

  useEffect(() => {
    window.addEventListener("deviceorientation", imgTiltGyro);
    heroRef.current?.addEventListener("mousemove", imgTilt);
    buttonAnimation();
  }, [imgTilt, buttonAnimation, imgTiltGyro]);

  return (
    <section className="hero" ref={heroRef}>
      <div className="inner">
        <div className="hero-images">
          <div className="hero-img" ref={imgLeftRef}>
            <img src={imgLeft} alt="Sportswear" />
          </div>
          <div className="hero-img" ref={imgRightRef}>
            <img src={imgRight} alt="Sportswear" />
          </div>
        </div>
        <div className="hero-text">
          <h1>NEW SPORTS</h1>
          <h1>COLLECTION</h1>
          <p>For the fitness freak in you</p>
          <Button className="hero-btn" />
        </div>
      </div>
    </section>
  );
}
