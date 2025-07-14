export default {
    updated(el, binding) {
        if (binding.oldValue === false && binding.value === true) {
            el.classList.add('shake');
            el.addEventListener('animationend', () => {
                el.classList.remove('shake');
            }, { once: true });
        }
    }
};