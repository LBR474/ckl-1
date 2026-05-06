import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import {
  faWandMagicSparkles,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

//import FloatingSphere from "./components/FloatingSphere";
import { Stars } from "@react-three/drei";
import Earth from "./components/Earth";

import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function PulsingLight() {
  const lightRef = useRef<THREE.DirectionalLight | null>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const intensity = 7.5 + Math.sin(t) * 0.9;

    if (lightRef.current) {
      lightRef.current.intensity = intensity;
    }
  });

  return (
    <directionalLight ref={lightRef} position={[2, 2.5, -5]} intensity={2.5} />
  );
}

function TorusRing() {
  return (
    <mesh rotation={[0, 0, 0]} position={[0.9, -0.7, 2]}>
      <torusGeometry args={[1.5, 0.001, 16, 100]} />
      <meshStandardMaterial
        color="#ff4df0"
        emissive="#ff4df0"
        emissiveIntensity={1.5}
      />
    </mesh>
  );
}

function Satellite({
  radius = 1.5,
  speed = 1.0,
  offset = 0,
  center = [0.9, -0.7, 2],
  startAngle = Math.PI / 2,
}: {
  radius?: number;
  speed?: number;
  offset?: number;
  center?: [number, number, number];
  startAngle?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  // include offset in initial angle
  const angleRef = useRef(startAngle + offset);
  const directionRef = useRef(1);

  useFrame((_, delta) => {
    angleRef.current += delta * speed * directionRef.current;

    let a = angleRef.current % (Math.PI * 2);
    if (a < 0) a += Math.PI * 2;

    const threshold = 0.05;

    // bounce at 12 o'clock
    if (Math.abs(a - Math.PI / 2) < threshold) {
      directionRef.current *= -1;
    }

    const x = center[0] + radius * Math.cos(angleRef.current);
    const y = center[1] + radius * Math.sin(angleRef.current);
    const z = center[2];

    if (ref.current) {
      ref.current.position.set(x, y, z);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshStandardMaterial
        color="#ff4df0"
        emissive="#ff4df0"
        emissiveIntensity={2}
      />
    </mesh>
  );
}

function App() {
  return (
    <>
      <div className="scene">
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="r3f-layer">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.1} />
            <mesh position={[2, 0, -2]}>
              <sphereGeometry args={[2.09, 32, 16]} />
              <meshBasicMaterial color="#a234fd" transparent opacity={0.1} />
            </mesh>

            <PulsingLight />
            <TorusRing />

            <Earth scale={1} />
            <Satellite offset={Math.PI / 4} />
            <Satellite offset={Math.PI} />
            <Stars
              radius={100} // sphere size
              depth={50} // how deep the star field is
              count={5000} // number of stars
              factor={8} // size of stars
              saturation={0} // 0 = white stars
              fade // makes edges softer
              speed={1} // subtle movement
            />
          </Canvas>
        </div>

        {/* =========================
        TOP BAR
    ========================= */}
        <div className="top-bar">
          {/* LEFT */}
          <div className="top-left">
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            <span>
              Celebrating 19 years : <span className="accent">2007 - 2026</span>
            </span>
          </div>

          {/* CENTER */}
          <div className="top-center"></div>

          {/* RIGHT */}
          <div className="top-right">
            <div className="call-group">
              <span className="phone-icon">
                <FontAwesomeIcon icon={faPhone} />
              </span>
              <span className="call-text">Call us: +61 402 027 801</span>
            </div>

            <div className="social-icons">
              <FontAwesomeIcon icon={faFacebookF} />
              <FontAwesomeIcon icon={faLinkedinIn} />
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faXTwitter} />
            </div>
          </div>
        </div>

        <div className="second-top-bar">
          <img
            src="src/assets/logo-latest.png"
            alt="Company Logo"
            className="company-logo"
          />

          <nav className="main-nav">
            <ul>
              <li className="has-dropdown">
                <a href="#">Home</a>
              </li>
              <li className="has-dropdown">
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Domains & Hosting</a>
              </li>
              <li className="has-dropdown">
                <a href="#">Our Blog</a>
              </li>
              <li className="has-dropdown">
                <a href="#">About Us</a>
              </li>
              <li className="has-dropdown">
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* =========================
        MAIN STAGE
    ========================= */}
        <div className="main-content">
          <div className="MC-top-left-corner">
            <img
              src="src/assets/sub-title.png"
              alt="Decorative Element"
              className="decorative-element"
            />
          </div>
          <div className="MC-bottom-left-corner">
            <h1>Web & AI Systems for Established Businesses</h1>
            <h2>
              We design scalable custom web platforms and deliver practical AI
              integration into real business workflows.
            </h2>

            <h3>
              KL Web Concepts is a web and AI systems agency specialising in
              custom web development and AI integration for established
              businesses.
            </h3>
          </div>
          <div className="MC-bottom-right-corner">
            <div className="image-row">
              <img
                src="src/assets/start-your-project-button.png"
                alt="Start project"
                className="decorative-element"
              />
              <img
                src="src/assets/see-what-we-do.png"
                alt="See what we do"
                className="decorative-element"
              />
            </div>
          </div>
        </div>
        <div className="bottomDiv">
          <div className="MC-stat-bottom-right">
            <h1>1.3k+ </h1>
            <h3>CUSTOMERS</h3>

            <h5>
              We focus on what ,<br />
              actually moves your <br />
              business forward!
            </h5>
            <div className="stats-people">
              <img
                security=""
                src="src/assets/stats-people.png"
                alt="People"
                className="people-image"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
