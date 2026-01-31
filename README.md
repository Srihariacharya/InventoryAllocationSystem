# Inventory Allocation System

## Overview
This project is an Inventory Allocation System developed as part of a backend demo assignment.
The main objective of this project is to demonstrate backend architecture, clean separation of
responsibilities, and correct handling of inventory allocation under concurrent order requests.

The focus of the implementation is on backend logic and concurrency handling rather than UI or design.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

## Project Structure

backend/
Controllers  
Services  
Repositories  
Models  
Routes  

Each layer has a clear responsibility and avoids mixing concerns.

## Architecture Explanation

### Controllers
Controllers are responsible only for handling HTTP requests and returning responses.
They do not contain any business logic or database access logic.

### Services
All business logic is implemented in the Service layer.
This includes:
- Validating request quantity
- Ensuring product stock availability
- Preventing negative stock
- Handling concurrent order requests
- Creating order records

Stock deduction and order creation are handled as a single logical operation using
database-level atomic updates to ensure correctness under concurrency.

### Repositories
Repositories handle database access only.
They do not contain business rules or concurrency handling logic.

### Models
Models define the database schema and contain only properties.

All business logic is intentionally kept out of controllers and repositories.

## API Design

Only one API is implemented as required by the assignment.

### POST /order
Places an order for a product.
This API performs the following steps:
- Validates that the requested quantity is greater than zero
- Checks stock availability using an atomic conditional update
- Deducts stock if sufficient quantity is available
- Creates an order record with SUCCESS or FAILED status

No additional APIs were created.

## Order Processing Flow
1. Client sends a POST /order request
2. Controller forwards the request to the service layer
3. Service validates the request data
4. Service performs an atomic stock update at the database level
5. If stock is sufficient, stock is reduced and order is created as SUCCESS
6. If stock is insufficient, order is created as FAILED
7. Response is returned to the client

This approach guarantees correct behavior even when multiple requests occur simultaneously.

## Database
MongoDB is used as the database.
Products are inserted manually for testing purposes.
No API is provided for product creation or management.

## Conclusion
This project demonstrates a clean backend architecture with proper separation of concerns,
safe concurrency handling using atomic database operations, and strict adherence to the given
requirements.
