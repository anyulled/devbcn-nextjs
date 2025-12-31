interface CfpMember {
  name: string;
  photo?: string;
  linkedIn?: string;
  twitter?: string;
}

interface CfpTrack {
  name: string;
  id: string;
  members: CfpMember[];
}

export const cfpData: Record<string, CfpTrack[]> = {
  2026: [
    {
      name: "Java & JVM",
      id: "656fece2-9447-4dbe-8a78-8dc6aa7124f2",
      members: [
        {
          name: "Ana Maria Mihalceanu",
          photo: "https://sessionize.com/image/076f-400o400o2-Lawur2AKGny32MmkpG69jQ.JPG",
          twitter: "https://twitter.com/ammbra1508",
          linkedIn: "https://www.linkedin.com/in/ana-maria-mihalceanu-1508",
        },
        {
          name: "Ixchel Ruiz",
          photo: "/assets/img/all-images/cfp/ixchel.png",
          twitter: "https://twitter.com/ixchelruiz",
          linkedIn: "https://www.linkedin.com/in/ixchelruiz",
        },
      ],
    },
    {
      name: "Frontend",
      id: "2684b568-2836-4713-99af-643f8a4d7972",
      members: [
        {
          name: "Carles Nuñez",
          twitter: "https://twitter.com/carlesnunez",
          linkedIn: "https://www.linkedin.com/in/carles-nunez-tomeo/",
          photo: "/assets/img/all-images/cfp/carles_nunez.jpg",
        },
        {
          name: "Iago Lastra",
          photo: "/assets/img/all-images/cfp/iago.png",
          twitter: "https://twitter.com/iagolast",
          linkedIn: "https://www.linkedin.com/in/iagolast/",
        },
        {
          name: "Montse Ortega",
          photo: "https://step4ward.es/wp-content/uploads/2024/04/montse_ortega.webp",
          linkedIn: "https://www.linkedin.com/in/montse-ortega-73061369/",
        },
      ],
    },
    {
      name: "AI, ML, Python",
      id: "c1ec728d-03c1-4d8d-9f56-637bc97f5a5b",
      members: [
        {
          name: "Nicolas Grenié",
          photo: "https://pbs.twimg.com/profile_images/1731025672791830528/bCs8_e1h_400x400.jpg",
          linkedIn: "https://linkedin.com/in/nicolasgrenie",
          twitter: "https://x.com/picsoung",
        },
      ],
    },
    {
      name: "DevOps, Cloud, Kubernetes",
      id: "504cf03b-130d-4b70-a98c-c4faeb553b5e",
      members: [
        {
          name: "Rael Garcia",
          photo: "/assets/img/all-images/cfp/rael-garcia.png",
          linkedIn: "https://www.linkedin.com/in/rael/",
          twitter: "https://x.com/raelga",
        },
      ],
    },
    {
      name: "Agile, Leadership, Diversity",
      id: "1d04d5bf-4b94-4e56-b0c6-ee93b3bb8c1f",
      members: [],
    },
  ],
  2025: [
    {
      name: "Java & JVM",
      id: "656fece2-9447-4dbe-8a78-8dc6aa7124f2",
      members: [
        {
          name: "Ana Maria Mihalceanu",
          photo: "https://sessionize.com/image/076f-400o400o2-Lawur2AKGny32MmkpG69jQ.JPG",
          twitter: "https://twitter.com/ammbra1508",
          linkedIn: "https://www.linkedin.com/in/ana-maria-mihalceanu-1508",
        },
        {
          name: "David Gomez G.",
          photo: "https://sessionize.com/image/0c32-400o400o2-DP6mds9ahD7Qz7P5zWwcjy.jpg",
          twitter: "https://twitter.com/dgomezg",
          linkedIn: "https://www.linkedin.com/in/dgomezg",
        },
        {
          name: "Grace Jansen",
          photo: "/assets/img/all-images/cfp/grace.png",
          twitter: "https://twitter.com/gracejansen27",
          linkedIn: "https://www.linkedin.com/in/grace-jansen",
        },
        {
          name: "Ixchel Ruiz",
          photo: "/assets/img/all-images/cfp/ixchel.png",
          twitter: "https://twitter.com/ixchelruiz",
          linkedIn: "https://www.linkedin.com/in/ixchelruiz",
        },
      ],
    },
    {
      name: "Frontend",
      id: "2684b568-2836-4713-99af-643f8a4d7972",
      members: [
        {
          name: "Carles Nuñez",
          twitter: "https://twitter.com/carlesnunez",
          linkedIn: "https://www.linkedin.com/in/carles-nunez-tomeo/",
          photo: "/assets/img/all-images/cfp/carles_nunez.jpg",
        },
        {
          name: "Iago Lastra",
          photo: "/assets/img/all-images/cfp/iago.png",
          twitter: "https://twitter.com/iagolast",
          linkedIn: "https://www.linkedin.com/in/iagolast/",
        },
        {
          name: "Montse Ortega",
          photo: "https://step4ward.es/wp-content/uploads/2024/04/montse_ortega.webp",
          linkedIn: "https://www.linkedin.com/in/montse-ortega-73061369/",
        },
      ],
    },
    {
      name: "AI, ML, Python",
      id: "c1ec728d-03c1-4d8d-9f56-637bc97f5a5b",
      members: [
        {
          name: "Lize Raes",
          photo: "/assets/img/all-images/cfp/lize-raes.jpg",
          linkedIn: "https://www.linkedin.com/in/lize-raes-a8a34110/",
          twitter: "https://x.com/LizeRaes",
        },
        {
          name: "Marie-Alice Blete",
          photo: "https://pbs.twimg.com/profile_images/1692154830561681408/mB_CT4Ag_400x400.jpg",
          linkedIn: "http://www.linkedin.com/in/mblete",
          twitter: "http://twitter.com/mariealice_b",
        },
        {
          name: "Nicolas Grenié",
          photo: "https://pbs.twimg.com/profile_images/1731025672791830528/bCs8_e1h_400x400.jpg",
          linkedIn: "https://linkedin.com/in/nicolasgrenie",
          twitter: "https://x.com/picsoung",
        },
        {
          name: "Santiago Rincón Martínez",
          linkedIn: "https://www.linkedin.com/in/santiago-rincon-martinez",
          photo: "/assets/img/all-images/cfp/santiago-rincon.jpg",
        },
      ],
    },
    {
      name: "DevOps, Cloud, Kubernetes",
      id: "504cf03b-130d-4b70-a98c-c4faeb553b5e",
      members: [
        {
          name: "Ana Carmona",
          photo: "/assets/img/all-images/cfp/ana_carmona.jpg",
          twitter: "https://twitter.com/nhan_bcn",
          linkedIn: "https://www.linkedin.com/in/ana-carmona-ag?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        },
        {
          name: "Rael Garcia",
          photo: "/assets/img/all-images/cfp/rael-garcia.png",
          linkedIn: "https://www.linkedin.com/in/rael/",
          twitter: "https://x.com/raelga",
        },
        {
          name: "Tiffany Jernigan",
          photo: "https://ugc.production.linktr.ee/05Rq619zQ6ujZfw4W3b4_0134Oz8u8hFC0HW5?io=true&size=avatar-v3_0",
          linkedIn: "https://www.linkedin.com/in/tiffanyfayj",
          twitter: "https://www.twitter.com/tiffanyfayj",
        },
        {
          name: "Abdel Sghiouar",
          twitter: "https://twitter.com/boredabdel",
          linkedIn: "https://www.linkedin.com/in/sabdelfettah/",
          photo: "/assets/img/all-images/cfp/adbel-sghiouar.jpg",
        },
      ],
    },
    {
      name: "Agile, Leadership, Diversity",
      id: "1d04d5bf-4b94-4e56-b0c6-ee93b3bb8c1f",
      members: [
        {
          name: "Angels Gilabert",
          linkedIn: "https://www.linkedin.com/in/angelsgilabertviciana/",
          photo: "/assets/img/all-images/cfp/angels-gilabert.jpg",
        },
        {
          name: "Julio César Pérez",
          photo: "/assets/img/all-images/cfp/julio_cesar.jpg",
          linkedIn: "https://www.linkedin.com/in/juliocesarperezarques/",
          twitter: "https://twitter.com/jcesarperez",
        },
        {
          name: "Raquel Dominguez Andujar",
          photo: "/assets/img/all-images/cfp/raquel-andujar.jpg",
          linkedIn: "https://www.linkedin.com/in/raqueldominguezandujar/",
        },
        {
          name: "Toni Tassani",
          photo: "/assets/img/all-images/cfp/toni.jpg",
          twitter: "https://twitter.com/atassani",
          linkedIn: "https://www.linkedin.com/in/tonitassani/en",
        },
      ],
    },
  ],
  2024: [
    {
      name: "Java & JVM",
      id: "656fece2-9447-4dbe-8a78-8dc6aa7124f2",
      members: [
        {
          name: "Ana Maria Mihalceanu",
          photo: "https://sessionize.com/image/076f-400o400o2-Lawur2AKGny32MmkpG69jQ.JPG",
          twitter: "https://twitter.com/ammbra1508",
          linkedIn: "https://www.linkedin.com/in/ana-maria-mihalceanu-1508",
        },
        {
          name: "David Gomez G.",
          photo: "https://sessionize.com/image/0c32-400o400o2-DP6mds9ahD7Qz7P5zWwcjy.jpg",
          twitter: "https://twitter.com/dgomezg",
          linkedIn: "https://www.linkedin.com/in/dgomezg",
        },
        {
          name: "Grace Jansen",
          photo: "/assets/img/all-images/cfp/grace.png",
          twitter: "https://twitter.com/gracejansen27",
          linkedIn: "https://www.linkedin.com/in/grace-jansen",
        },
        {
          name: "Ixchel Ruiz",
          photo: "/assets/img/all-images/cfp/ixchel.png",
          twitter: "https://twitter.com/ixchelruiz",
          linkedIn: "https://www.linkedin.com/in/ixchelruiz",
        },
      ],
    },
    {
      name: "Frontend",
      id: "2684b568-2836-4713-99af-643f8a4d7972",
      members: [
        {
          name: "Iago Lastra",
          photo: "/assets/img/all-images/cfp/iago.png",
          twitter: "https://twitter.com/iagolast",
          linkedIn: "https://www.linkedin.com/in/iagolast/",
        },
        {
          name: "Laura Rodriguez Castillo",
          photo: "/assets/img/all-images/cfp/laura.jpeg",
          twitter: "https://twitter.com/superpensando",
          linkedIn: "https://linkedin.com/in/laurarodriguezcastillo",
        },
        {
          name: "Carles Nuñez",
          twitter: "https://twitter.com/carlesnunez",
          linkedIn: "https://www.linkedin.com/in/carles-nunez-tomeo/",
          photo: "/assets/img/all-images/cfp/carles_nunez.jpg",
        },
        {
          name: "Phil Nash",
          linkedIn: "https://www.linkedin.com/in/philnash/",
        },
      ],
    },
    {
      name: "AI, ML, Python",
      id: "c1ec728d-03c1-4d8d-9f56-637bc97f5a5b",
      members: [
        {
          name: "Carmen Herrero",
          linkedIn: "https://www.linkedin.com/in/carherrero/",
          photo: "/assets/img/all-images/cfp/carmen_herrero.jpg",
        },
        {
          name: "Elena Tajadura",
          photo: "/assets/img/all-images/cfp/elena_tajadura.jpeg",
          linkedIn: "https://www.linkedin.com/in/elena-tajadura-jim%C3%A9nez-9300a943/",
        },
        {
          name: "Javier Menendez",
          linkedIn: "https://www.linkedin.com/in/jamepa/",
        },
      ],
    },
    {
      name: "DevOps, Cloud, Kubernetes",
      id: "504cf03b-130d-4b70-a98c-c4faeb553b5e",
      members: [
        {
          name: "Almudena Vivanco",
          linkedIn: "https://www.linkedin.com/in/almudenavivanco/",
        },
        {
          name: "Ana Carmona",
          photo: "/assets/img/all-images/cfp/ana_carmona.jpg",
          twitter: "https://twitter.com/nhan_bcn",
          linkedIn: "https://www.linkedin.com/in/ana-carmona-ag?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        },
        {
          name: "Christian Polanco",
          linkedIn: "https://www.linkedin.com/in/chrsalx/",
          twitter: "https://twitter.com/chrsalx",
          photo: "/assets/img/all-images/cfp/christian-polanco.jpg",
        },
        {
          name: "David Ricordel",
          linkedIn: "https://www.linkedin.com/in/davidricordel/",
        },
        {
          name: "Jose Adan Ortiz",
          photo: "/assets/img/all-images/cfp/jose-adan-ortiz-k8s-2024.JPG",
          twitter: "https://twitter.com/joseadanof",
          linkedIn: "https://www.linkedin.com/in/joseadan/",
        },
        {
          name: "Pablo Chacin",
          photo: "/assets/img/all-images/cfp/pablo_chacin.jpeg",
          twitter: "https://twitter.com/pablochacin",
          linkedIn: "https://www.linkedin.com/in/pablochacin/",
        },
        {
          name: "Rael Garcia",
          linkedIn: "https://www.linkedin.com/in/rael/",
        },
        {
          name: "Imma Valls",
          photo: "/assets/img/all-images/cfp/imma-valls.jpg",
          twitter: "https://twitter.com/eyeveebee",
          linkedIn: "https://www.linkedin.com/in/imma-valls",
        },
      ],
    },
    {
      name: "Agile, Leadership, Diversity",
      id: "1d04d5bf-4b94-4e56-b0c6-ee93b3bb8c1f",
      members: [
        {
          name: "Elena Navarro",
          linkedIn: "https://www.linkedin.com/in/elena-navarro-molina",
        },
        {
          name: "Jaume Jornet",
          linkedIn: "https://www.linkedin.com/in/jaumejornet/",
          photo: "/assets/img/all-images/cfp/jaume-jornet.jpg",
          twitter: "https://twitter.com/jaumejornet",
        },
        {
          name: "Julio César Pérez",
          photo: "/assets/img/all-images/cfp/julio_cesar.jpg",
          linkedIn: "https://www.linkedin.com/in/juliocesarperezarques/",
          twitter: "https://twitter.com/jcesarperez",
        },
        {
          name: "Toni Tassani",
          photo: "/assets/img/all-images/cfp/toni.jpg",
          twitter: "https://twitter.com/atassani",
          linkedIn: "https://www.linkedin.com/in/tonitassani/en",
        },
      ],
    },
  ],
  2023: [
    {
      id: "656fece2-9447-4dbe-8a78-8dc6aa7124f2",
      name: "Java & JVM",
      members: [
        {
          name: "Alex Soto",
          photo: "https://cache.sessionize.com/image/fd7e-400o400o2-11-34e0-466e-a5cb-ea585688d106.4f3f7614-bc5e-4ccd-935a-1c3659eec5e8.jpg",
          twitter: "https://twitter.com/alexsotob",
          linkedIn: "https://www.linkedin.com/in/asotobu/",
        },
        {
          name: "Ana Maria Mihalceanu",
          photo: "https://sessionize.com/image/076f-400o400o2-Lawur2AKGny32MmkpG69jQ.JPG",
          twitter: "https://twitter.com/ammbra1508",
          linkedIn: "https://www.linkedin.com/in/ana-maria-mihalceanu-1508",
        },
        {
          name: "David Gomez G.",
          photo: "https://sessionize.com/image/0c32-400o400o2-DP6mds9ahD7Qz7P5zWwcjy.jpg",
          twitter: "https://twitter.com/dgomezg",
          linkedIn: "https://www.linkedin.com/in/dgomezg",
        },
        {
          name: "Grace Jansen",
          photo: "/assets/img/all-images/cfp/grace.png",
          twitter: "https://twitter.com/gracejansen27",
          linkedIn: "https://www.linkedin.com/in/grace-jansen",
        },
        {
          name: "Ixchel Ruiz",
          photo: "/assets/img/all-images/cfp/ixchel.png",
          twitter: "https://twitter.com/ixchelruiz",
          linkedIn: "https://www.linkedin.com/in/ixchelruiz",
        },
      ],
    },
    {
      name: "Native Languages",
      id: "1c22cd3b-73e3-4161-9124-696f3e2f1249",
      members: [
        {
          name: "Aliénor Latour",
          twitter: "https://twitter.com/alienorlatour",
          photo: "/assets/img/all-images/cfp/alienor.jpg",
          linkedIn: "https://www.linkedin.com/in/alienor-latour/",
        },
        {
          name: "Donia Chaiehloudj",
          twitter: "https://twitter.com/doniacld",
          photo: "https://pbs.twimg.com/profile_images/1590642319589609472/zObYSeID_400x400.jpg",
          linkedIn: "https://www.linkedin.com/in/donia-chaiehloudj",
        },
        {
          name: "Gonzalo Serrano",
          twitter: "https://twitter.com/gonzaloserrano",
          photo: "/assets/img/all-images/cfp/gonzalo.jpg",
          linkedIn: "https://www.linkedin.com/in/gonzaloserranorevuelta/",
        },
        {
          name: "Mario Macías",
          twitter: "https://twitter.com/MaciasUPC",
          photo: "/assets/img/all-images/cfp/mario-macias.png",
          linkedIn: "https://www.linkedin.com/in/mariomac/",
        },
        {
          name: "Mario Vázquez",
          twitter: "https://twitter.com/mvazce",
          photo: "https://pbs.twimg.com/profile_images/988297919009841152/h4eKlvUM_400x400.jpg",
          linkedIn: "https://www.linkedin.com/in/mariovazquezcebrian/",
        },
      ],
    },
    {
      name: "Frontend",
      id: "2684b568-2836-4713-99af-643f8a4d7972",
      members: [
        {
          name: "Iago Lastra",
          photo: "/assets/img/all-images/cfp/iago.png",
          twitter: "https://twitter.com/iagolast",
          linkedIn: "https://www.linkedin.com/in/iagolast/",
        },
        {
          name: "Josue David Rios Diaz",
          photo: "https://pbs.twimg.com/profile_images/951236352049385472/6rRKHJsE_400x400.jpg",
          twitter: "https://twitter.com/jdriosdiaz",
          linkedIn: "https://www.linkedin.com/in/jdriosd/",
        },
        {
          name: "Laura Rodriguez Castillo",
          photo: "/assets/img/all-images/cfp/laura.jpeg",
          twitter: "https://twitter.com/superpensando",
          linkedIn: "https://linkedin.com/in/laurarodriguezcastillo",
        },
      ],
    },
    {
      name: "AI, ML, Python",
      id: "c1ec728d-03c1-4d8d-9f56-637bc97f5a5b",
      members: [
        {
          name: "Alberto Camara",
          photo: "/assets/img/all-images/cfp/alberto.jpg",
          twitter: "https://twitter.com/b3r2s",
          linkedIn: "https://www.linkedin.com/in/alberto-camara/",
        },
        {
          name: "Carmen Herrero",
          photo: "/assets/img/all-images/cfp/carmen_herrero.jpg",
          twitter: "",
          linkedIn: "",
        },
        {
          name: "Gema Parreño",
          photo: "/assets/img/all-images/cfp/gema_parreno.jpg",
          twitter: "",
          linkedIn: "",
        },
        {
          name: "Rubén Berenguel",
          photo: "https://pbs.twimg.com/profile_images/1393898544600342528/hghgDpMM_400x400.jpg",
          twitter: "https://twitter.com/berenguel",
          linkedIn: "https://www.linkedin.com/in/rberenguel/",
        },
      ],
    },
    {
      name: "DevOps, Cloud, Kubernetes",
      id: "504cf03b-130d-4b70-a98c-c4faeb553b5e",
      members: [
        {
          name: "Ara Pulido",
          photo: "/assets/img/all-images/cfp/ara.png",
          twitter: "https://twitter.com/arapulido",
          linkedIn: "https://www.linkedin.com/in/arapulido/",
        },
        {
          name: "Mario Macías",
          twitter: "https://twitter.com/MaciasUPC",
          photo: "/assets/img/all-images/cfp/mario-macias.png",
          linkedIn: "https://www.linkedin.com/in/mariomac/",
        },
        {
          name: "Mario Vázquez",
          twitter: "https://twitter.com/mvazce",
          photo: "https://pbs.twimg.com/profile_images/988297919009841152/h4eKlvUM_400x400.jpg",
          linkedIn: "https://www.linkedin.com/in/mariovazquezcebrian/",
        },
        {
          name: "Raquel Pau Fernández",
          photo: "https://pbs.twimg.com/profile_images/1253338486200909828/uBuKfSsj_400x400.jpg",
          twitter: "https://twitter.com/raquelpau",
          linkedIn: "https://www.linkedin.com/in/raquel-pau-4010069",
        },
      ],
    },
    {
      name: "Agile, Leadership, Diversity",
      id: "1d04d5bf-4b94-4e56-b0c6-ee93b3bb8c1f",
      members: [
        {
          name: "Celeste Gamez",
          photo: "/assets/img/all-images/cfp/celeste.png",
          twitter: "https://images.app.goo.gl/39E8eisV8TiULPQk8",
          linkedIn: "https://www.linkedin.com/in/celeste-g%C3%A1mez-73640460/",
        },
        {
          name: "Esther Gala",
          photo: "/assets/img/all-images/cfp/esther.png",
          twitter: "",
          linkedIn: "https://www.linkedin.com/in/esthergala/",
        },
        {
          name: "María Mira Herreros",
          photo: "/assets/img/all-images/cfp/maria.png",
          twitter: "",
          linkedIn: "https://www.linkedin.com/in/miramaria",
        },
        {
          name: "Toni Tassani",
          photo: "/assets/img/all-∫images/cfp/toni.jpg",
          twitter: "https://twitter.com/atassani",
          linkedIn: "https://www.linkedin.com/in/tonitassani/en",
        },
      ],
    },
  ],
};
