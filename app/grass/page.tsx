import { PolaroidList } from "app/components/polaroid-list";
export default function Page() {
  const polaroids = [
    {
      src: "/beach-sunset.jpg",
      alt: "Mountain landscape",
      caption: "Adventure awaits",
      rotation: -8,
    },
    {
      src: "/beach-sunset.jpg",
      alt: "Beach sunset",
      caption: "Summer vibes",
      rotation: 5,
    },
    {
      src: "/beach-sunset.jpg",
      alt: "City skyline",
      caption: "Urban nights",
      rotation: -3,
    },
    {
      src: "/beach-sunset.jpg",
      alt: "Coffee and books",
      caption: "Cozy mornings",
      rotation: 7,
    },
    {
      src: "/beach-sunset.jpg",
      alt: "Forest path",
      caption: "Into the wild",
      rotation: -5,
    },
  ];

  return <PolaroidList polaroids={polaroids} />;
}
