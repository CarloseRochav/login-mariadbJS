const response = await fetch("https://localhost:8181/users", {


method: 'POST',
headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
},
body: `{
   "Id": 78912,
   "Customer": "Jason Sweet",
   "Quantity": 1,
   "Price": 18.00
  }`,
});

response.json().then(data => {
  console.log(data);
});