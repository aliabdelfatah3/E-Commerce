import api from "./api";

const buildParams = (page, limit, filters) => {
  const params = new URLSearchParams({ page, limit });
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
         params.append(key, value);
      }
    });
  }
  return params.toString();
}

export const getProducts = async (page = 1, limit = 12, filters = {}) => {
  const res = await api.get(`/products?${buildParams(page, limit, filters)}`);
  return res.data;
};

export const getProduct = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const getProductsByCategory = async (category, page = 1, limit = 12, filters = {}) => {
  const res = await api.get(`/products/category/${category}?${buildParams(page, limit, filters)}`);
  return res.data;
};
