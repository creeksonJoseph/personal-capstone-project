import React, { useCallback, useRef, useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createQuoteNode } from "@lexical/rich-text";
import { INSERT_ORDERED_LIST_COMMAND } from "@lexical/list";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $generateHtmlFromNodes } from "@lexical/html";

// Toolbar Component
function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [activeFormats, setActiveFormats] = React.useState(new Set());

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const formats = new Set();
          if (selection.hasFormat("bold")) formats.add("bold");
          if (selection.hasFormat("italic")) formats.add("italic");
          setActiveFormats(formats);
        }
      });
    });
  }, [editor]);

  const formatText = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    }
  };

  const insertOrderedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  };

  return (
    <div className="flex flex-wrap items-center gap-1 py-2 mb-6 border-y border-sky-blue/20">
      <button
        onClick={() => formatText("bold")}
        className={`p-2 rounded transition-colors ${
          activeFormats.has("bold")
            ? "bg-primary text-white"
            : "hover:bg-off-white"
        }`}
        type="button"
      >
        <span className="material-symbols-outlined text-charcoal">
          {activeFormats.has("bold") ? (
            <span className="text-white">format_bold</span>
          ) : (
            "format_bold"
          )}
        </span>
      </button>
      <button
        onClick={() => formatText("italic")}
        className={`p-2 rounded transition-colors ${
          activeFormats.has("italic")
            ? "bg-primary text-white"
            : "hover:bg-off-white"
        }`}
        type="button"
      >
        <span className="material-symbols-outlined">
          {activeFormats.has("italic") ? (
            <span className="text-white">format_italic</span>
          ) : (
            <span className="text-charcoal">format_italic</span>
          )}
        </span>
      </button>
      <div className="w-px h-6 bg-sky-blue/20 mx-1"></div>
      <button
        onClick={insertOrderedList}
        className="p-2 hover:bg-off-white rounded transition-colors"
        type="button"
      >
        <span className="material-symbols-outlined text-charcoal">
          format_list_numbered
        </span>
      </button>
      <div className="w-px h-6 bg-sky-blue/20 mx-1"></div>
      <button
        onClick={formatQuote}
        className="p-2 hover:bg-off-white rounded transition-colors"
        type="button"
      >
        <span className="material-symbols-outlined text-charcoal">
          format_quote
        </span>
      </button>
    </div>
  );
}

// Plugin to load initial content when editing a post
function InitialContentPlugin({ content }) {
  const [editor] = useLexicalComposerContext();
  const hasLoadedRef = React.useRef(false);

  React.useEffect(() => {
    console.log('[InitialContentPlugin] Effect triggered');
    console.log('[InitialContentPlugin] Content received:', content);
    console.log('[InitialContentPlugin] Has loaded:', hasLoadedRef.current);
    
    // Skip if we've already loaded content
    if (hasLoadedRef.current) {
      console.log('[InitialContentPlugin] Already loaded, skipping');
      return;
    }
    
    // Skip if no content
    if (!content) {
      console.log('[InitialContentPlugin] No content provided, skipping');
      return;
    }

    try {
      // Parse the content if it's a string
      const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
      console.log('[InitialContentPlugin] Parsed content:', parsedContent);
      
      // Check if content is valid and has actual data (not just empty paragraph)
      if (parsedContent && parsedContent.root) {
        // Check if this is meaningful content (not just the default empty state)
        const hasChildren = parsedContent.root.children && parsedContent.root.children.length > 0;
        const firstChild = hasChildren ? parsedContent.root.children[0] : null;
        const hasText = firstChild && firstChild.children && firstChild.children.length > 0;
        
        // Only load if there's actual content or if it's the first time
        if (hasText || !hasLoadedRef.current) {
          const contentString = JSON.stringify(parsedContent);
          console.log('[InitialContentPlugin] Loading content into editor');
          
          editor.update(() => {
            const editorState = editor.parseEditorState(contentString);
            editor.setEditorState(editorState);
            console.log('[InitialContentPlugin] Editor state updated');
          });
          
          // Mark as loaded so we don't reload on user edits
          hasLoadedRef.current = true;
        } else {
          console.log('[InitialContentPlugin] Empty content, skipping');
        }
      } else {
        console.log('[InitialContentPlugin] Invalid content structure:', parsedContent);
      }
    } catch (error) {
      console.error('[InitialContentPlugin] Error loading initial content:', error);
    }
  }, [content, editor]); // Include content so it runs when content arrives

  return null;
}

const PostEditor = ({ formData, handleChange, handleEditorContentChange }) => {
  const debounceTimerRef = useRef(null);
  const isDev = import.meta.env.DEV;

  const initialConfig = {
    namespace: "CreatePostEditor",
    theme: {
      text: {
        bold: "font-bold",
        italic: "italic",
      },
      quote: "border-l-4 border-primary pl-4 italic text-charcoal/80 my-4",
      list: {
        ol: "list-decimal list-inside my-2 pl-4",
        ul: "list-disc list-inside my-2 pl-4",
      },
      link: "text-primary underline hover:text-primary/80",
    },
    onError: (error) => {
      console.error(error);
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      LinkNode,
      AutoLinkNode,
    ],
  };

  // Improved editor update handler with debouncing, HTML generation, and error handling
  const handleEditorUpdate = useCallback((editorState, editor) => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer for debouncing
    debounceTimerRef.current = setTimeout(() => {
      try {
        if (isDev) {
          console.log("=== Lexical Editor State Update ===");
        }
        
        const content = editorState.toJSON();
        
        // Generate HTML for display purposes
        let htmlContent = '';
        editorState.read(() => {
          htmlContent = $generateHtmlFromNodes(editor);
        });

        if (isDev) {
          console.log("Editor state JSON:", JSON.stringify(content, null, 2));
          console.log("Generated HTML:", htmlContent);
        }

        // Update form data with both JSON and HTML
        if (handleEditorContentChange) {
          handleEditorContentChange({
            json: content,
            html: htmlContent
          });
        } else {
          // Fallback to original method if new handler not provided
          handleChange({
            target: {
              name: "content",
              value: content,
              type: "text",
            },
          });
        }
      } catch (error) {
        console.error('Error serializing editor state:', error);
        // Optionally show user-friendly error message
      }
    }, 300); // Debounce for 300ms
  }, [handleEditorContentChange, handleChange, isDev]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex-1 px-6 lg:px-12 py-10 bg-white overflow-y-auto h-full">
      {/* Title Field */}
      <div className="mb-6">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full bg-transparent border-none focus:ring-0 p-0 text-[42px] lg:text-[50px] font-display font-bold placeholder-primary/60 leading-tight outline-none"
          placeholder="Enter your headline here..."
          required
        />
      </div>

      {/* Rich Text Editor */}
      <LexicalComposer
        initialConfig={initialConfig}
      >
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="font-body text-xl leading-relaxed text-charcoal outline-none min-h-[500px] focus:outline-none"
                style={{ caretColor: "#1a365d" }}
              />
            }
            placeholder={
              <div className="absolute top-0 left-0 font-body text-xl leading-relaxed text-charcoal/60 pointer-events-none">
                Start sharing your update with the school community here...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <LinkPlugin />
          <ListPlugin />
          <OnChangePlugin onChange={handleEditorUpdate} />
          {/* Load initial content when editing */}
          <InitialContentPlugin content={formData.content} />
        </div>
      </LexicalComposer>
    </div>
  );
};

export default PostEditor;
