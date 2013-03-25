TCPMulportsServer
=================

DebugTool: A simple nodeJS socket server that listens to a range of ports and report per connection based transfer speed and other metrics.

Here is a simple run case report:
e.g. 

-> node ms.js  --start=8000 --count=10

	Starting 8000
	Starting 8001
	Starting 8002
	Starting 8003
	Starting 8004
	Starting 8005
	Starting 8006
	Starting 8007
	Starting 8008
	Starting 8009
	4:0.0.0.0:8009:CONNECTION
	4:0.0.0.0:8009:speed(bps)=0
	4:0.0.0.0:8009:startTS=1364154641125
	4:0.0.0.0:8009:endTS=1364154641133
	4:0.0.0.0:8009:disconnected:byteread=211  / 1688bits
	4:0.0.0.0:8009:TotalTS(ms)=8
	4:0.0.0.0:8009:speed(bps)=211000
	4:0.0.0.0:8001:CONNECTION
	4:0.0.0.0:8001:startTS=1364154646847
	4:0.0.0.0:8001:endTS=1364154646848
	4:0.0.0.0:8001:disconnected:byteread=211  / 1688bits
	4:0.0.0.0:8001:TotalTS(ms)=1
	4:0.0.0.0:8001:speed(bps)=1688000
