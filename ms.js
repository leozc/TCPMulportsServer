var net = require('net');

var myArgs = require('optimist')
	.argv,
	help = 'This script fires up numOfPort servers listening from portNum to portNum+ numOfPort.\nplease specify --start portNum --count numOfPort';

if ((myArgs.h) || (myArgs.help)) {
	console.log(help);
	process.exit(0);
}

if (myArgs.start > 0 && myArgs.count > 0 && (myArgs.start + myArgs.count < 65536)) {
	console.log(myArgs.start);
	console.log(myArgs.count);
} else {
	console.log(help);
	process.exit(0);
}


var base = myArgs.start;
for (var i = 0; i < myArgs.count; i++) {
	var server = net.createServer(function(c) { //'connection' listener
		var serverId = c.server._connectionKey;
		var startTS = 0;
		var endTS = 0;
		c.on('connect', function(c) {
			startTS = new Date()
				.getTime();
			console.log(serverId + ':CONNECTION');
		});
		c.on('end', function() {
			endTS = new Date().getTime();

			//report summary
			console.log(serverId + ':startTS=' + startTS );
			console.log(serverId + ':endTS=' + endTS );
			console.log(serverId + ':disconnected:byteread=' + c.bytesRead + '  / ' + c.bytesRead * 8 + 'bits');
			console.log(serverId + ':TotalTS(ms)=' + (endTS - startTS));
			console.log(serverId + ':speed(bps)=' + (c.bytesRead * 8 / (endTS - startTS) * 1000));

		});
		c.on('error', function(e) {
			console.log(serverId + ':Error');
		  	if (e.code == 'EADDRINUSE') {
		    	console.log('Address in use, retrying...');
		  	}
			c.destory();
			process.exit(-1); // fail if any port used
		});
		c.on('timeout', function() {
			console.log(serverId + ':Timeout');
			c.destory();
		});
		c.on('data', function(data) {
			nowTS = new Date().getTime();
			if(nowTS % 10 > 8) // quick hack, 10% chance to each current speed.
				console.log(serverId + ':speed(bps)=' + (c.bytesRead * 8 / (nowTS - startTS)) * 1000);
			//console.log(serverId + ':receiving=>'+data);
		});
		c.on('listening', function() {
			console.log(serverId + ':ready');
			//console.log(serverId + ':receiving=>'+data);
		});
		c.pipe(c);
	});
	console.log("Starting " + (base + i));
	server.listen((base + i), function() { //'listening' listener
	});
}
