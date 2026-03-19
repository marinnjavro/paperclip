const QuillToolbarPlaceholder = () => (
  <div className="quill">
    <div className="ql-toolbar ql-snow">
      <span className="ql-formats">
        <button type="button" className="ql-bold">
          <svg viewBox="0 0 18 18">
            {' '}
            <path
              className="ql-stroke"
              d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"
            ></path>{' '}
            <path
              className="ql-stroke"
              d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"
            ></path>{' '}
          </svg>
        </button>
        <button type="button" className="ql-italic">
          <svg viewBox="0 0 18 18">
            {' '}
            <line
              className="ql-stroke"
              x1="7"
              x2="13"
              y1="4"
              y2="4"
            ></line>{' '}
            <line className="ql-stroke" x1="5" x2="11" y1="14" y2="14"></line>{' '}
            <line className="ql-stroke" x1="8" x2="10" y1="14" y2="4"></line>{' '}
          </svg>
        </button>
        <button type="button" className="ql-underline">
          <svg viewBox="0 0 18 18">
            {' '}
            <path
              className="ql-stroke"
              d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"
            ></path>{' '}
            <rect
              className="ql-fill"
              height="1"
              rx="0.5"
              ry="0.5"
              width="12"
              x="3"
              y="15"
            ></rect>{' '}
          </svg>
        </button>
        <button type="button" className="ql-formula">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-math-function"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 19a2 2 0 0 0 2 2c2 0 2 -4 3 -9s1 -9 3 -9a2 2 0 0 1 2 2"></path>
            <path d="M5 12h6"></path>
            <path d="M15 12l6 6"></path>
            <path d="M15 18l6 -6"></path>
          </svg>
        </button>
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-list" value="ordered">
          <svg viewBox="0 0 18 18">
            {' '}
            <line
              className="ql-stroke"
              x1="7"
              x2="15"
              y1="4"
              y2="4"
            ></line>{' '}
            <line className="ql-stroke" x1="7" x2="15" y1="9" y2="9"></line>{' '}
            <line className="ql-stroke" x1="7" x2="15" y1="14" y2="14"></line>{' '}
            <line
              className="ql-stroke ql-thin"
              x1="2.5"
              x2="4.5"
              y1="5.5"
              y2="5.5"
            ></line>{' '}
            <path
              className="ql-fill"
              d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"
            ></path>{' '}
            <path
              className="ql-stroke ql-thin"
              d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"
            ></path>{' '}
            <path
              className="ql-stroke ql-thin"
              d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"
            ></path>{' '}
          </svg>
        </button>
        <button type="button" className="ql-list" value="bullet">
          <svg viewBox="0 0 18 18">
            {' '}
            <line
              className="ql-stroke"
              x1="6"
              x2="15"
              y1="4"
              y2="4"
            ></line>{' '}
            <line className="ql-stroke" x1="6" x2="15" y1="9" y2="9"></line>{' '}
            <line className="ql-stroke" x1="6" x2="15" y1="14" y2="14"></line>{' '}
            <line className="ql-stroke" x1="3" x2="3" y1="4" y2="4"></line>{' '}
            <line className="ql-stroke" x1="3" x2="3" y1="9" y2="9"></line>{' '}
            <line className="ql-stroke" x1="3" x2="3" y1="14" y2="14"></line>{' '}
          </svg>
        </button>
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-verticalLink" value="Vertical Link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-cards"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2.2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3.604 7.197l7.138 -3.109a.96 .96 0 0 1 1.27 .527l4.924 11.902a1 1 0 0 1 -.514 1.304l-7.137 3.109a.96 .96 0 0 1 -1.271 -.527l-4.924 -11.903a1 1 0 0 1 .514 -1.304z"></path>
            <path d="M15 4h1a1 1 0 0 1 1 1v3.5"></path>
            <path d="M20 6c.264 .112 .52 .217 .768 .315a1 1 0 0 1 .53 1.311l-2.298 5.374"></path>
          </svg>
        </button>
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-clean">
          <svg className="" viewBox="0 0 18 18">
            {' '}
            <line
              className="ql-stroke"
              x1="5"
              x2="13"
              y1="3"
              y2="3"
            ></line>{' '}
            <line className="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"></line>{' '}
            <line className="ql-stroke" x1="11" x2="15" y1="11" y2="15"></line>{' '}
            <line className="ql-stroke" x1="15" x2="11" y1="11" y2="15"></line>{' '}
            <rect
              className="ql-fill"
              height="1"
              rx="0.5"
              ry="0.5"
              width="7"
              x="2"
              y="14"
            ></rect>{' '}
          </svg>
        </button>
      </span>
    </div>
  </div>
)

export default QuillToolbarPlaceholder
