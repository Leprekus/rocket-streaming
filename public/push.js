Pusher.logToConsole = true;

//open
const pusher = new Pusher({
	appId: "1834144",
	key: "621e8eb263cbff290707",
	secret: "480dc0d3c558b236b7a5",
	cluster: "us3",
	useTLS: true
  });

var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  alert(JSON.stringify(data));
});

//subscribe
var channel = pusher.subscribe("my-channel");

//listen
channel.bind("my-event", (data) => {
	// Method to be dispatched on trigger.
  });
  
//tirgger




pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

console.log('triggered')