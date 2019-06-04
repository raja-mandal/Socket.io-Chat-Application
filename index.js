// //step 6 & 7 available in index.html 
// var app = require("express")();
// var http = require("http").Server(app); //step1
// var io = require("socket.io")(http); //setp4
// var users =[]; // create array for user //step-8
// var onlineuser =[]; //step-9 show only online user



//  app.get("/",function(req,res){             //return//step3
//    res.sendFile(__dirname+"/index.html");
//  });            

//  io.on("connection",function(socket){    // For connected
//     users.push(socket); //step-8 of push user
//    console.log("New user connected "+users.length); //calling socket//step5  and cheak step-8 length of users 
 

//     socket.on("disconnect",function(sock){   //for desconnected step-9
//       users.splice(users.indexOf(socket),1);
//       console.log("User are still left "+users.length);
//     });

//     socket.on("new user",function(data){
//       socket.username = data;
//       onlineuser.push(socket.username); //step-9
//       console.log("user connected "+socket.username);
//       updateuser();
//      });
      
//       function updateuser(){
//         // socket.on("get user",function() {   //step-9
//           io.sockets.emit("get user",onlineuser);
//       // })  
//     }

//   });



//  http.listen(1234,function(){                        //hit for server//step2
//  console.log("Server created with port 1234");
// });






var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var users =[];
var onlineuser =[];

app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html");

});
io.sockets.on("connection",function(socket){
	users.push(socket);
	console.log("New user connected "+users.length),

	socket.on("disconnect",function(){
		users.splice(users.indexOf(socket),1);
		onlineuser.splice(onlineuser.indexOf(socket.username),1);
		console.log("User disconnected "+users.length);
	});

	socket.on("new user",function(data){
		socket.username = data;
		onlineuser.push(socket.username);
		console.log("user conected "+socket.username);
		updateuser();
	});

	socket.on("msg",function(name,msg){
		io.sockets.emit("rmsg",{name:name,msg:msg});
	});

	function updateuser(){
		io.sockets.emit("get user",onlineuser);
	}

});



http.listen(1234,function(){
console.log("Server Created with port 1234");
});