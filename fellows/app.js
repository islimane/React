var TimeLineMessage = React.createClass({
	render: function(){
		return(
			<div>
				This is a TimeLineMessage
			</div>
		);
	}
});

var TimeLine = React.createClass({
	render: function(){
		return(
			<div>
				<h2>Time Line</h2>
				<TimeLineMessage />
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
				<h2>Time Line</h2>
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
				<TimeLine />
				<MyLine />
			</div>
		);
	}
});

React.render(
  <MessageFrame />,
  document.getElementById('content')
);