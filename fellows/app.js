var TimeLineMessage = React.createClass({
	render: function(){
		return(
			<div className="timeLineMessage">
				<h3>{this.props.author}:</h3>
				{this.props.children}
			</div>
		);
	}
});

var TimeLine = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		$.ajax({
			url: this.props.timeLineUrl,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.log("url: '" + this.props.timeLineUrl + "'");
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	render: function(){
		var messages = this.state.data.map(function (message) {
	      return (
	        <TimeLineMessage author={message.author}>
	          {message.text}
	        </TimeLineMessage>
	      );
	    });
		return(
			<div>
				<h2>Time Line</h2>
				{messages}
			</div>
		);
	}
});

var MyLineMessage = React.createClass({
	render: function(){
		return(
			<div>
				This is a MyLineMessage
			</div>
		);
	}
});

var MyLine = React.createClass({
	render: function(){
		return(
			<div>
				<h2>My Line</h2>
				<MyLineMessage />
			</div>
		);
	}
});

var MessageFrame = React.createClass({
	render: function(){
		return(
			<div>
				<h1>Fellows</h1>
				<TimeLine timeLineUrl="comments.json" />
				<MyLine />
			</div>
		);
	}
});

React.render(
  <MessageFrame />,
  document.getElementById('content')
);