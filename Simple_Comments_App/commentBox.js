var Comment = React.createClass({
	render: function(){
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return(
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
			</div>
		);
	}
});

var CommentBox = React.createClass({
	loadCommentsFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	handleCommentSubmit: function(comment) {
		// TODO: submit to the server and refresh the list
		var comments = this.state.data;
	    var newComments = comments.concat([comment]);
	    this.setState({data: newComments});
	    $.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
    	});
 	},
	// "props" are immutable, to implement interactions we add
	// "state".
	getInitialState: function() {
	    return {data: []};
	},
	// Get the json file
	componentDidMount: function() {
		this.loadCommentsFromServer();
    	setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	// We need to pass data from the child component back up to its
	// parent. We do this in our parent's render method by passing a new
	// callback (handleCommentSubmit) into the child
  	render: function() {
	    return (
	      <div className="commentBox">
	        <h1>Comments</h1>
	        <CommentList data={this.state.data} />
	        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
	      </div>
	    );
  	}
});

var CommentList = React.createClass({
	render: function(){
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment author={comment.author}>
					{comment.text}
				</Comment>
			);
		});
		return(
			<div class="commentList">
				{commentNodes}
			</div>
		);
	}
});

var CommentForm = React.createClass({
	// Clear the form fields when the form is submitted with valid input
	handleSubmit: function(e){
		// Prevent the browser's default action of submitting the form
		e.preventDefault();
		// We use the "ref" attribute to assign a name to a child component
		// and this.refs to reference the component
		// We can call React.findDOMNode(component) on a component to get
		// the native browser DOM element
		var author = React.findDOMNode(this.refs.author).value.trim();
		var text = React.findDOMNode(this.refs.text).value.trim();
		if(!text || !author){
			return;
		}
		// Let's call the callback from the CommentForm when the user submits
		// the form
		this.props.onCommentSubmit({author: author, text: text});
		// TODO: send request to the server
	    React.findDOMNode(this.refs.author).value = '';
	    React.findDOMNode(this.refs.text).value = '';
	    return;
	},
	render: function(){
		return(
			<form className="commentForm" onSubmit={this.handleSubmit}>
		        <input type="text" placeholder="Your name" ref="author" />
		        <input type="text" placeholder="Say something..." ref="text" />
				<input type="submit" value="Post" />
			</form>
		);
	}
});

// This call render all components that
// we have defined before
React.render(
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('content')
);