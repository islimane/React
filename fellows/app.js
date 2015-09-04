data = [
    {
        "text": "This is one comment",
        "author": "Pete Hunt"
    },
    {
        "text": "This is *another* comment",
        "author": "Jordan Walke"
    },
    {
        "text": "This is *my* comment",
        "author": "Ismael Slimane"
    },
    {
        "text": "hi!",
        "author": "Anonymous"
    },
    {
        "text": "hi2!",
        "author": "Anonymous2"
    },
    {
        "text": "hi3!",
        "author": "Anonymous3"
    }
];

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
	render: function(){
		var messages = this.props.data.map(function (message) {
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
				<TimeLine data={this.props.data} />
				<MyLine />
			</div>
		);
	}
});

React.render(
  <MessageFrame data={data} />,
  document.getElementById('content')
);