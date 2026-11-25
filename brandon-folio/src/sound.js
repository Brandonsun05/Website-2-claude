// Site-wide sound switch, set by the toggle on the 3D cover.
// Turning it on (or off) also turns the showreel's sound on (or off);
// the showreel's own button still works on its own afterwards.
const listeners = new Set();
let on = false;

export const globalSound = {
  get: () => on,
  set(value) {
    on = value;
    listeners.forEach((fn) => fn(value));
  },
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
