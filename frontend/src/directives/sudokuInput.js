export default {
  mounted(el) {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    //TODO: Implement allowing to navigate the board with the arrow keys
    const moves = ["Backspace", "Delete"];
    const allowedKeys = [...numbers, ...moves];

    const verifyKey = event => {
      if (!allowedKeys.includes(event.key)) event.preventDefault();
    }
    const handleClick = event => event.target.select();
    const preventPaste = event => event.preventDefault();
    const preventDrop = event => event.preventDefault();

    el.addEventListener('keydown', verifyKey);
    el.addEventListener('click', handleClick);
    el.addEventListener('paste', preventPaste);
    el.addEventListener('drop', preventDrop);

    el._cleanupVerifyKey = () => {
        el.removeEventListener('keydown', verifyKey);
        el.removeEventListener('click', handleClick);
        el.removeEventListener('paste', preventPaste);
        el.removeEventListener('drop', preventDrop);
    };
  },
  updated(el, binding) {
    if (binding.value) el.classList.add('invalid');
    else el.classList.remove('invalid');
  },
  unmounted(el) {
    if (el._cleanupVerifyKey) {
      el._cleanupVerifyKey();
      delete el._cleanupVerifyKey;
    }
  }
};