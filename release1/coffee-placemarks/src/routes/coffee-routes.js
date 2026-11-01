export const coffeeRoutes = [
  {
    method: "GET",
    path: "/api/coffee",
    handler: (request, h) => {
      return { message: "Coffee API is working!" };
    }
  },

  {
    method: "GET",
    path: "/api/coffee/all",
    handler: (request, h) => {
      return { message: "Return ALL coffee spots (placeholder)" };
    }
  },

  {
    method: "GET",
    path: "/api/coffee/{id}",
    handler: (request, h) => {
      const id = request.params.id;
      return { message: `Return coffee spot with ID: ${id}` };
    }
  },

  {
    method: "POST",
    path: "/api/coffee",
    handler: (request, h) => {
      const newSpot = request.payload;
      return { message: "Create a new coffee spot (placeholder)", data: newSpot };
    }
  },

  {
    method: "DELETE",
    path: "/api/coffee/{id}",
    handler: (request, h) => {
      const id = request.params.id;
      return { message: `Delete coffee spot with ID: ${id}` };
    }
  }
];
