import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

type EditorProps = {
  data?: string;
  disabled?: boolean;
  onChange?: (txt: string, delta: any, source: any, editor: any) => void;
  type: "view" | "edit";
};

const TextEditor = (props: EditorProps) => {
  const { type, data, onChange } = props;

  const modules = {
    toolbar: [
      // [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
      [{ size: [] }],
      [{ color: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "color",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    // 'image',
    // 'video',
  ];

  return (
    <div style={{ minWidth: "50px", height: "100%" }}>
      <ReactQuill
        theme="snow"
        value={data}
        modules={type === "view" ? { toolbar: false } : modules}
        formats={formats}
        readOnly={type === "view" ? true : false}
        onChange={onChange}
        style={{ maxWidth: "100%", minWidth: "50px", minHeight: "100px" }}
      />
    </div>
  );
};

export default TextEditor;
