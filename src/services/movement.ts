import { instanceAxios } from '@/lib/instantceAxios';

export const movementApi = {
  getAllMovements: async () => {
    const res = await instanceAxios.get('/movement');
    return res.data;
  },

  getMovementById: async (movementId: string) => {
    const res = await instanceAxios.get(`/movement/${movementId}`);
    return res.data;
  },

  createMovement: async (movement: { name: string }) => {
    const res = await instanceAxios.post('/movement/create', movement);
    return res.data;
  },

  updateMovement: async (
    movementId: string | undefined,
    movement: { name: string }
  ) => {
    const res = await instanceAxios.patch(
      `/movement/update/${movementId}`,
      movement
    );
    return res.data;
  },

  deleteMovement: async (movementId: string) => {
    const res = await instanceAxios.delete(`/movement/delete/${movementId}`);
    return res.data;
  },
};
