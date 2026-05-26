export const supabase = {
  from: () => ({
    select: () => ({
      single: () => Promise.resolve({ data: {}, error: null }),
      maybeSingle: () => Promise.resolve({ data: {}, error: null }),
    }),

    insert: () => ({
      select: () => ({
        single: () =>
          Promise.resolve({
            data: { id: Date.now().toString() },
            error: null,
          }),
      }),
    }),

    update: () => ({
      eq: () => Promise.resolve({ data: null, error: null }),
    }),

    delete: () => ({
      eq: () => Promise.resolve({ data: null, error: null }),
    }),
  }),
};