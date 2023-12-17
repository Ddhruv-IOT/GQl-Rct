const config = {
  PORT: import.meta.env.VITE_PORT || 3001,
  GQL_BACKEND_URL:
    import.meta.env.VITE_GQL_BACKEND_URL || "http://localhost:4000",
  REST_BACKEND_GET_URL:
    import.meta.env.VITE_REST_BACKEND_GET_URL ||
    "http://localhost:3001/api/todos",
  REST_BACKEND_PUT_URL:
    import.meta.env.VITE_REST_BACKEND_PUT_URL ||
    "http://localhost:3001/api/todos",
  REST_BACKEND_POST_URL:
    import.meta.env.VITE_REST_BACKEND_POST_URL ||
    "http://localhost:3001/api/todos",
  REST_BACKEND_DELETE_URL:
    import.meta.env.VITE_REST_BACKEND_DELETE_URL ||
    "http://localhost:3001/api/todos",
};

export default config;
