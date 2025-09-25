npm install 

npm start


http://localhost:5000/api/tickets


http://localhost:5000/api/tickets/<ticketId>


//post
http://localhost:5000/api/tickets

{
  "name": "John Doe",
  "issue": "App crashes on login",
  "priority": "High"
}



// update

http://localhost:5000/api/tickets/<ticketId>
{
  "status": "Closed"
}




http://localhost:5000/api/tickets/68d4efe2469a0c2dc82770d8  