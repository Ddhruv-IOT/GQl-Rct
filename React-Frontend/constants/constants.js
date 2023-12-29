const config = {
  PORT: import.meta.env.VITE_PORT || 3001,
  GQL_BACKEND_URL:
    import.meta.env.VITE_GQL_BACKEND_URL || "https://gql-api-mcxt.onrender.com/",
  REST_BACKEND_GET_URL:
    import.meta.env.VITE_REST_BACKEND_GET_URL ||
    "https://rest-api-dihw.onrender.com/api/todos",
  REST_BACKEND_PUT_URL:
    import.meta.env.VITE_REST_BACKEND_PUT_URL ||
    "https://rest-api-dihw.onrender.com/api/todos",
  REST_BACKEND_POST_URL:
    import.meta.env.VITE_REST_BACKEND_POST_URL ||
    "https://rest-api-dihw.onrender.com/api/todos",
  REST_BACKEND_DELETE_URL:
    import.meta.env.VITE_REST_BACKEND_DELETE_URL ||
    "https://rest-api-dihw.onrender.com/api/todos",
};

export default config;
