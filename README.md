# Shopping Site (Back-End)

This is the back-end of Anvaya CRM Application. [Application Link](https://anvaya-frontend-nine.vercel.app/)<br>
Built with a React frontend, Express/Node backend, MongoDB database.

---

## Base URL

https://github.com/sahaarnav3/anvaya-backend.git

---

## Quick Start

```
git clone https://github.com/sahaarnav3/anvaya-backend.git
cd shopping-site-backend
npm install
npm run dev      # or `npm start` / `yarn dev`
```

## Technologies
- Node.js
- Express
- MongoDB

## API Reference

### **GET	/**
Route to fetch HomePage.<br>

### **POST	/leads**	 	
Route to create a new lead.<br>	
Sample (failure) Response:<br>
```{ error: Error Message Details.. }```<br>
Sample(success) Response:<br>
```{ name, source, salesAgent, status, ... }```

### **GET	/leads**	 	
Route to fetch the list of all leads.<br>	
Sample Response:<br>
```{ [ {_id, name, source, ... }, ...] }```<br>

### **GET	/leads?salesAgent=64c34512f7a60e36df44&status=New**	 	
Route to fetch the list of leads according to filter/s(Multiple filters can be used at once)<br>	
Sample Response:<br>
```{ [ {_id, name, source, ... }, ...] }```<br>

### **PUT	/leads/:id**	 	
Route to update Leads.<br>	
Sample (failure) Response:<br>
```{ error: Error Message Details.. }```<br>
Sample(success) Response:<br>
```{ name, source, salesAgent, status, ... }```

### **DELETE	/leads/:id**	 	
Route to delete a lead.<br>	
Sample Response:<br>
```{ message: "Lead deleted successfully." }```

### **POST	/agents**	 	
Route to create a sales agent.<br>	
Sample (failure) Response:<br>
```{ error: Error Message Details.. }```<br>
Sample(success) Response:<br>
```{ _id, name, email, createdAt }```

### **GET	/agents**	 	
Route to fetch all sales agent.<br>	
Sample Response:<br>
```[ { _id, name, email }, ... ]```<br>

### **POST	/leads/:id/comments**	 	
Route to add comment using lead id.<br>	
Sample (failure) Response:<br>
```{ error: Error Message Details.. }```<br>
Sample(success) Response:<br>
```{ _id, commentText, author, createdAt }```

### **GET	/leads/:id/comments**	 	
Route to fetch all comments for a particular lead.<br>	
Sample Response:<br>
```[ { _id, commentText, author, createdAt }, ... ]```<br>

### **GET	/report/last-week**	 	
Route to fetch leads closed last week (last 7 days).<br>	
Sample Response:<br>
```[ { _id, name, salesAgent, closedAt }, ... ]```<br>

### **GET	/report/pipeline**	 	
Fetches the total number of leads currently in the pipeline.<br>	
Sample Response:<br>
```[ totalLeadsInPipeline: 9 ]```<br>

## Contact
For bugs or feature requests, please reach out to sahaarnav3@gmail.com