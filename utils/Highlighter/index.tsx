import { marked } from "marked";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";

// THIS IS VERY IMPORTANT.
// In Next.js, put this in your _app.js file
import "highlight.js/styles/github.css";



export default function highlighter(props) {
    const {markdown} = props;
    useEffect(() => {
        hljs.highlightAll();
    });

    return (
        <div className="App">
        {/* <pre>
            <code className="language-typescript">const variable = 'raw';</code>
        </pre> */}

        <div dangerouslySetInnerHTML={{ __html: marked(markdown) }}></div>
        </div>
    );
}
