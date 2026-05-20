const BASE_URL = 'http://10.1.25.31:8080';

export const getAllHewan = async () => {
  const res = await fetch(`${BASE_URL}/hewan/all`);
  return res.json();
};

export const getHewanById = async (id) => {
  const res = await fetch(`${BASE_URL}/hewan/${id}`);
  return res.json();
};

export const getHewanByCategory = async (jenis) => {
  const res = await fetch(`${BASE_URL}/hewan/category/${jenis}`);
  return res.json();
};

export const createHewan = async (data) => {
  const res = await fetch(`${BASE_URL}/hewan/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateHewan = async (id, data) => {
  const res = await fetch(`${BASE_URL}/hewan/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteHewan = async (id) => {
  const res = await fetch(`${BASE_URL}/hewan/delete/${id}`, {
    method: 'DELETE',
  });
  return res.text();
};