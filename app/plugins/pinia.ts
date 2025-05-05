// ~/plugins/pinia.ts
// import { defineNuxtPlugin } from '#app';
// import type { Pinia } from 'pinia';

// export default defineNuxtPlugin(({ $pinia }) => {
//   // Type assertion since we've declared the type in our pinia.d.ts
//   const pinia = $pinia as Pinia;
  
//   pinia.use(({ store }) => {
//     // Ensure all state is properly serializable
//     store.$hydrate = () => {
//       try {
//         const initialState = JSON.parse(JSON.stringify(store.$state));
//         Object.assign(store.$state, initialState);
//       } catch (error) {
//         console.error('Hydration error in store', store.$id, error);
//         store.$reset();
//       }
//     };
//   });
// });