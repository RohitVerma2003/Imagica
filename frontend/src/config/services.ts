export const services = [
    {
        id: "compress",
        title: "Compress Image",
        description: "Reduce image size with quality control",
        image: "compress",
        fields: ["quality"],
    },
    {
        id: "resize",
        title: "Resize Image",
        description: "Change image dimensions",
        image: "resize",
        fields: ["width", "height"],
    },
    {
        id: "crop",
        title: "Crop Image",
        description: "Crop selected area visually",
        image: "crop",
        fields: ["crop"],
    },
    {
        id: "grayscale",
        title: "Grayscale",
        description: "Convert to black & white",
        image: "grayscale",
        fields: [],
    },
    {
        id: "rotate",
        title: "Rotate Image",
        description: "Rotate by angle",
        image: "rotate",
        fields: ["angle"],
    },
    {
        id: "convert",
        title: "Convert Format",
        description: "Change image format",
        image: "convert",
        fields: ["format"],
    },
];