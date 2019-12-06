class Editor extends React.Component {
  constructor(props) {
    this.state = {
      editor: { content: "Hello\n=======\n\nWorld\n-----------\n \n### How are you\n \nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nList one:\n\n  * sunny\n  * cloudy\n  * rainy\n\nList 2:\n\n  1. coffee\n  2. tea\n  3. pop\n\nTry it yourself.\n\n" }
    };
    this.onChange = this.onChange.bind(this);
  };

  rawMarkup(raw) {
    const rawMarkup = marked(raw, { sanitize: true });
    return { __html: rawMarkup };
  };

  onChange(event) {
    const change = this.state.editor;
    change.content = event.target.value;
    this.setState({ editor: change })
  };

  render() {
    return (
      <div>
        <div id="header">Markdown Editor</div>
        <textarea
          onChange={this.onChange}
          value={this.state.editor.content}>
        </textarea>
        <div id="viewer">
          <div id="body"
            dangerouslySetInnerHTML={this.rawMarkup(this.state.editor.content)}>
          </div>
        </div>
      </div>);
  };
};

ReactDOM.render(<Editor />,
  document.getElementById('app'));

//   const domContainer = document.querySelector('#editor');
// ReactDOM.render(e(LikeButton), domContainer);