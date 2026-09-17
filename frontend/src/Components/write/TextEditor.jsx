function TextEditor({
    text,
    setText
  }) {
    return (
      <div className="text-editor">
  
        <div className="editor-toolbar">
  
          <span className="editor-title">
            Your draft
          </span>
  
          <span className="editor-count">
            {text.length} characters
          </span>
  
        </div>
  
        <textarea
          value={text}
          onChange={(event) =>
            setText(event.target.value)
          }
          placeholder="Start writing or paste your article here..."
        />
  
        <div className="editor-footer">
  
          <span>
            RawSignal checks your language, not your opinion.
          </span>
  
          <span>
            {text.split(/\s+/).filter(Boolean).length} words
          </span>
  
        </div>
  
      </div>
    );
  }
  
  export default TextEditor;