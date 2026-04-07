"use client";

import { useState, useEffect } from "react";
import { asset } from "@/lib/prefix";

const images = [
  // Project photos
  asset("/images/projects/shit-fried-rice/shit-fried-rice_01.jpg"),
  asset("/images/projects/shit-fried-rice/shit-fried-rice_02.jpg"),
  asset("/images/projects/shit-fried-rice/shit-fried-rice_04.jpg"),
  asset("/images/projects/shit-fried-rice/shit-fried-rice_05.jpg"),
  asset("/images/projects/sauce-packet-magnets/sauce-packet-magnets_01.jpg"),
  asset("/images/projects/sauce-packet-magnets/sauce-packet-magnets_04.jpg"),
  asset("/images/projects/sauce-packet-magnets/sauce-packet-magnets_07.jpg"),
  asset("/images/projects/sauce-packet-magnets/sauce-packet-magnets_09.jpg"),
  asset("/images/projects/prebiotic-broth/prebiotic-broth_01.jpg"),
  asset("/images/projects/prebiotic-broth/prebiotic-broth_03.jpg"),
  asset("/images/projects/prebiotic-broth/prebiotic-broth_05.jpg"),
  asset("/images/projects/1993/1993_01.jpg"),
  asset("/images/projects/1993/1993_03.jpg"),
  asset("/images/projects/1993/1993_05.jpg"),
  asset("/images/projects/catan/catan_01.jpg"),
  asset("/images/projects/catan/catan_03.jpg"),
  asset("/images/projects/catan/catan_05.jpg"),
  asset("/images/projects/time-tellers/time-tellers_01.jpg"),
  asset("/images/projects/time-tellers/time-tellers_03.jpg"),
  asset("/images/projects/villas-tacos/villas-tacos_01.jpg"),
  asset("/images/projects/villas-tacos/villas-tacos_03.jpg"),
  asset("/images/projects/villas-tacos/villas-tacos_05.jpg"),
  asset("/images/projects/christmas-gave-me-gas/christmas-gave-me-gas_01.jpg"),
  asset("/images/projects/christmas-gave-me-gas/christmas-gave-me-gas_04.jpg"),
  asset("/images/projects/florida-grapefruit-bolo/florida-grapefruit-bolo_01.jpg"),
  asset("/images/projects/florida-grapefruit-bolo/florida-grapefruit-bolo_02.jpg"),
  // Decor objects
  asset("/images/decor/gem1.png"),
  asset("/images/decor/gem2.png"),
  asset("/images/decor/gem3.png"),
  asset("/images/decor/crystal1.png"),
  asset("/images/decor/crystal2.png"),
  asset("/images/decor/shell1.png"),
  asset("/images/decor/shell2.png"),
  asset("/images/decor/shell3.png"),
  asset("/images/decor/flower1.png"),
  asset("/images/decor/flower2.png"),
  asset("/images/decor/butterfly1.png"),
  asset("/images/decor/butterfly2.png"),
  asset("/images/decor/skull1.png"),
  asset("/images/decor/skull2.png"),
  asset("/images/decor/moon1.png"),
  asset("/images/decor/moon2.png"),
  asset("/images/decor/star1.png"),
  asset("/images/decor/star2.png"),
  asset("/images/decor/star3.png"),
  asset("/images/decor/heart1.png"),
  asset("/images/decor/heart2.png"),
  asset("/images/decor/iridescent1.png"),
  asset("/images/decor/iridescent2.png"),
  asset("/images/decor/iridescent3.png"),
  asset("/images/decor/gold1.png"),
  asset("/images/decor/gold2.png"),
  asset("/images/decor/pearl1.png"),
  asset("/images/decor/pearl2.png"),
  asset("/images/decor/figurine1.png"),
  asset("/images/decor/figurine2.png"),
  asset("/images/decor/moth1.png"),
  asset("/images/decor/cube1.png"),
  asset("/images/decor/spiral1.png"),
  asset("/images/decor/spiral2.png"),
  asset("/images/decor/key1.png"),
  asset("/images/decor/eyes1.png"),
  asset("/images/decor/cloud1.png"),
];

export default function HomePage() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    setSrc(images[Math.floor(Math.random() * images.length)]);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#FF69B4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {src && (
        <img
          src={src}
          alt=""
          style={{
            maxWidth: "85vw",
            maxHeight: "85vh",
            objectFit: "contain",
          }}
        />
      )}
    </div>
  );
}
