import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { mat3 } from "gl-matrix";

import "./hero.scss";
import imgLeft from "../../../../images/hero/hero1.jpg";
import imgRight from "../../../../images/hero/hero2.jpg";
import Button from "../../../../components/button/Button";

const fromOrientation = function (
  out: mat3,
  alpha: number,
  beta: number,
  gamma: number
) {
  let cX, cY, cZ, sX, sY, sZ;
  let _z = alpha;
  let _x = beta;
  let _y = gamma;

  cX = Math.cos(_x);
  cY = Math.cos(_y);
  cZ = Math.cos(_z);
  sX = Math.sin(_x);
  sY = Math.sin(_y);
  sZ = Math.sin(_z);

  out[0] = cZ * cY + sZ * sX * sY;
  out[1] = cX * sZ;
  out[2] = -cZ * sY + sZ * sX * cY;
  out[3] = -cY * sZ + cZ * sX * sY;
  out[4] = cZ * cX;
  out[5] = sZ * sY + cZ * cY * sX;
  out[6] = cX * sY;
  out[7] = -sX;
  out[8] = cX * cY;
};

const deg2rad = Math.PI / 180;
let currentRotMat: mat3,
  previousRotMat: mat3,
  inverseMat: mat3,
  relativeRotationDelta: mat3,
  totalRightAngularMovement = 0,
  totalTopAngularMovement = 0;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imgLeftRef = useRef<HTMLDivElement>(null);
  const imgRightRef = useRef<HTMLDivElement>(null);

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
    // let { beta: frontToBack, gamma: leftToRight } = e;
    let { alpha, beta, gamma } = e;
    if (!previousRotMat) {
      previousRotMat = mat3.create();
      currentRotMat = mat3.create();
      relativeRotationDelta = mat3.create();

      fromOrientation(
        currentRotMat,
        alpha * deg2rad,
        beta * deg2rad,
        gamma * deg2rad
      );
    }
    mat3.copy(previousRotMat, currentRotMat);
    fromOrientation(
      currentRotMat,
      alpha * deg2rad,
      beta * deg2rad,
      gamma * deg2rad
    );
    mat3.transpose(inverseMat, previousRotMat); // for rotation matrix, inverse is transpose
    mat3.multiply(relativeRotationDelta, currentRotMat, inverseMat);

    // add the angular deltas to the cummulative rotation
    totalRightAngularMovement += Math.asin(relativeRotationDelta[6]) / deg2rad;
    totalTopAngularMovement += Math.asin(relativeRotationDelta[7]) / deg2rad;
    console.log(totalRightAngularMovement, totalTopAngularMovement);

    // [imgLeftRef.current, imgRightRef.current].forEach(img =>
    //   gsap.to(img, {
    //     duration: 0.7,
    //     rotationX: -(frontToBack % 90) * 0.35,
    //     rotationY: leftToRight * 0.35,
    //     ease: "power3.out"
    //   })
    // );
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
