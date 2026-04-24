import { useParams } from "react-router-dom";
import ImageTool from "../components/ImageTool";

export default function ToolPage() {
    const { type } = useParams();

    if (!type) return <p>Invalid Tool</p>;

    return <ImageTool type={type as any} />;
}