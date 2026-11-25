/* Curated equal-time-budget showcase data (matched H200 measurements + DINOv3 fine-grained perception views) */
window.MEROS_SHOWCASE = {
  "tracks": [
    {
      "id": "features",
      "label": "Dense Features",
      "sub": "DINOv3-L / v2-L / B",
      "cases": [
        "dinov3_b__seattle_night__iso_vanilla_2k",
        "dinov3_l__scaffold__iso_vanilla_1k",
        "dinov3_l__seattle_night__iso_fa2_4k",
        "dinov3_l__seattle_night__iso_vanilla_2k",
        "dinov3_l__div8k_plant__iso_vanilla_1k",
        "dinov2_l__scaffold__iso_fa2_2k"
      ]
    },
    {
      "id": "sam",
      "label": "SAM",
      "sub": "Prompted & AMG",
      "cases": [
        "sam_vit_h__uhrsd_003365__iso_encoder_2k",
        "sam_vit_h__dis_bench__iso_encoder_2k",
        "sam_vit_h__dis_bicycle__iso_encoder_4k",
        "sam_vit_h__dis_sculpture__iso_encoder_4k",
        "sam_vit_l__seattle_night__amg_iso_budget",
        "sam_vit_h__uhrsd_002111__iso_encoder_2k"
      ]
    },
    {
      "id": "matting",
      "label": "Alpha Matting",
      "sub": "ViTMatte-B",
      "cases": [
        "vitmatte_b__beer_splash",
        "vitmatte_b__wicker_chair",
        "vitmatte_b__spider_web"
      ]
    },
    {
      "id": "depth",
      "label": "Depth",
      "sub": "DepthAnything V2-L",
      "cases": [
        "depth_anything_v2_l__div8k_plant",
        "depth_anything_v2_l__scaffold",
        "depth_anything_v2_l__seattle_night"
      ]
    },
    {
      "id": "seg",
      "label": "4K Segmentation",
      "sub": "UAVid Aerial",
      "cases": [
        "dinov3_b__uavid__seq18_000800__iso_fa2",
        "dinov3_b__uavid__seq18_000100__iso_vanilla",
        "dinov3_b__uavid__seq18_000100__iso_fa2",
        "dinov3_b__uavid__seq16_000000__iso_vanilla"
      ]
    }
  ],
  "cases": {
    "dinov3_l__scaffold__iso_vanilla_1k": {
      "id": "dinov3_l__scaffold__iso_vanilla_1k",
      "track": "features",
      "pill": "DINOv3-L · Scaffolding (vs. Vanilla)",
      "backbone": "DINOv3-L",
      "gpu": "NVIDIA H200",
      "lTitle": "Vanilla Attention · 1536×1024",
      "lSub": "221 ms · 1.6 MP",
      "rTitle": "MEROS r=8 · 4608×3072",
      "rSub": "186 ms · 9.00× pixels",
      "resVal": "9.00× pixels",
      "resSub": "1536×1024 → 4608×3072",
      "timeVal": "221 ms → 186 ms",
      "timeSub": "MEROS 1.19× faster on NVIDIA H200 (BF16)",
      "qualLabel": "High-Res Fidelity vs. Exact",
      "qualVal": "cos 0.991",
      "qualSub": "Patch cosine vs. Exact FA2 @ 4608×3072",
      "refLabel": "Same-Res Exact FA2 @ 4608×3072",
      "refVal": "5.98× faster",
      "refSub": "1.11 s FA2 → 186 ms MEROS · Vanilla OOM",
      "inputUrl": "assets/showcase/dinov3_l__scaffold__iso_vanilla_1k/input.jpg",
      "inputCaption": "Statue under scaffolding: DINOv3-L (1536×1024 Vanilla attention vs. 4608×3072 MEROS): Original input photograph (NVIDIA H200, BF16). 9.0× more pixels in 16% less time than Vanilla attention (221 ms vs 186 ms, NVIDIA H200, batch 1, BF16).",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Shared PCA",
          "left": "assets/showcase/dinov3_l__scaffold__iso_vanilla_1k/main_left.jpg",
          "right": "assets/showcase/dinov3_l__scaffold__iso_vanilla_1k/main_right.jpg",
          "isZoom": false,
          "desc": "Shared 3-component PCA projection of dense patch tokens onto RGB."
        },
        {
          "id": "sim2",
          "label": "Statue Query",
          "left": "assets/showcase/dinov3_l__scaffold__iso_vanilla_1k/sim2_left.jpg",
          "right": "assets/showcase/dinov3_l__scaffold__iso_vanilla_1k/sim2_right.jpg",
          "isZoom": false,
          "desc": "Fine-grained query on the statue surface: MEROS cleanly separates the glowing masonry from every razor-thin dark scaffolding pipe in front."
        },
        {
          "id": "umap",
          "label": "DINOv3 UMAP",
          "left": "assets/showcase/dinov3_l__scaffold__iso_vanilla_1k/umap_left.jpg",
          "right": "assets/showcase/dinov3_l__scaffold__iso_vanilla_1k/umap_right.jpg",
          "isZoom": false,
          "desc": "Perceptual 3D UMAP color manifold of dense patch tokens (DINOv3 paper style), separating fine geometry without any labels."
        },
        {
          "id": "kmeans",
          "label": "K-Means Parts",
          "left": "assets/showcase/dinov3_l__scaffold__iso_vanilla_1k/kmeans_left.png",
          "right": "assets/showcase/dinov3_l__scaffold__iso_vanilla_1k/kmeans_right.png",
          "isZoom": false,
          "desc": "Unsupervised K-Means clustering directly on dense patch features: thin bars, trusses, and object parts emerge cleanly at high resolution."
        },
        {
          "id": "sim_overlay",
          "label": "Query Overlay",
          "left": "assets/showcase/dinov3_l__scaffold__iso_vanilla_1k/sim_overlay_left.jpg",
          "right": "assets/showcase/dinov3_l__scaffold__iso_vanilla_1k/sim_overlay_right.jpg",
          "isZoom": false,
          "desc": "DINOv3-style fine-grained perception: cyan dot marks the query patch; warm glow traces semantically matching structures directly on the photo."
        },
        {
          "id": "zoom1",
          "label": "Zoom: Tubes",
          "left": "assets/showcase/dinov3_l__scaffold__iso_vanilla_1k/zoom1_left.jpg",
          "right": "assets/showcase/dinov3_l__scaffold__iso_vanilla_1k/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Cropped high-magnification inspection of fine structural detail."
        },
        {
          "id": "zoom2",
          "label": "Zoom: Statue",
          "left": "assets/showcase/dinov3_l__scaffold__iso_vanilla_1k/zoom2_left.jpg",
          "right": "assets/showcase/dinov3_l__scaffold__iso_vanilla_1k/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Cropped high-magnification inspection of fine structural detail."
        }
      ],
      "thumb": "assets/showcase/dinov3_l__scaffold__iso_vanilla_1k/thumb.jpg",
      "shortTitle": "Scaffolding",
      "shortMeta": "DINOv3-L · vs. Vanilla",
      "chip": "9.0× px",
      "defaultView": "main"
    },
    "dinov3_l__seattle_night__iso_fa2_4k": {
      "id": "dinov3_l__seattle_night__iso_fa2_4k",
      "track": "features",
      "pill": "DINOv3-L · Space Needle (vs. FA2)",
      "backbone": "DINOv3-L",
      "gpu": "NVIDIA H200",
      "lTitle": "Exact FlashAttention-2 (FA2) · 3840×2560",
      "lSub": "569 ms · 9.8 MP",
      "rTitle": "MEROS r=8 · 6144×4096",
      "rSub": "455 ms · 2.56× pixels",
      "resVal": "2.56× pixels",
      "resSub": "3840×2560 → 6144×4096",
      "timeVal": "569 ms → 455 ms",
      "timeSub": "MEROS 1.25× faster on NVIDIA H200 (BF16)",
      "qualLabel": "High-Res Fidelity vs. Exact",
      "qualVal": "cos 0.993",
      "qualSub": "Patch cosine vs. Exact FA2 @ 6144×4096",
      "refLabel": "Same-Res Exact FA2 @ 6144×4096",
      "refVal": "7.13× faster",
      "refSub": "3.24 s FA2 → 455 ms MEROS · Vanilla OOM",
      "inputUrl": "assets/showcase/dinov3_l__seattle_night__iso_fa2_4k/input.jpg",
      "inputCaption": "Space Needle at night: DINOv3-L (3840×2560 Exact FA2 vs. 6144×4096 MEROS): Original input photograph (NVIDIA H200, BF16). 2.6× more pixels in 20% less time than Exact FA2 (569 ms vs 455 ms, NVIDIA H200, batch 1, BF16).",
      "isSquare": false,
      "views": [
        {
          "id": "sim2",
          "label": "Skyline Query",
          "left": "assets/showcase/dinov3_l__seattle_night__iso_fa2_4k/sim2_left.jpg",
          "right": "assets/showcase/dinov3_l__seattle_night__iso_fa2_4k/sim2_right.jpg",
          "isZoom": false,
          "desc": "Fine-grained query on an illuminated skyscraper: MEROS resolves individual window grids, the rooftop flag, crane, and Space Needle silhouette at 6K."
        },
        {
          "id": "main",
          "label": "Shared PCA",
          "left": "assets/showcase/dinov3_l__seattle_night__iso_fa2_4k/main_left.jpg",
          "right": "assets/showcase/dinov3_l__seattle_night__iso_fa2_4k/main_right.jpg",
          "isZoom": false,
          "desc": "Shared 3-component PCA projection of dense patch tokens onto RGB."
        },
        {
          "id": "umap",
          "label": "DINOv3 UMAP",
          "left": "assets/showcase/dinov3_l__seattle_night__iso_fa2_4k/umap_left.jpg",
          "right": "assets/showcase/dinov3_l__seattle_night__iso_fa2_4k/umap_right.jpg",
          "isZoom": false,
          "desc": "Perceptual 3D UMAP color manifold of dense patch tokens (DINOv3 paper style), separating fine geometry without any labels."
        },
        {
          "id": "kmeans",
          "label": "K-Means Parts",
          "left": "assets/showcase/dinov3_l__seattle_night__iso_fa2_4k/kmeans_left.png",
          "right": "assets/showcase/dinov3_l__seattle_night__iso_fa2_4k/kmeans_right.png",
          "isZoom": false,
          "desc": "Unsupervised K-Means clustering directly on dense patch features: thin bars, trusses, and object parts emerge cleanly at high resolution."
        },
        {
          "id": "sim_overlay",
          "label": "Query Overlay",
          "left": "assets/showcase/dinov3_l__seattle_night__iso_fa2_4k/sim_overlay_left.jpg",
          "right": "assets/showcase/dinov3_l__seattle_night__iso_fa2_4k/sim_overlay_right.jpg",
          "isZoom": false,
          "desc": "DINOv3-style fine-grained perception: cyan dot marks the query patch; warm glow traces semantically matching structures directly on the photo."
        },
        {
          "id": "zoom1",
          "label": "Zoom: Spire",
          "left": "assets/showcase/dinov3_l__seattle_night__iso_fa2_4k/zoom1_left.jpg",
          "right": "assets/showcase/dinov3_l__seattle_night__iso_fa2_4k/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Cropped high-magnification inspection of fine structural detail."
        },
        {
          "id": "zoom2",
          "label": "Zoom: Skyline",
          "left": "assets/showcase/dinov3_l__seattle_night__iso_fa2_4k/zoom2_left.jpg",
          "right": "assets/showcase/dinov3_l__seattle_night__iso_fa2_4k/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Cropped high-magnification inspection of fine structural detail."
        }
      ],
      "thumb": "assets/showcase/dinov3_l__seattle_night__iso_fa2_4k/thumb.jpg",
      "shortTitle": "Space Needle 6K",
      "shortMeta": "DINOv3-L · vs. FA2",
      "chip": "2.6× px",
      "defaultView": "sim2"
    },
    "dinov3_l__seattle_night__iso_vanilla_2k": {
      "id": "dinov3_l__seattle_night__iso_vanilla_2k",
      "track": "features",
      "pill": "DINOv3-L · Space Needle (vs. Vanilla)",
      "backbone": "DINOv3-L",
      "gpu": "NVIDIA H200",
      "lTitle": "Vanilla Attention · 2304×1536",
      "lSub": "929 ms · 3.5 MP",
      "rTitle": "MEROS r=8 · 6912×4608",
      "rSub": "682 ms · 9.00× pixels",
      "resVal": "9.00× pixels",
      "resSub": "2304×1536 → 6912×4608",
      "timeVal": "929 ms → 682 ms",
      "timeSub": "MEROS 1.36× faster on NVIDIA H200 (BF16)",
      "qualLabel": "High-Res Fidelity vs. Exact",
      "qualVal": "cos 0.991",
      "qualSub": "Patch cosine vs. Exact FA2 @ 6912×4608",
      "refLabel": "Same-Res Exact FA2 @ 6912×4608",
      "refVal": "7.51× faster",
      "refSub": "5.12 s FA2 → 682 ms MEROS · Vanilla OOM",
      "inputUrl": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/input.jpg",
      "inputCaption": "Space Needle at night: DINOv3-L (2304×1536 Vanilla attention vs. 6912×4608 MEROS): Original input photograph (NVIDIA H200, BF16). 9.0× more pixels in 27% less time than Vanilla attention (929 ms vs 682 ms, NVIDIA H200, batch 1, BF16).",
      "isSquare": false,
      "views": [
        {
          "id": "sim2",
          "label": "Skyline Query",
          "left": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/sim2_left.jpg",
          "right": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/sim2_right.jpg",
          "isZoom": false,
          "desc": "Fine-grained query on a downtown tower (cyan dot): coarse flat blocks at 2.3K sharpen into thousands of individual lit windows & crisp truss lines at 6.9K."
        },
        {
          "id": "main",
          "label": "Shared PCA",
          "left": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/main_left.jpg",
          "right": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/main_right.jpg",
          "isZoom": false,
          "desc": "Shared 3-component PCA projection of dense patch tokens onto RGB."
        },
        {
          "id": "umap",
          "label": "DINOv3 UMAP",
          "left": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/umap_left.jpg",
          "right": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/umap_right.jpg",
          "isZoom": false,
          "desc": "Perceptual 3D UMAP color manifold of dense patch tokens (DINOv3 paper style), separating fine geometry without any labels."
        },
        {
          "id": "kmeans",
          "label": "K-Means Parts",
          "left": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/kmeans_left.png",
          "right": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/kmeans_right.png",
          "isZoom": false,
          "desc": "Unsupervised K-Means clustering directly on dense patch features: thin bars, trusses, and object parts emerge cleanly at high resolution."
        },
        {
          "id": "sim_overlay",
          "label": "Query Overlay",
          "left": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/sim_overlay_left.jpg",
          "right": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/sim_overlay_right.jpg",
          "isZoom": false,
          "desc": "DINOv3-style fine-grained perception: cyan dot marks the query patch; warm glow traces semantically matching structures directly on the photo."
        },
        {
          "id": "zoom1",
          "label": "Zoom: Spire",
          "left": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/zoom1_left.jpg",
          "right": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Cropped high-magnification inspection of fine structural detail."
        },
        {
          "id": "zoom2",
          "label": "Zoom: Skyline",
          "left": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/zoom2_left.jpg",
          "right": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Cropped high-magnification inspection of fine structural detail."
        }
      ],
      "thumb": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/thumb.jpg",
      "shortTitle": "Space Needle 6.9K",
      "shortMeta": "DINOv3-L · vs. Vanilla",
      "chip": "9.0× px",
      "defaultView": "sim2"
    },
    "dinov3_l__div8k_plant__iso_vanilla_1k": {
      "id": "dinov3_l__div8k_plant__iso_vanilla_1k",
      "track": "features",
      "pill": "DINOv3-L · Industrial Plant (vs. Vanilla)",
      "backbone": "DINOv3-L",
      "gpu": "NVIDIA H200",
      "lTitle": "Vanilla Attention · 1024×1024",
      "lSub": "96.2 ms · 1.1 MP",
      "rTitle": "MEROS r=8 · 2816×2816",
      "rSub": "82.4 ms · 7.56× pixels",
      "resVal": "7.56× pixels",
      "resSub": "1024×1024 → 2816×2816",
      "timeVal": "96.2 ms → 82.4 ms",
      "timeSub": "MEROS 1.17× faster on NVIDIA H200 (BF16)",
      "qualLabel": "High-Res Fidelity vs. Exact",
      "qualVal": "cos 0.993",
      "qualSub": "Patch cosine vs. Exact FA2 @ 2816×2816",
      "refLabel": "Same-Res Exact FA2 @ 2816×2816",
      "refVal": "4.70× faster",
      "refSub": "388 ms FA2 → 82.4 ms MEROS · Vanilla OOM",
      "inputUrl": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/input.jpg",
      "inputCaption": "Industrial plant (DIV8K): DINOv3-L (1024×1024 Vanilla attention vs. 2816×2816 MEROS): Original input photograph (NVIDIA H200, BF16). 7.6× more pixels in 14% less time than Vanilla attention (96 ms vs 82 ms, NVIDIA H200, batch 1, BF16).",
      "isSquare": true,
      "views": [
        {
          "id": "sim2",
          "label": "Steelwork Query",
          "left": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/sim2_left.jpg",
          "right": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/sim2_right.jpg",
          "isZoom": false,
          "desc": "Fine-grained query on the steel catwalk (cyan dot): a blurry 1K blotch transforms into a laser-sharp blueprint of handrails, ladders, X-braces, and pipes."
        },
        {
          "id": "main",
          "label": "Shared PCA",
          "left": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/main_left.jpg",
          "right": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/main_right.jpg",
          "isZoom": false,
          "desc": "Shared 3-component PCA projection of dense patch tokens onto RGB."
        },
        {
          "id": "umap",
          "label": "DINOv3 UMAP",
          "left": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/umap_left.jpg",
          "right": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/umap_right.jpg",
          "isZoom": false,
          "desc": "Perceptual 3D UMAP color manifold of dense patch tokens (DINOv3 paper style), separating fine geometry without any labels."
        },
        {
          "id": "kmeans",
          "label": "K-Means Parts",
          "left": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/kmeans_left.png",
          "right": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/kmeans_right.png",
          "isZoom": false,
          "desc": "Unsupervised K-Means clustering directly on dense patch features: thin bars, trusses, and object parts emerge cleanly at high resolution."
        },
        {
          "id": "sim_overlay",
          "label": "Query Overlay",
          "left": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/sim_overlay_left.jpg",
          "right": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/sim_overlay_right.jpg",
          "isZoom": false,
          "desc": "DINOv3-style fine-grained perception: cyan dot marks the query patch; warm glow traces semantically matching structures directly on the photo."
        },
        {
          "id": "zoom1",
          "label": "Zoom: Railings",
          "left": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/zoom1_left.jpg",
          "right": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Cropped high-magnification inspection of fine structural detail."
        },
        {
          "id": "zoom2",
          "label": "Zoom: Pipes",
          "left": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/zoom2_left.jpg",
          "right": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Cropped high-magnification inspection of fine structural detail."
        }
      ],
      "thumb": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/thumb.jpg",
      "shortTitle": "Industrial Plant",
      "shortMeta": "DINOv3-L · vs. Vanilla",
      "chip": "7.6× px",
      "defaultView": "sim2"
    },
    "dinov2_l__scaffold__iso_fa2_2k": {
      "id": "dinov2_l__scaffold__iso_fa2_2k",
      "track": "features",
      "pill": "DINOv2-L · Scaffolding (vs. FA2)",
      "backbone": "DINOv2-L (registers)",
      "gpu": "NVIDIA H200",
      "lTitle": "Exact FlashAttention-2 (FA2) · 2688×1792",
      "lSub": "227 ms · 4.8 MP",
      "rTitle": "MEROS r=8 · 4032×2688",
      "rSub": "182 ms · 2.25× pixels",
      "resVal": "2.25× pixels",
      "resSub": "2688×1792 → 4032×2688",
      "timeVal": "227 ms → 182 ms",
      "timeSub": "MEROS 1.25× faster on NVIDIA H200 (BF16)",
      "qualLabel": "High-Res Fidelity vs. Exact",
      "qualVal": "cos 0.991",
      "qualSub": "Patch cosine vs. Exact FA2 @ 4032×2688",
      "refLabel": "Same-Res Exact FA2 @ 4032×2688",
      "refVal": "5.73× faster",
      "refSub": "1.04 s FA2 → 182 ms MEROS · Vanilla OOM",
      "inputUrl": "assets/showcase/dinov2_l__scaffold__iso_fa2_2k/input.jpg",
      "inputCaption": "Statue under scaffolding: DINOv2-L (registers) (2688×1792 Exact FA2 vs. 4032×2688 MEROS): Original input photograph (NVIDIA H200, BF16). 2.2× more pixels in 20% less time than Exact FA2 (227 ms vs 182 ms, NVIDIA H200, batch 1, BF16).",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Shared PCA",
          "left": "assets/showcase/dinov2_l__scaffold__iso_fa2_2k/main_left.jpg",
          "right": "assets/showcase/dinov2_l__scaffold__iso_fa2_2k/main_right.jpg",
          "isZoom": false,
          "desc": "Shared 3-component PCA projection of dense patch tokens onto RGB."
        },
        {
          "id": "sim2",
          "label": "Statue Query",
          "left": "assets/showcase/dinov2_l__scaffold__iso_fa2_2k/sim2_left.jpg",
          "right": "assets/showcase/dinov2_l__scaffold__iso_fa2_2k/sim2_right.jpg",
          "isZoom": false,
          "desc": "Fine-grained query on the statue masonry: DINOv2-L + MEROS sharpens every scaffolding strut cutting across the sculpture."
        },
        {
          "id": "umap",
          "label": "DINOv3 UMAP",
          "left": "assets/showcase/dinov2_l__scaffold__iso_fa2_2k/umap_left.jpg",
          "right": "assets/showcase/dinov2_l__scaffold__iso_fa2_2k/umap_right.jpg",
          "isZoom": false,
          "desc": "Perceptual 3D UMAP color manifold of dense patch tokens (DINOv3 paper style), separating fine geometry without any labels."
        },
        {
          "id": "kmeans",
          "label": "K-Means Parts",
          "left": "assets/showcase/dinov2_l__scaffold__iso_fa2_2k/kmeans_left.png",
          "right": "assets/showcase/dinov2_l__scaffold__iso_fa2_2k/kmeans_right.png",
          "isZoom": false,
          "desc": "Unsupervised K-Means clustering directly on dense patch features: thin bars, trusses, and object parts emerge cleanly at high resolution."
        },
        {
          "id": "sim_overlay",
          "label": "Query Overlay",
          "left": "assets/showcase/dinov2_l__scaffold__iso_fa2_2k/sim_overlay_left.jpg",
          "right": "assets/showcase/dinov2_l__scaffold__iso_fa2_2k/sim_overlay_right.jpg",
          "isZoom": false,
          "desc": "DINOv3-style fine-grained perception: cyan dot marks the query patch; warm glow traces semantically matching structures directly on the photo."
        },
        {
          "id": "zoom1",
          "label": "Zoom: Tubes",
          "left": "assets/showcase/dinov2_l__scaffold__iso_fa2_2k/zoom1_left.jpg",
          "right": "assets/showcase/dinov2_l__scaffold__iso_fa2_2k/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Cropped high-magnification inspection of fine structural detail."
        },
        {
          "id": "zoom2",
          "label": "Zoom: Statue",
          "left": "assets/showcase/dinov2_l__scaffold__iso_fa2_2k/zoom2_left.jpg",
          "right": "assets/showcase/dinov2_l__scaffold__iso_fa2_2k/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Cropped high-magnification inspection of fine structural detail."
        }
      ],
      "thumb": "assets/showcase/dinov2_l__scaffold__iso_fa2_2k/thumb.jpg",
      "shortTitle": "Scaffolding 4.6K",
      "shortMeta": "DINOv2-L · vs. FA2",
      "chip": "2.3× px",
      "defaultView": "main"
    },
    "dinov3_b__seattle_night__iso_vanilla_2k": {
      "id": "dinov3_b__seattle_night__iso_vanilla_2k",
      "track": "features",
      "pill": "DINOv3-B · 7.7K Skyline (vs. Vanilla)",
      "backbone": "DINOv3-B",
      "gpu": "NVIDIA H200",
      "lTitle": "Vanilla Attention · 2304×1536",
      "lSub": "355 ms · 3.5 MP",
      "rTitle": "MEROS r=8 · 7680×5120",
      "rSub": "353 ms · 11.11× pixels",
      "resVal": "11.11× pixels",
      "resSub": "2304×1536 → 7680×5120",
      "timeVal": "355 ms → 353 ms",
      "timeSub": "MEROS matches latency on NVIDIA H200 (BF16)",
      "qualLabel": "High-Res Fidelity vs. Exact",
      "qualVal": "cos 0.995",
      "qualSub": "Patch cosine vs. Exact FA2 @ 7680×5120",
      "refLabel": "Same-Res Exact FA2 @ 7680×5120",
      "refVal": "8.09× faster",
      "refSub": "2.85 s FA2 → 353 ms MEROS · Vanilla OOM",
      "inputUrl": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/input.jpg",
      "inputCaption": "Space Needle at night: DINOv3-B (2304×1536 Vanilla attention vs. 7680×5120 MEROS): Original input photograph (NVIDIA H200, BF16). 11.1× more pixels in 1% less time than Vanilla attention (355 ms vs 353 ms, NVIDIA H200, batch 1, BF16).",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Shared PCA",
          "left": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/main_left.jpg",
          "right": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/main_right.jpg",
          "isZoom": false,
          "desc": "Shared 3-component PCA projection of dense patch tokens onto RGB."
        },
        {
          "id": "sim2",
          "label": "Skyline Query",
          "left": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/sim2_left.jpg",
          "right": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/sim2_right.jpg",
          "isZoom": false,
          "desc": "Fine-grained query on a lit skyscraper at 7.7K (11.1× pixels): individual windows across the entire skyline emerge cleanly in equal forward time."
        },
        {
          "id": "umap",
          "label": "DINOv3 UMAP",
          "left": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/umap_left.jpg",
          "right": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/umap_right.jpg",
          "isZoom": false,
          "desc": "Perceptual 3D UMAP color manifold of dense patch tokens (DINOv3 paper style), separating fine geometry without any labels."
        },
        {
          "id": "kmeans",
          "label": "K-Means Parts",
          "left": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/kmeans_left.png",
          "right": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/kmeans_right.png",
          "isZoom": false,
          "desc": "Unsupervised K-Means clustering directly on dense patch features: thin bars, trusses, and object parts emerge cleanly at high resolution."
        },
        {
          "id": "sim_overlay",
          "label": "Query Overlay",
          "left": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/sim_overlay_left.jpg",
          "right": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/sim_overlay_right.jpg",
          "isZoom": false,
          "desc": "DINOv3-style fine-grained perception: cyan dot marks the query patch; warm glow traces semantically matching structures directly on the photo."
        },
        {
          "id": "zoom1",
          "label": "Zoom: Spire",
          "left": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/zoom1_left.jpg",
          "right": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Cropped high-magnification inspection of fine structural detail."
        },
        {
          "id": "zoom2",
          "label": "Zoom: Skyline",
          "left": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/zoom2_left.jpg",
          "right": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Cropped high-magnification inspection of fine structural detail."
        }
      ],
      "thumb": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/thumb.jpg",
      "shortTitle": "7.7K Skyline",
      "shortMeta": "DINOv3-B · vs. Vanilla",
      "chip": "11.1× px",
      "defaultView": "main"
    },
    "sam_vit_h__uhrsd_003365__iso_encoder_2k": {
      "id": "sam_vit_h__uhrsd_003365__iso_encoder_2k",
      "track": "sam",
      "pill": "SAM ViT-H · Beach Duo (+0.26 B-IoU)",
      "backbone": "SAM ViT-H",
      "gpu": "NVIDIA H200",
      "lTitle": "Exact SAM (Official) · 2048×2048",
      "lSub": "254 ms · B-IoU 0.633",
      "rTitle": "MEROS r=8 · 2816×2816",
      "rSub": "253 ms · B-IoU 0.897 (+0.264)",
      "resVal": "1.89× pixels",
      "resSub": "2048×2048 → 2816×2816",
      "timeVal": "254 ms → 253 ms",
      "timeSub": "MEROS matches latency on NVIDIA H200 (BF16)",
      "qualLabel": "Boundary IoU Gain",
      "qualVal": "0.633 → 0.897",
      "qualSub": "+0.264 Boundary IoU at equal/lower time",
      "refLabel": "Same-Res SAM @ 2816×2816",
      "refVal": "2.89× faster",
      "refSub": "730 ms Exact → 253 ms MEROS · 99.8% mask IoU",
      "inputUrl": "assets/showcase/sam_vit_h__uhrsd_003365__iso_encoder_2k/input.jpg",
      "inputCaption": "Box-prompted SAM ViT-H, thin-structure object (UHRSD): Exact 2048 px vs. MEROS 2816 px: Original input photograph (NVIDIA H200, BF16). Same box prompt (GT bounding box). Image-encoder latency only, NVIDIA H200, batch 1, BF16 encoder. MEROS encodes 1.89x more pixels in 253 ms vs 254 ms; boundary IoU 0.633 -> 0.897, IoU 0.666 -> 0.977 at the original resolution.",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Mask Overlay",
          "left": "assets/showcase/sam_vit_h__uhrsd_003365__iso_encoder_2k/main_left.jpg",
          "right": "assets/showcase/sam_vit_h__uhrsd_003365__iso_encoder_2k/main_right.jpg",
          "isZoom": false,
          "desc": "Predicted segmentation masks overlaid directly on the input photograph."
        },
        {
          "id": "alt",
          "label": "Error vs. GT",
          "left": "assets/showcase/sam_vit_h__uhrsd_003365__iso_encoder_2k/alt_left.jpg",
          "right": "assets/showcase/sam_vit_h__uhrsd_003365__iso_encoder_2k/alt_right.jpg",
          "isZoom": false,
          "desc": "Pixel-level error map vs. ground truth (or instance label map for AMG)."
        },
        {
          "id": "boundary",
          "label": "Boundary vs. GT",
          "left": "assets/showcase/sam_vit_h__uhrsd_003365__iso_encoder_2k/boundary_left.png",
          "right": "assets/showcase/sam_vit_h__uhrsd_003365__iso_encoder_2k/boundary_right.png",
          "isZoom": false,
          "desc": "Contour comparison against ground-truth object boundaries (cyan = GT, magenta = predicted) exposing thin spoke & lattice precision."
        },
        {
          "id": "zoom1",
          "label": "Detail Zoom #1",
          "left": "assets/showcase/sam_vit_h__uhrsd_003365__iso_encoder_2k/zoom1_left.jpg",
          "right": "assets/showcase/sam_vit_h__uhrsd_003365__iso_encoder_2k/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop highlighting razor-thin edges, spokes, and fine cutouts."
        },
        {
          "id": "zoom2",
          "label": "Detail Zoom #2",
          "left": "assets/showcase/sam_vit_h__uhrsd_003365__iso_encoder_2k/zoom2_left.jpg",
          "right": "assets/showcase/sam_vit_h__uhrsd_003365__iso_encoder_2k/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop highlighting razor-thin edges, spokes, and fine cutouts."
        }
      ],
      "thumb": "assets/showcase/sam_vit_h__uhrsd_003365__iso_encoder_2k/thumb.jpg",
      "shortTitle": "Beach Duo",
      "shortMeta": "SAM ViT-H · 2K",
      "chip": "+0.26 B-IoU",
      "defaultView": "main"
    },
    "sam_vit_h__dis_bench__iso_encoder_2k": {
      "id": "sam_vit_h__dis_bench__iso_encoder_2k",
      "track": "sam",
      "pill": "SAM ViT-H · Ornate Bench (+0.17 B-IoU)",
      "backbone": "SAM ViT-H",
      "gpu": "NVIDIA H200",
      "lTitle": "Exact SAM (Official) · 2048×2048",
      "lSub": "254 ms · B-IoU 0.742",
      "rTitle": "MEROS r=8 · 2816×2816",
      "rSub": "253 ms · B-IoU 0.915 (+0.172)",
      "resVal": "1.89× pixels",
      "resSub": "2048×2048 → 2816×2816",
      "timeVal": "254 ms → 253 ms",
      "timeSub": "MEROS matches latency on NVIDIA H200 (BF16)",
      "qualLabel": "Boundary IoU Gain",
      "qualVal": "0.742 → 0.915",
      "qualSub": "+0.172 Boundary IoU at equal/lower time",
      "refLabel": "Same-Res SAM @ 2816×2816",
      "refVal": "2.89× faster",
      "refSub": "730 ms Exact → 253 ms MEROS · 99.2% mask IoU",
      "inputUrl": "assets/showcase/sam_vit_h__dis_bench__iso_encoder_2k/input.jpg",
      "inputCaption": "Box-prompted SAM ViT-H, thin-structure object (DIS-VD): Exact 2048 px vs. MEROS 2816 px: Original input photograph (NVIDIA H200, BF16). Same box prompt (GT bounding box). Image-encoder latency only, NVIDIA H200, batch 1, BF16 encoder. MEROS encodes 1.89x more pixels in 253 ms vs 254 ms; boundary IoU 0.742 -> 0.915, IoU 0.778 -> 0.916 at the original resolution.",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Mask Overlay",
          "left": "assets/showcase/sam_vit_h__dis_bench__iso_encoder_2k/main_left.jpg",
          "right": "assets/showcase/sam_vit_h__dis_bench__iso_encoder_2k/main_right.jpg",
          "isZoom": false,
          "desc": "Predicted segmentation masks overlaid directly on the input photograph."
        },
        {
          "id": "alt",
          "label": "Error vs. GT",
          "left": "assets/showcase/sam_vit_h__dis_bench__iso_encoder_2k/alt_left.jpg",
          "right": "assets/showcase/sam_vit_h__dis_bench__iso_encoder_2k/alt_right.jpg",
          "isZoom": false,
          "desc": "Pixel-level error map vs. ground truth (or instance label map for AMG)."
        },
        {
          "id": "boundary",
          "label": "Boundary vs. GT",
          "left": "assets/showcase/sam_vit_h__dis_bench__iso_encoder_2k/boundary_left.png",
          "right": "assets/showcase/sam_vit_h__dis_bench__iso_encoder_2k/boundary_right.png",
          "isZoom": false,
          "desc": "Contour comparison against ground-truth object boundaries (cyan = GT, magenta = predicted) exposing thin spoke & lattice precision."
        },
        {
          "id": "zoom1",
          "label": "Detail Zoom #1",
          "left": "assets/showcase/sam_vit_h__dis_bench__iso_encoder_2k/zoom1_left.jpg",
          "right": "assets/showcase/sam_vit_h__dis_bench__iso_encoder_2k/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop highlighting razor-thin edges, spokes, and fine cutouts."
        },
        {
          "id": "zoom2",
          "label": "Detail Zoom #2",
          "left": "assets/showcase/sam_vit_h__dis_bench__iso_encoder_2k/zoom2_left.jpg",
          "right": "assets/showcase/sam_vit_h__dis_bench__iso_encoder_2k/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop highlighting razor-thin edges, spokes, and fine cutouts."
        }
      ],
      "thumb": "assets/showcase/sam_vit_h__dis_bench__iso_encoder_2k/thumb.jpg",
      "shortTitle": "Ornate Bench",
      "shortMeta": "SAM ViT-H · 2K",
      "chip": "+0.17 B-IoU",
      "defaultView": "main"
    },
    "sam_vit_h__dis_bicycle__iso_encoder_4k": {
      "id": "sam_vit_h__dis_bicycle__iso_encoder_4k",
      "track": "sam",
      "pill": "SAM ViT-H · 4K Bicycle (+0.11 B-IoU)",
      "backbone": "SAM ViT-H",
      "gpu": "NVIDIA H200",
      "lTitle": "Exact SAM (Official) · 3072×3072",
      "lSub": "964 ms · B-IoU 0.704",
      "rTitle": "MEROS r=8 · 4096×4096",
      "rSub": "814 ms · B-IoU 0.817 (+0.113)",
      "resVal": "1.78× pixels",
      "resSub": "3072×3072 → 4096×4096",
      "timeVal": "964 ms → 814 ms",
      "timeSub": "MEROS 1.18× faster on NVIDIA H200 (BF16)",
      "qualLabel": "Boundary IoU Gain",
      "qualVal": "0.704 → 0.817",
      "qualSub": "+0.113 Boundary IoU at equal/lower time",
      "refLabel": "Same-Res SAM @ 4096×4096",
      "refVal": "Official OOM",
      "refSub": "Official Exact OOM (140 GB) · Chunked 2.86 s → 814 ms (3.52×)",
      "inputUrl": "assets/showcase/sam_vit_h__dis_bicycle__iso_encoder_4k/input.jpg",
      "inputCaption": "Box-prompted SAM ViT-H, thin-structure object (DIS-VD): Exact 3072 px vs. MEROS 4096 px: Original input photograph (NVIDIA H200, BF16). Same box prompt (GT bounding box). Image-encoder latency only, NVIDIA H200, batch 1, BF16 encoder. MEROS encodes 1.78x more pixels in 814 ms vs 963 ms; boundary IoU 0.704 -> 0.817, IoU 0.799 -> 0.915 at the original resolution.",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Mask Overlay",
          "left": "assets/showcase/sam_vit_h__dis_bicycle__iso_encoder_4k/main_left.jpg",
          "right": "assets/showcase/sam_vit_h__dis_bicycle__iso_encoder_4k/main_right.jpg",
          "isZoom": false,
          "desc": "Predicted segmentation masks overlaid directly on the input photograph."
        },
        {
          "id": "alt",
          "label": "Error vs. GT",
          "left": "assets/showcase/sam_vit_h__dis_bicycle__iso_encoder_4k/alt_left.jpg",
          "right": "assets/showcase/sam_vit_h__dis_bicycle__iso_encoder_4k/alt_right.jpg",
          "isZoom": false,
          "desc": "Pixel-level error map vs. ground truth (or instance label map for AMG)."
        },
        {
          "id": "boundary",
          "label": "Boundary vs. GT",
          "left": "assets/showcase/sam_vit_h__dis_bicycle__iso_encoder_4k/boundary_left.png",
          "right": "assets/showcase/sam_vit_h__dis_bicycle__iso_encoder_4k/boundary_right.png",
          "isZoom": false,
          "desc": "Contour comparison against ground-truth object boundaries (cyan = GT, magenta = predicted) exposing thin spoke & lattice precision."
        },
        {
          "id": "zoom1",
          "label": "Detail Zoom #1",
          "left": "assets/showcase/sam_vit_h__dis_bicycle__iso_encoder_4k/zoom1_left.jpg",
          "right": "assets/showcase/sam_vit_h__dis_bicycle__iso_encoder_4k/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop highlighting razor-thin edges, spokes, and fine cutouts."
        },
        {
          "id": "zoom2",
          "label": "Detail Zoom #2",
          "left": "assets/showcase/sam_vit_h__dis_bicycle__iso_encoder_4k/zoom2_left.jpg",
          "right": "assets/showcase/sam_vit_h__dis_bicycle__iso_encoder_4k/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop highlighting razor-thin edges, spokes, and fine cutouts."
        }
      ],
      "thumb": "assets/showcase/sam_vit_h__dis_bicycle__iso_encoder_4k/thumb.jpg",
      "shortTitle": "4K Bicycle",
      "shortMeta": "SAM ViT-H · 4K",
      "chip": "+0.11 B-IoU",
      "defaultView": "main"
    },
    "sam_vit_h__dis_sculpture__iso_encoder_4k": {
      "id": "sam_vit_h__dis_sculpture__iso_encoder_4k",
      "track": "sam",
      "pill": "SAM ViT-H · 4K Sculpture (+0.11 B-IoU)",
      "backbone": "SAM ViT-H",
      "gpu": "NVIDIA H200",
      "lTitle": "Exact SAM (Official) · 3072×3072",
      "lSub": "964 ms · B-IoU 0.748",
      "rTitle": "MEROS r=8 · 4096×4096",
      "rSub": "814 ms · B-IoU 0.861 (+0.113)",
      "resVal": "1.78× pixels",
      "resSub": "3072×3072 → 4096×4096",
      "timeVal": "964 ms → 814 ms",
      "timeSub": "MEROS 1.18× faster on NVIDIA H200 (BF16)",
      "qualLabel": "Boundary IoU Gain",
      "qualVal": "0.748 → 0.861",
      "qualSub": "+0.113 Boundary IoU at equal/lower time",
      "refLabel": "Same-Res SAM @ 4096×4096",
      "refVal": "Official OOM",
      "refSub": "Official Exact OOM (140 GB) · Chunked 2.86 s → 814 ms (3.52×)",
      "inputUrl": "assets/showcase/sam_vit_h__dis_sculpture__iso_encoder_4k/input.jpg",
      "inputCaption": "Box-prompted SAM ViT-H, thin-structure object (DIS-VD): Exact 3072 px vs. MEROS 4096 px: Original input photograph (NVIDIA H200, BF16). Same box prompt (GT bounding box). Image-encoder latency only, NVIDIA H200, batch 1, BF16 encoder. MEROS encodes 1.78x more pixels in 814 ms vs 963 ms; boundary IoU 0.748 -> 0.861, IoU 0.765 -> 0.861 at the original resolution.",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Mask Overlay",
          "left": "assets/showcase/sam_vit_h__dis_sculpture__iso_encoder_4k/main_left.jpg",
          "right": "assets/showcase/sam_vit_h__dis_sculpture__iso_encoder_4k/main_right.jpg",
          "isZoom": false,
          "desc": "Predicted segmentation masks overlaid directly on the input photograph."
        },
        {
          "id": "alt",
          "label": "Error vs. GT",
          "left": "assets/showcase/sam_vit_h__dis_sculpture__iso_encoder_4k/alt_left.jpg",
          "right": "assets/showcase/sam_vit_h__dis_sculpture__iso_encoder_4k/alt_right.jpg",
          "isZoom": false,
          "desc": "Pixel-level error map vs. ground truth (or instance label map for AMG)."
        },
        {
          "id": "boundary",
          "label": "Boundary vs. GT",
          "left": "assets/showcase/sam_vit_h__dis_sculpture__iso_encoder_4k/boundary_left.png",
          "right": "assets/showcase/sam_vit_h__dis_sculpture__iso_encoder_4k/boundary_right.png",
          "isZoom": false,
          "desc": "Contour comparison against ground-truth object boundaries (cyan = GT, magenta = predicted) exposing thin spoke & lattice precision."
        },
        {
          "id": "zoom1",
          "label": "Detail Zoom #1",
          "left": "assets/showcase/sam_vit_h__dis_sculpture__iso_encoder_4k/zoom1_left.jpg",
          "right": "assets/showcase/sam_vit_h__dis_sculpture__iso_encoder_4k/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop highlighting razor-thin edges, spokes, and fine cutouts."
        },
        {
          "id": "zoom2",
          "label": "Detail Zoom #2",
          "left": "assets/showcase/sam_vit_h__dis_sculpture__iso_encoder_4k/zoom2_left.jpg",
          "right": "assets/showcase/sam_vit_h__dis_sculpture__iso_encoder_4k/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop highlighting razor-thin edges, spokes, and fine cutouts."
        }
      ],
      "thumb": "assets/showcase/sam_vit_h__dis_sculpture__iso_encoder_4k/thumb.jpg",
      "shortTitle": "4K Sculpture",
      "shortMeta": "SAM ViT-H · 4K",
      "chip": "+0.11 B-IoU",
      "defaultView": "main"
    },
    "sam_vit_l__seattle_night__amg_iso_budget": {
      "id": "sam_vit_l__seattle_night__amg_iso_budget",
      "track": "sam",
      "pill": "SAM ViT-L AMG · Seattle (4.1× Masks)",
      "backbone": "SAM ViT-L",
      "gpu": "NVIDIA H200",
      "lTitle": "Exact SAM (5 crops) · 5 crops @ 2048 px",
      "lSub": "1.06 s · 585 masks",
      "rTitle": "MEROS r=8 (21 crops) · 21 crops @ 1536 px",
      "rSub": "874 ms · 2,374 masks (4.1×)",
      "resVal": "2.36× pixels",
      "resSub": "5 crops @ 2048 px → 21 crops @ 1536 px",
      "timeVal": "1.06 s → 874 ms",
      "timeSub": "MEROS 1.22× faster on NVIDIA H200 (BF16)",
      "qualLabel": "Objects Segmented (AMG)",
      "qualVal": "585 → 2,374",
      "qualSub": "4.1× more masks in less encoder time",
      "refLabel": "Same-Res SAM @ 2048 px",
      "refVal": "2.44× faster",
      "refSub": "212 ms → 87 ms per 2K crop",
      "inputUrl": "assets/showcase/sam_vit_l__seattle_night__amg_iso_budget/input.jpg",
      "inputCaption": "SAM ViT-L segment-everything, same encoder budget: Exact 5 crops vs. MEROS 21 crops: Original input photograph (NVIDIA H200, BF16). Equal image-encoder budget (NVIDIA H200, batch 1, BF16 encoder): Exact runs the official AMG crop pyramid 1+4 at 2048 px (1061 ms of encoder time), MEROS 1+4+16 at 1536 px (874 ms). iso_latency_ratio = total Exact / total MEROS encoder time; pixel_gain = total encoded pixels (crops x S^2) ratio. Masks: 585 -> 2374. Decoder / post-processing time is not part of the budget. Same AMG thresholds both sides; colours follow mask rank by area (same rule both sides).",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Mask Overlay",
          "left": "assets/showcase/sam_vit_l__seattle_night__amg_iso_budget/main_left.jpg",
          "right": "assets/showcase/sam_vit_l__seattle_night__amg_iso_budget/main_right.jpg",
          "isZoom": false,
          "desc": "Predicted segmentation masks overlaid directly on the input photograph."
        },
        {
          "id": "alt",
          "label": "Mask Labels",
          "left": "assets/showcase/sam_vit_l__seattle_night__amg_iso_budget/alt_left.png",
          "right": "assets/showcase/sam_vit_l__seattle_night__amg_iso_budget/alt_right.png",
          "isZoom": false,
          "desc": "Pixel-level error map vs. ground truth (or instance label map for AMG)."
        },
        {
          "id": "boundary",
          "label": "Mask Contours",
          "left": "assets/showcase/sam_vit_l__seattle_night__amg_iso_budget/boundary_left.png",
          "right": "assets/showcase/sam_vit_l__seattle_night__amg_iso_budget/boundary_right.png",
          "isZoom": false,
          "desc": "All automatically discovered mask contours (SAM AMG) under an equal time budget: 4× more fine objects resolved."
        },
        {
          "id": "zoom1",
          "label": "Density Zoom #1",
          "left": "assets/showcase/sam_vit_l__seattle_night__amg_iso_budget/zoom1_left.jpg",
          "right": "assets/showcase/sam_vit_l__seattle_night__amg_iso_budget/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop highlighting razor-thin edges, spokes, and fine cutouts."
        },
        {
          "id": "zoom2",
          "label": "Density Zoom #2",
          "left": "assets/showcase/sam_vit_l__seattle_night__amg_iso_budget/zoom2_left.jpg",
          "right": "assets/showcase/sam_vit_l__seattle_night__amg_iso_budget/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop highlighting razor-thin edges, spokes, and fine cutouts."
        }
      ],
      "thumb": "assets/showcase/sam_vit_l__seattle_night__amg_iso_budget/thumb.jpg",
      "shortTitle": "Seattle AMG",
      "shortMeta": "SAM ViT-L · AMG",
      "chip": "4.1× masks",
      "defaultView": "main"
    },
    "vitmatte_b__dragonfly": {
      "id": "vitmatte_b__dragonfly",
      "track": "matting",
      "pill": "ViTMatte-B · Dragonfly Wings (−19% SAD)",
      "backbone": "ViTMatte-B",
      "gpu": "NVIDIA H200",
      "lTitle": "Exact ViTMatte-B · 3072×2048",
      "lSub": "456 ms · SAD 133.4",
      "rTitle": "MEROS r=8 · 4608×3072",
      "rSub": "378 ms · SAD 108.3 (−25.1)",
      "resVal": "2.25× pixels",
      "resSub": "3072×2048 → 4608×3072",
      "timeVal": "456 ms → 378 ms",
      "timeSub": "MEROS 1.21× faster on NVIDIA H200 (BF16)",
      "qualLabel": "Alpha Matte Error (SAD ↓)",
      "qualVal": "133.4 → 108.3",
      "qualSub": "−25.1 SAD (19% lower error)",
      "refLabel": "Same-Res Exact @ 4608×3072",
      "refVal": "Exact OOM",
      "refSub": "Official Exact OOM on 140 GB H200 · MEROS runs in 378 ms (14.7 GB)",
      "inputUrl": "assets/showcase/vitmatte_b__dragonfly/input.jpg",
      "inputCaption": "Dragonfly wings: ViTMatte-B (3072×2048 exact vs. 4608×3072 MEROS): Original input photograph (NVIDIA H200, BF16). 2.2x more pixels at equal or lower latency (456 vs 378 ms); SAD 133.39 -> 108.28.",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Zoom: Error vs. GT (darker = better)",
          "left": "assets/showcase/vitmatte_b__dragonfly/zoom_err_left.jpg",
          "right": "assets/showcase/vitmatte_b__dragonfly/zoom_err_right.jpg",
          "isZoom": true,
          "desc": "Matched-speed native-resolution alpha matte & error comparison (MEROS preserves full global context)."
        },
        {
          "id": "alt",
          "label": "Full Error vs. GT",
          "left": "assets/showcase/vitmatte_b__dragonfly/alt_left.jpg",
          "right": "assets/showcase/vitmatte_b__dragonfly/alt_right.jpg",
          "isZoom": false,
          "desc": "Alternative baseline or full-frame alpha view at native resolution."
        },
        {
          "id": "zoom1",
          "label": "Zoom: Wing Veins Alpha",
          "left": "assets/showcase/vitmatte_b__dragonfly/zoom1_left.jpg",
          "right": "assets/showcase/vitmatte_b__dragonfly/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop of fine translucent strands, spray droplets, or lattice weave."
        },
        {
          "id": "full",
          "label": "Full Alpha Matte",
          "left": "assets/showcase/vitmatte_b__dragonfly/main_left.jpg",
          "right": "assets/showcase/vitmatte_b__dragonfly/main_right.jpg",
          "isZoom": false,
          "desc": "Close-up crop of fine translucent strands, spray droplets, or lattice weave."
        }
      ],
      "thumb": "assets/showcase/vitmatte_b__dragonfly/thumb.jpg",
      "shortTitle": "Dragonfly Wings",
      "shortMeta": "ViTMatte-B · vs. 3K Exact",
      "chip": "2.8× px",
      "defaultView": "main"
    },
    "vitmatte_b__spider_web": {
      "id": "vitmatte_b__spider_web",
      "track": "matting",
      "pill": "5K Spider Web · vs. 3K Exact (−32% SAD)",
      "backbone": "ViTMatte-B",
      "gpu": "NVIDIA H200",
      "lTitle": "Exact ViTMatte-B · 3072×2304",
      "lSub": "581 ms · SAD 167.8",
      "rTitle": "MEROS r=8 · 5120×3840",
      "rSub": "571 ms · SAD 113.9 (−53.8)",
      "resVal": "2.78× pixels",
      "resSub": "3072×2304 → 5120×3840",
      "timeVal": "581 ms → 571 ms",
      "timeSub": "MEROS matches latency on NVIDIA H200 (BF16)",
      "qualLabel": "Alpha Matte Error (SAD ↓)",
      "qualVal": "167.8 → 113.9",
      "qualSub": "−53.8 SAD (32% lower error)",
      "refLabel": "Same-Res Exact @ 5120×3840",
      "refVal": "Exact OOM",
      "refSub": "Official Exact OOM on 140 GB H200 · MEROS runs in 571 ms (19.6 GB)",
      "inputUrl": "assets/showcase/vitmatte_b__spider_web/input.jpg",
      "inputCaption": "Spider web: ViTMatte-B (3072×2304 exact vs. 5120×3840 MEROS): Original input photograph (NVIDIA H200, BF16). 2.8x more pixels at equal or lower latency (581 vs 571 ms); SAD 167.76 -> 113.93.",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Zoom: Error vs. GT (darker = better)",
          "left": "assets/showcase/vitmatte_b__spider_web/zoom_err_left.jpg",
          "right": "assets/showcase/vitmatte_b__spider_web/zoom_err_right.jpg",
          "isZoom": true,
          "desc": "Matched-speed native-resolution alpha matte & error comparison (MEROS preserves full global context)."
        },
        {
          "id": "alt",
          "label": "Full Error vs. GT",
          "left": "assets/showcase/vitmatte_b__spider_web/alt_left.jpg",
          "right": "assets/showcase/vitmatte_b__spider_web/alt_right.jpg",
          "isZoom": false,
          "desc": "Alternative baseline or full-frame alpha view at native resolution."
        },
        {
          "id": "zoom1",
          "label": "Zoom: Web Hub Alpha",
          "left": "assets/showcase/vitmatte_b__spider_web/zoom1_left.jpg",
          "right": "assets/showcase/vitmatte_b__spider_web/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop of fine translucent strands, spray droplets, or lattice weave."
        },
        {
          "id": "full",
          "label": "Full Alpha Matte",
          "left": "assets/showcase/vitmatte_b__spider_web/main_left.jpg",
          "right": "assets/showcase/vitmatte_b__spider_web/main_right.jpg",
          "isZoom": false,
          "desc": "Close-up crop of fine translucent strands, spray droplets, or lattice weave."
        }
      ],
      "thumb": "assets/showcase/vitmatte_b__spider_web/thumb.jpg",
      "shortTitle": "5K Spider Web",
      "shortMeta": "ViTMatte-B · vs. 3K Exact",
      "chip": "−32% SAD",
      "defaultView": "main"
    },
    "depth_anything_v2_l__div8k_plant": {
      "id": "depth_anything_v2_l__div8k_plant",
      "track": "depth",
      "pill": "DepthAnything V2-L · Industrial Plant (2.25× px)",
      "backbone": "Depth Anything V2-L",
      "gpu": "NVIDIA H200",
      "lTitle": "Exact FlashAttention-2 (FA2) · 2240×2240",
      "lSub": "277 ms · 5.0 MP",
      "rTitle": "MEROS r=8 · 3360×3360",
      "rSub": "251 ms · 2.25× pixels",
      "resVal": "2.25× pixels",
      "resSub": "2240×2240 → 3360×3360",
      "timeVal": "277 ms → 251 ms",
      "timeSub": "MEROS 1.10× faster on NVIDIA H200 (BF16)",
      "qualLabel": "Effective Resolution Gain",
      "qualVal": "2.25× pixels",
      "qualSub": "5.0 MP → 11.3 MP",
      "refLabel": "Same-Res Exact FA2 @ 3360×3360",
      "refVal": "4.70× faster",
      "refSub": "1.18 s FA2 → 251 ms MEROS · Vanilla OOM",
      "inputUrl": "assets/showcase/depth_anything_v2_l__div8k_plant/input.jpg",
      "inputCaption": "Industrial plant: Depth Anything V2-L (2240×2240 exact FA2 vs. 3360×3360 MEROS): Original input photograph (NVIDIA H200, BF16). 2.2x more pixels at equal or lower latency (277 vs 251 ms).",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Depth Map",
          "left": "assets/showcase/depth_anything_v2_l__div8k_plant/main_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__div8k_plant/main_right.jpg",
          "isZoom": false,
          "desc": "Native-resolution monocular depth prediction under an identical forward time budget."
        },
        {
          "id": "relief",
          "label": "3D Relief",
          "left": "assets/showcase/depth_anything_v2_l__div8k_plant/relief_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__div8k_plant/relief_right.jpg",
          "isZoom": false,
          "desc": "Shaded 3D depth relief highlighting fine geometric sharpness across ladders, trusses, and railings."
        },
        {
          "id": "normals",
          "label": "Surface Normals",
          "left": "assets/showcase/depth_anything_v2_l__div8k_plant/normals_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__div8k_plant/normals_right.jpg",
          "isZoom": false,
          "desc": "Surface normals derived from native-resolution depth gradients, revealing subtle creases and thin bars."
        },
        {
          "id": "alt",
          "label": "Depth Edges",
          "left": "assets/showcase/depth_anything_v2_l__div8k_plant/alt_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__div8k_plant/alt_right.jpg",
          "isZoom": false,
          "desc": "Depth discontinuity edges revealing crisp separation of thin trusses and bars."
        },
        {
          "id": "zoom1",
          "label": "Zoom: Steel frames",
          "left": "assets/showcase/depth_anything_v2_l__div8k_plant/zoom1_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__div8k_plant/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Close-up depth crop highlighting fine foreground-background separation."
        },
        {
          "id": "zoom2",
          "label": "Zoom: Pipe rack",
          "left": "assets/showcase/depth_anything_v2_l__div8k_plant/zoom2_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__div8k_plant/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Close-up depth crop highlighting fine foreground-background separation."
        }
      ],
      "thumb": "assets/showcase/depth_anything_v2_l__div8k_plant/thumb.jpg",
      "shortTitle": "Industrial Plant",
      "shortMeta": "DepthAnything V2-L",
      "chip": "2.3× px",
      "defaultView": "main"
    },
    "depth_anything_v2_l__scaffold": {
      "id": "depth_anything_v2_l__scaffold",
      "track": "depth",
      "pill": "DepthAnything V2-L · Scaffolding (1.21× faster)",
      "backbone": "Depth Anything V2-L",
      "gpu": "NVIDIA H200",
      "lTitle": "Exact FlashAttention-2 (FA2) · 2016×1344",
      "lSub": "99.8 ms · 2.7 MP",
      "rTitle": "MEROS r=8 · 2688×1792",
      "rSub": "82.5 ms · 1.78× pixels",
      "resVal": "1.78× pixels",
      "resSub": "2016×1344 → 2688×1792",
      "timeVal": "99.8 ms → 82.5 ms",
      "timeSub": "MEROS 1.21× faster on NVIDIA H200 (BF16)",
      "qualLabel": "Effective Resolution Gain",
      "qualVal": "1.78× pixels",
      "qualSub": "2.7 MP → 4.8 MP",
      "refLabel": "Same-Res Exact FA2 @ 2688×1792",
      "refVal": "3.09× faster",
      "refSub": "255 ms FA2 → 82.5 ms MEROS",
      "inputUrl": "assets/showcase/depth_anything_v2_l__scaffold/input.jpg",
      "inputCaption": "Statue under scaffolding: Depth Anything V2-L (2016×1344 exact FA2 vs. 2688×1792 MEROS): Original input photograph (NVIDIA H200, BF16). 1.8x more pixels at equal or lower latency (100 vs 83 ms).",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Depth Map",
          "left": "assets/showcase/depth_anything_v2_l__scaffold/main_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__scaffold/main_right.jpg",
          "isZoom": false,
          "desc": "Native-resolution monocular depth prediction under an identical forward time budget."
        },
        {
          "id": "relief",
          "label": "3D Relief",
          "left": "assets/showcase/depth_anything_v2_l__scaffold/relief_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__scaffold/relief_right.jpg",
          "isZoom": false,
          "desc": "Shaded 3D depth relief highlighting fine geometric sharpness across ladders, trusses, and railings."
        },
        {
          "id": "normals",
          "label": "Surface Normals",
          "left": "assets/showcase/depth_anything_v2_l__scaffold/normals_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__scaffold/normals_right.jpg",
          "isZoom": false,
          "desc": "Surface normals derived from native-resolution depth gradients, revealing subtle creases and thin bars."
        },
        {
          "id": "alt",
          "label": "Depth Edges",
          "left": "assets/showcase/depth_anything_v2_l__scaffold/alt_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__scaffold/alt_right.jpg",
          "isZoom": false,
          "desc": "Depth discontinuity edges revealing crisp separation of thin trusses and bars."
        },
        {
          "id": "zoom1",
          "label": "Zoom: Tubes",
          "left": "assets/showcase/depth_anything_v2_l__scaffold/zoom1_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__scaffold/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Close-up depth crop highlighting fine foreground-background separation."
        },
        {
          "id": "zoom2",
          "label": "Zoom: Head behind the bars",
          "left": "assets/showcase/depth_anything_v2_l__scaffold/zoom2_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__scaffold/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Close-up depth crop highlighting fine foreground-background separation."
        }
      ],
      "thumb": "assets/showcase/depth_anything_v2_l__scaffold/thumb.jpg",
      "shortTitle": "Scaffolding",
      "shortMeta": "DepthAnything V2-L",
      "chip": "1.8× px",
      "defaultView": "main"
    },
    "depth_anything_v2_l__seattle_night": {
      "id": "depth_anything_v2_l__seattle_night",
      "track": "depth",
      "pill": "DepthAnything V2-L · Space Needle (4K)",
      "backbone": "Depth Anything V2-L",
      "gpu": "NVIDIA H200",
      "lTitle": "Exact FlashAttention-2 (FA2) · 2688×1792",
      "lSub": "253 ms · 4.8 MP",
      "rTitle": "MEROS r=8 · 4032×2688",
      "rSub": "233 ms · 2.25× pixels",
      "resVal": "2.25× pixels",
      "resSub": "2688×1792 → 4032×2688",
      "timeVal": "253 ms → 233 ms",
      "timeSub": "MEROS 1.09× faster on NVIDIA H200 (BF16)",
      "qualLabel": "Effective Resolution Gain",
      "qualVal": "2.25× pixels",
      "qualSub": "4.8 MP → 10.8 MP",
      "refLabel": "Same-Res Exact FA2 @ 4032×2688",
      "refVal": "4.69× faster",
      "refSub": "1.09 s FA2 → 233 ms MEROS · Vanilla OOM",
      "inputUrl": "assets/showcase/depth_anything_v2_l__seattle_night/input.jpg",
      "inputCaption": "Space Needle at night: Depth Anything V2-L (2688×1792 exact FA2 vs. 4032×2688 MEROS): Original input photograph (NVIDIA H200, BF16). 2.2x more pixels at equal or lower latency (253 vs 233 ms).",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Depth Map",
          "left": "assets/showcase/depth_anything_v2_l__seattle_night/main_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__seattle_night/main_right.jpg",
          "isZoom": false,
          "desc": "Native-resolution monocular depth prediction under an identical forward time budget."
        },
        {
          "id": "relief",
          "label": "3D Relief",
          "left": "assets/showcase/depth_anything_v2_l__seattle_night/relief_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__seattle_night/relief_right.jpg",
          "isZoom": false,
          "desc": "Shaded 3D depth relief highlighting fine geometric sharpness across ladders, trusses, and railings."
        },
        {
          "id": "normals",
          "label": "Surface Normals",
          "left": "assets/showcase/depth_anything_v2_l__seattle_night/normals_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__seattle_night/normals_right.jpg",
          "isZoom": false,
          "desc": "Surface normals derived from native-resolution depth gradients, revealing subtle creases and thin bars."
        },
        {
          "id": "alt",
          "label": "Depth Edges",
          "left": "assets/showcase/depth_anything_v2_l__seattle_night/alt_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__seattle_night/alt_right.jpg",
          "isZoom": false,
          "desc": "Depth discontinuity edges revealing crisp separation of thin trusses and bars."
        },
        {
          "id": "zoom1",
          "label": "Zoom: Needle top",
          "left": "assets/showcase/depth_anything_v2_l__seattle_night/zoom1_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__seattle_night/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Close-up depth crop highlighting fine foreground-background separation."
        },
        {
          "id": "zoom2",
          "label": "Zoom: Skyline",
          "left": "assets/showcase/depth_anything_v2_l__seattle_night/zoom2_left.jpg",
          "right": "assets/showcase/depth_anything_v2_l__seattle_night/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Close-up depth crop highlighting fine foreground-background separation."
        }
      ],
      "thumb": "assets/showcase/depth_anything_v2_l__seattle_night/thumb.jpg",
      "shortTitle": "Space Needle 4K",
      "shortMeta": "DepthAnything V2-L",
      "chip": "2.3× px",
      "defaultView": "main"
    },
    "dinov3_b__uavid__seq18_000800__iso_fa2": {
      "id": "dinov3_b__uavid__seq18_000800__iso_fa2",
      "track": "seg",
      "pill": "UAVid Highway · vs. FA2 (+5.0 mIoU)",
      "backbone": "DINOv3-B",
      "gpu": "NVIDIA H200",
      "lTitle": "Exact FlashAttention-2 (FA2) · 3328×2048",
      "lSub": "112 ms · mIoU 55.3",
      "rTitle": "MEROS r=8 · 3840×2160",
      "rSub": "78.0 ms · mIoU 60.3 (+5.0)",
      "resVal": "1.22× pixels",
      "resSub": "3328×2048 → 3840×2160",
      "timeVal": "112 ms → 78.0 ms",
      "timeSub": "MEROS 1.44× faster on NVIDIA H200 (BF16)",
      "qualLabel": "4K Semantic mIoU Gain",
      "qualVal": "55.3 → 60.3",
      "qualSub": "+5.03 mIoU · 1.22× pixels",
      "refLabel": "Same-Res Exact FA2 @ 3840×2160",
      "refVal": "3.81× faster",
      "refSub": "297 ms FA2 → 78.0 ms MEROS · Vanilla 2.91 s",
      "inputUrl": "assets/showcase/dinov3_b__uavid__seq18_000800__iso_fa2/input.jpg",
      "inputCaption": "UAVid aerial seq18_000800: DINOv3-B segmentation (3328×1872 Exact FA2 vs. native 3840×2160 MEROS): Original input photograph (NVIDIA H200, BF16). 1.3× more photo pixels, 1.44× the speed of Exact FA2; mIoU 55.3 → 60.3; car IoU (static / moving) 59.3 / 72.2 → 60.4 / 71.0.",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Mask Overlay",
          "left": "assets/showcase/dinov3_b__uavid__seq18_000800__iso_fa2/main_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq18_000800__iso_fa2/main_right.jpg",
          "isZoom": false,
          "desc": "4K aerial semantic segmentation overlay across buildings, roads, trees, and vehicles."
        },
        {
          "id": "small_classes",
          "label": "Small Objects (Cars)",
          "left": "assets/showcase/dinov3_b__uavid__seq18_000800__iso_fa2/small_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq18_000800__iso_fa2/small_right.jpg",
          "isZoom": false,
          "desc": "Moving cars (cyan) and static cars (magenta) highlighted over grayscale 4K drone imagery: individual distant vehicles separate cleanly."
        },
        {
          "id": "alt",
          "label": "Error vs. GT",
          "left": "assets/showcase/dinov3_b__uavid__seq18_000800__iso_fa2/alt_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq18_000800__iso_fa2/alt_right.jpg",
          "isZoom": false,
          "desc": "Per-pixel segmentation error map against UAVid ground-truth annotations."
        },
        {
          "id": "zoom1",
          "label": "Zoom: Traffic 1",
          "left": "assets/showcase/dinov3_b__uavid__seq18_000800__iso_fa2/zoom1_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq18_000800__iso_fa2/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop of distant vehicles and pedestrians at native 4K resolution."
        },
        {
          "id": "zoom2",
          "label": "Zoom: Traffic 2",
          "left": "assets/showcase/dinov3_b__uavid__seq18_000800__iso_fa2/zoom2_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq18_000800__iso_fa2/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop of distant vehicles and pedestrians at native 4K resolution."
        }
      ],
      "thumb": "assets/showcase/dinov3_b__uavid__seq18_000800__iso_fa2/thumb.jpg",
      "shortTitle": "UAVid Highway",
      "shortMeta": "DINOv3-B · vs. FA2",
      "chip": "+5.0 mIoU",
      "defaultView": "main"
    },
    "dinov3_b__uavid__seq18_000100__iso_vanilla": {
      "id": "dinov3_b__uavid__seq18_000100__iso_vanilla",
      "track": "seg",
      "pill": "UAVid Avenue · Vanilla (+4.2)",
      "backbone": "DINOv3-B",
      "gpu": "NVIDIA H200",
      "lTitle": "Vanilla Attention · 1536×1024",
      "lSub": "86.9 ms · mIoU 54.5",
      "rTitle": "MEROS r=8 · 3840×2160",
      "rSub": "78.0 ms · mIoU 58.6 (+4.1)",
      "resVal": "5.27× pixels",
      "resSub": "1536×1024 → 3840×2160",
      "timeVal": "86.9 ms → 78.0 ms",
      "timeSub": "MEROS 1.11× faster on NVIDIA H200 (BF16)",
      "qualLabel": "4K Semantic mIoU Gain",
      "qualVal": "54.5 → 58.6",
      "qualSub": "+4.15 mIoU · 5.27× pixels",
      "refLabel": "Same-Res Exact FA2 @ 3840×2160",
      "refVal": "3.81× faster",
      "refSub": "297 ms FA2 → 78.0 ms MEROS · Vanilla 2.91 s",
      "inputUrl": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_vanilla/input.jpg",
      "inputCaption": "UAVid aerial seq18_000100: DINOv3-B segmentation (1536×864 Vanilla attention vs. native 3840×2160 MEROS): Original input photograph (NVIDIA H200, BF16). 6.2× more photo pixels, 1.11× the speed of Vanilla attention; mIoU 54.5 → 58.6; car IoU (static / moving) 38.6 / 45.6 → 47.2 / 60.2.",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Mask Overlay",
          "left": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_vanilla/main_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_vanilla/main_right.jpg",
          "isZoom": false,
          "desc": "4K aerial semantic segmentation overlay across buildings, roads, trees, and vehicles."
        },
        {
          "id": "small_classes",
          "label": "Small Objects (Cars)",
          "left": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_vanilla/small_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_vanilla/small_right.jpg",
          "isZoom": false,
          "desc": "Moving cars (cyan) and static cars (magenta) highlighted over grayscale 4K drone imagery: individual distant vehicles separate cleanly."
        },
        {
          "id": "alt",
          "label": "Error vs. GT",
          "left": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_vanilla/alt_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_vanilla/alt_right.jpg",
          "isZoom": false,
          "desc": "Per-pixel segmentation error map against UAVid ground-truth annotations."
        },
        {
          "id": "zoom1",
          "label": "Zoom: Traffic 1",
          "left": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_vanilla/zoom1_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_vanilla/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop of distant vehicles and pedestrians at native 4K resolution."
        },
        {
          "id": "zoom2",
          "label": "Zoom: Traffic 2",
          "left": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_vanilla/zoom2_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_vanilla/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop of distant vehicles and pedestrians at native 4K resolution."
        }
      ],
      "thumb": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_vanilla/thumb.jpg",
      "shortTitle": "UAVid Avenue",
      "shortMeta": "DINOv3-B · vs. Vanilla",
      "chip": "+4.2 mIoU",
      "defaultView": "main"
    },
    "dinov3_b__uavid__seq18_000100__iso_fa2": {
      "id": "dinov3_b__uavid__seq18_000100__iso_fa2",
      "track": "seg",
      "pill": "UAVid Avenue · FA2 (+4.2)",
      "backbone": "DINOv3-B",
      "gpu": "NVIDIA H200",
      "lTitle": "Exact FlashAttention-2 (FA2) · 3328×2048",
      "lSub": "112 ms · mIoU 54.4",
      "rTitle": "MEROS r=8 · 3840×2160",
      "rSub": "78.0 ms · mIoU 58.6 (+4.2)",
      "resVal": "1.22× pixels",
      "resSub": "3328×2048 → 3840×2160",
      "timeVal": "112 ms → 78.0 ms",
      "timeSub": "MEROS 1.44× faster on NVIDIA H200 (BF16)",
      "qualLabel": "4K Semantic mIoU Gain",
      "qualVal": "54.4 → 58.6",
      "qualSub": "+4.22 mIoU · 1.22× pixels",
      "refLabel": "Same-Res Exact FA2 @ 3840×2160",
      "refVal": "3.81× faster",
      "refSub": "297 ms FA2 → 78.0 ms MEROS · Vanilla 2.91 s",
      "inputUrl": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_fa2/input.jpg",
      "inputCaption": "UAVid aerial seq18_000100: DINOv3-B segmentation (3328×1872 Exact FA2 vs. native 3840×2160 MEROS): Original input photograph (NVIDIA H200, BF16). 1.3× more photo pixels, 1.44× the speed of Exact FA2; mIoU 54.4 → 58.6; car IoU (static / moving) 45.2 / 56.3 → 47.2 / 60.2.",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Mask Overlay",
          "left": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_fa2/main_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_fa2/main_right.jpg",
          "isZoom": false,
          "desc": "4K aerial semantic segmentation overlay across buildings, roads, trees, and vehicles."
        },
        {
          "id": "small_classes",
          "label": "Small Objects (Cars)",
          "left": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_fa2/small_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_fa2/small_right.jpg",
          "isZoom": false,
          "desc": "Moving cars (cyan) and static cars (magenta) highlighted over grayscale 4K drone imagery: individual distant vehicles separate cleanly."
        },
        {
          "id": "alt",
          "label": "Error vs. GT",
          "left": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_fa2/alt_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_fa2/alt_right.jpg",
          "isZoom": false,
          "desc": "Per-pixel segmentation error map against UAVid ground-truth annotations."
        },
        {
          "id": "zoom1",
          "label": "Zoom: Traffic 1",
          "left": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_fa2/zoom1_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_fa2/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop of distant vehicles and pedestrians at native 4K resolution."
        },
        {
          "id": "zoom2",
          "label": "Zoom: Traffic 2",
          "left": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_fa2/zoom2_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_fa2/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop of distant vehicles and pedestrians at native 4K resolution."
        }
      ],
      "thumb": "assets/showcase/dinov3_b__uavid__seq18_000100__iso_fa2/thumb.jpg",
      "shortTitle": "UAVid Avenue",
      "shortMeta": "DINOv3-B · vs. FA2",
      "chip": "+4.2 mIoU",
      "defaultView": "main"
    },
    "dinov3_b__uavid__seq16_000000__iso_vanilla": {
      "id": "dinov3_b__uavid__seq16_000000__iso_vanilla",
      "track": "seg",
      "pill": "UAVid Plaza · Vanilla (+2.9)",
      "backbone": "DINOv3-B",
      "gpu": "NVIDIA H200",
      "lTitle": "Vanilla Attention · 1536×1024",
      "lSub": "86.9 ms · mIoU 50.9",
      "rTitle": "MEROS r=8 · 3840×2160",
      "rSub": "78.0 ms · mIoU 53.8 (+2.9)",
      "resVal": "5.27× pixels",
      "resSub": "1536×1024 → 3840×2160",
      "timeVal": "86.9 ms → 78.0 ms",
      "timeSub": "MEROS 1.11× faster on NVIDIA H200 (BF16)",
      "qualLabel": "4K Semantic mIoU Gain",
      "qualVal": "50.9 → 53.8",
      "qualSub": "+2.92 mIoU · 5.27× pixels",
      "refLabel": "Same-Res Exact FA2 @ 3840×2160",
      "refVal": "3.81× faster",
      "refSub": "297 ms FA2 → 78.0 ms MEROS · Vanilla 2.91 s",
      "inputUrl": "assets/showcase/dinov3_b__uavid__seq16_000000__iso_vanilla/input.jpg",
      "inputCaption": "UAVid aerial seq16_000000: DINOv3-B segmentation (1536×864 Vanilla attention vs. native 3840×2160 MEROS): Original input photograph (NVIDIA H200, BF16). 6.2× more photo pixels, 1.11× the speed of Vanilla attention; mIoU 50.9 → 53.8; car IoU (static / moving) 48.0 / 15.9 → 50.9 / 22.9.",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Mask Overlay",
          "left": "assets/showcase/dinov3_b__uavid__seq16_000000__iso_vanilla/main_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq16_000000__iso_vanilla/main_right.jpg",
          "isZoom": false,
          "desc": "4K aerial semantic segmentation overlay across buildings, roads, trees, and vehicles."
        },
        {
          "id": "small_classes",
          "label": "Small Objects (Cars)",
          "left": "assets/showcase/dinov3_b__uavid__seq16_000000__iso_vanilla/small_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq16_000000__iso_vanilla/small_right.jpg",
          "isZoom": false,
          "desc": "Moving cars (cyan) and static cars (magenta) highlighted over grayscale 4K drone imagery: individual distant vehicles separate cleanly."
        },
        {
          "id": "alt",
          "label": "Error vs. GT",
          "left": "assets/showcase/dinov3_b__uavid__seq16_000000__iso_vanilla/alt_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq16_000000__iso_vanilla/alt_right.jpg",
          "isZoom": false,
          "desc": "Per-pixel segmentation error map against UAVid ground-truth annotations."
        },
        {
          "id": "zoom1",
          "label": "Zoom: Traffic 1",
          "left": "assets/showcase/dinov3_b__uavid__seq16_000000__iso_vanilla/zoom1_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq16_000000__iso_vanilla/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop of distant vehicles and pedestrians at native 4K resolution."
        },
        {
          "id": "zoom2",
          "label": "Zoom: Traffic 2",
          "left": "assets/showcase/dinov3_b__uavid__seq16_000000__iso_vanilla/zoom2_left.jpg",
          "right": "assets/showcase/dinov3_b__uavid__seq16_000000__iso_vanilla/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop of distant vehicles and pedestrians at native 4K resolution."
        }
      ],
      "thumb": "assets/showcase/dinov3_b__uavid__seq16_000000__iso_vanilla/thumb.jpg",
      "shortTitle": "UAVid Plaza",
      "shortMeta": "DINOv3-B · vs. Vanilla",
      "chip": "+2.9 mIoU",
      "defaultView": "main"
    },
    "vitmatte_b__beer_splash": {
      "id": "vitmatte_b__beer_splash",
      "track": "matting",
      "pill": "Beer Glass Splash (−80% SAD · 2.1× faster)",
      "backbone": "ViTMatte-B",
      "gpu": "NVIDIA H200",
      "lTitle": "MEMatte-B · 1080×1620",
      "lSub": "158 ms · SAD 428.2",
      "rTitle": "MEROS r=8 · 1080×1620",
      "rSub": "75.7 ms · SAD 87.4",
      "resVal": "1080 × 1620 px",
      "resSub": "AIM-500 Transparent Glass · Same native input",
      "timeVal": "158 ms → 75.7 ms",
      "timeSub": "MEROS 2.09× faster than MEMatte-B (NVIDIA H200)",
      "qualLabel": "Alpha Matte Error (SAD ↓)",
      "qualVal": "428.2 → 87.4",
      "qualSub": "−340.8 SAD (4.9× lower error · crystal-clear splash)",
      "refLabel": "Same-Res Exact ViTMatte-B",
      "refVal": "2.29× faster",
      "refSub": "174 ms Exact (SAD 85.8) → 75.7 ms MEROS (SAD 87.4)",
      "inputUrl": "assets/showcase/vitmatte_b__beer_splash/input.jpg",
      "inputCaption": "AIM-500 Beer Glass Splash (1080×1620): MEMatte-B blows out the transparent mug & splash (SAD 428.2 in 158 ms), while ViTMatte-B + MEROS r=8 preserves every glass facet & droplet (SAD 87.4 in 75.7 ms, 2.09× faster than MEMatte-B and 2.29× faster than Exact ViTMatte-B).",
      "isSquare": false,
      "isPortrait": true,
      "views": [
        {
          "id": "main",
          "label": "vs. MEMatte-B (158 ms)",
          "left": "assets/showcase/vitmatte_b__beer_splash/main_left.jpg",
          "right": "assets/showcase/vitmatte_b__beer_splash/main_right.jpg",
          "isZoom": false,
          "desc": "Matched-speed native-resolution alpha matte & error comparison (MEROS preserves full global context)."
        },
        {
          "id": "alt",
          "label": "vs. MEMatte-S (87 ms)",
          "left": "assets/showcase/vitmatte_b__beer_splash/alt_left.jpg",
          "right": "assets/showcase/vitmatte_b__beer_splash/alt_right.jpg",
          "isZoom": false,
          "lTitle": "MEMatte-S · 1080×1620",
          "lSub": "86.8 ms · SAD 287.3",
          "rSub": "75.7 ms · SAD 87.4",
          "desc": "Alternative baseline or full-frame alpha view at native resolution."
        },
        {
          "id": "zoom1",
          "label": "Zoom: Mug & Splash",
          "left": "assets/showcase/vitmatte_b__beer_splash/zoom1_left.jpg",
          "right": "assets/showcase/vitmatte_b__beer_splash/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop of fine translucent strands, spray droplets, or lattice weave."
        }
      ],
      "thumb": "assets/showcase/vitmatte_b__beer_splash/thumb.jpg",
      "shortTitle": "Beer Glass Splash",
      "shortMeta": "ViTMatte-B · vs. MEMatte",
      "chip": "−80% SAD",
      "defaultView": "main"
    },
    "vitmatte_b__wicker_chair": {
      "id": "vitmatte_b__wicker_chair",
      "track": "matting",
      "pill": "Wicker Lattice Chair (−38% SAD · 2.0× faster)",
      "backbone": "ViTMatte-B",
      "gpu": "NVIDIA H200",
      "lTitle": "MEMatte-B · 1080×1619",
      "lSub": "149 ms · SAD 45.8",
      "rTitle": "MEROS r=8 · 1080×1619",
      "rSub": "75.7 ms · SAD 28.5",
      "resVal": "1080 × 1619 px",
      "resSub": "AIM-500 Wicker Lattice · Same native input",
      "timeVal": "149 ms → 75.7 ms",
      "timeSub": "MEROS 1.97× faster than MEMatte-B (NVIDIA H200)",
      "qualLabel": "Alpha Matte Error (SAD ↓)",
      "qualVal": "45.8 → 28.5",
      "qualSub": "−17.4 SAD (every diamond lattice hole kept open)",
      "refLabel": "Same-Res Exact ViTMatte-B",
      "refVal": "2.31× faster",
      "refSub": "175 ms Exact (SAD 28.5) → 75.7 ms MEROS (SAD 28.5)",
      "inputUrl": "assets/showcase/vitmatte_b__wicker_chair/input.jpg",
      "inputCaption": "AIM-500 Wicker Lattice Chair (1080×1619): MEMatte-B clogs the wicker backrest with opaque white artifacts (SAD 45.8 in 149 ms), while ViTMatte-B + MEROS r=8 matches Exact ViTMatte-B (SAD 28.5 vs. 28.5) in 75.7 ms (1.97× faster than MEMatte-B, 2.31× faster than Exact).",
      "isSquare": false,
      "isPortrait": true,
      "views": [
        {
          "id": "main",
          "label": "Zoom: Wicker Backrest",
          "left": "assets/showcase/vitmatte_b__wicker_chair/zoom1_left.jpg",
          "right": "assets/showcase/vitmatte_b__wicker_chair/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Matched-speed native-resolution alpha matte & error comparison (MEROS preserves full global context)."
        },
        {
          "id": "alt",
          "label": "Full Chair Alpha",
          "left": "assets/showcase/vitmatte_b__wicker_chair/main_left.jpg",
          "right": "assets/showcase/vitmatte_b__wicker_chair/main_right.jpg",
          "isZoom": false,
          "desc": "Alternative baseline or full-frame alpha view at native resolution."
        }
      ],
      "thumb": "assets/showcase/vitmatte_b__wicker_chair/thumb.jpg",
      "shortTitle": "Wicker Lattice Chair",
      "shortMeta": "ViTMatte-B · vs. MEMatte",
      "chip": "−38% SAD",
      "defaultView": "main"
    },
    "sam_vit_h__uhrsd_002111__iso_encoder_2k": {
      "id": "sam_vit_h__uhrsd_002111__iso_encoder_2k",
      "track": "sam",
      "pill": "SAM ViT-H · Bear Family (+0.28 B-IoU)",
      "backbone": "SAM ViT-H",
      "gpu": "NVIDIA H200",
      "lTitle": "Exact SAM (Official) · 2048×2048",
      "lSub": "254 ms · B-IoU 0.527",
      "rTitle": "MEROS r=8 · 2816×2816",
      "rSub": "253 ms · B-IoU 0.804 (+0.277)",
      "resVal": "1.89× pixels",
      "resSub": "2048×2048 → 2816×2816",
      "timeVal": "254 ms → 253 ms",
      "timeSub": "MEROS matches latency on NVIDIA H200 (BF16)",
      "qualLabel": "Boundary IoU Gain",
      "qualVal": "0.527 → 0.804",
      "qualSub": "+0.277 Boundary IoU (IoU 0.699 → 0.966)",
      "refLabel": "Same-Res SAM @ 2816×2816",
      "refVal": "2.89× faster",
      "refSub": "730 ms Exact → 253 ms MEROS · 99.6% mask IoU",
      "inputUrl": "assets/showcase/sam_vit_h__uhrsd_002111__iso_encoder_2k/input.jpg",
      "inputCaption": "Box-prompted SAM ViT-H, wildlife group (UHRSD): Exact 2048 px vs. MEROS 2816 px: Original input photograph (NVIDIA H200, BF16). Same GT bounding box prompt. MEROS encodes 1.89x more pixels in 253 ms vs. 254 ms, recovering both bear cubs (Boundary IoU 0.527 -> 0.804, mask IoU 0.699 -> 0.966).",
      "isSquare": false,
      "views": [
        {
          "id": "main",
          "label": "Mask Overlay",
          "left": "assets/showcase/sam_vit_h__uhrsd_002111__iso_encoder_2k/main_left.jpg",
          "right": "assets/showcase/sam_vit_h__uhrsd_002111__iso_encoder_2k/main_right.jpg",
          "isZoom": false,
          "desc": "Predicted segmentation masks overlaid directly on the photo (Exact misses both bear cubs; MEROS segments the entire family)."
        },
        {
          "id": "alt",
          "label": "Error vs. GT",
          "left": "assets/showcase/sam_vit_h__uhrsd_002111__iso_encoder_2k/alt_left.jpg",
          "right": "assets/showcase/sam_vit_h__uhrsd_002111__iso_encoder_2k/alt_right.jpg",
          "isZoom": false,
          "desc": "Pixel-level error vs. ground truth (green = correct foreground, red = missed pixels; both cubs flip from red to green)."
        },
        {
          "id": "boundary",
          "label": "Boundary vs. GT",
          "left": "assets/showcase/sam_vit_h__uhrsd_002111__iso_encoder_2k/boundary_left.png",
          "right": "assets/showcase/sam_vit_h__uhrsd_002111__iso_encoder_2k/boundary_right.png",
          "isZoom": false,
          "desc": "Contour comparison against ground truth (cyan = GT, magenta = predicted, white = overlap)."
        },
        {
          "id": "zoom1",
          "label": "Zoom: Rear Cub",
          "left": "assets/showcase/sam_vit_h__uhrsd_002111__iso_encoder_2k/zoom1_left.jpg",
          "right": "assets/showcase/sam_vit_h__uhrsd_002111__iso_encoder_2k/zoom1_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop of the rear bear cub: Exact SAM misses it almost entirely while MEROS recovers the full silhouette."
        },
        {
          "id": "zoom2",
          "label": "Zoom: Front Cub",
          "left": "assets/showcase/sam_vit_h__uhrsd_002111__iso_encoder_2k/zoom2_left.jpg",
          "right": "assets/showcase/sam_vit_h__uhrsd_002111__iso_encoder_2k/zoom2_right.jpg",
          "isZoom": true,
          "desc": "Close-up crop of the front bear cub: MEROS captures the head, body, and paws cleanly at equal latency."
        }
      ],
      "thumb": "assets/showcase/sam_vit_h__uhrsd_002111__iso_encoder_2k/thumb.jpg",
      "shortTitle": "Bear Family",
      "shortMeta": "SAM ViT-H · 2K",
      "chip": "+0.28 B-IoU",
      "defaultView": "main"
    }
  },
  "highlights": [
    {
      "tag": "Fine-Grained Query · 6.9K",
      "title": "Seattle Skyline · Window Grids",
      "sub": "DINOv3-L · 9.0× pixels · 929 → 682 ms",
      "trackId": "features",
      "caseId": "dinov3_l__seattle_night__iso_vanilla_2k",
      "viewId": "sim2",
      "left": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/sim2_left.jpg",
      "right": "assets/showcase/dinov3_l__seattle_night__iso_vanilla_2k/sim2_right.jpg",
      "leftLabel": "Vanilla 2.3K",
      "rightLabel": "MEROS 6.9K"
    },
    {
      "tag": "Fine-Grained Query · Steelwork",
      "title": "Industrial Plant · Pipes & Ladders",
      "sub": "DINOv3-L · 7.6× pixels · 96 → 82 ms",
      "trackId": "features",
      "caseId": "dinov3_l__div8k_plant__iso_vanilla_1k",
      "viewId": "sim2",
      "left": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/sim2_left.jpg",
      "right": "assets/showcase/dinov3_l__div8k_plant__iso_vanilla_1k/sim2_right.jpg",
      "leftLabel": "Vanilla 1.0K",
      "rightLabel": "MEROS 2.8K"
    },
    {
      "tag": "Unsupervised K-Means · 7.7K",
      "title": "Skyline · Label-Free Part Discovery",
      "sub": "DINOv3-B · 11.1× pixels · 355 → 353 ms",
      "trackId": "features",
      "caseId": "dinov3_b__seattle_night__iso_vanilla_2k",
      "viewId": "kmeans",
      "left": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/kmeans_left.png",
      "right": "assets/showcase/dinov3_b__seattle_night__iso_vanilla_2k/kmeans_right.png",
      "leftLabel": "Vanilla 2.3K",
      "rightLabel": "MEROS 7.7K"
    }
  ]
};
