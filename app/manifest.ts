import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DevBcn - Barcelona Developers Conference",
    short_name: "DevBcn",
    description: "The biggest developer conference in Barcelona. Join hundreds of developers for cutting-edge talks, workshops, and networking.",
    start_url: "/",
    display: "standalone",
    background_color: "#002454",
    theme_color: "#007bff",
    icons: [
      {
        src: "/assets/img/icons/logo192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/img/icons/maskable_icon_x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/assets/img/icons/logo512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
