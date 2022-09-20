const navigation = document.querySelector('.navigation');
const navToggle = document.querySelector('.mobile-nav-toggle');

navToggle.addEventListener('click', () => {
    const visibility = navigation.getAttribute('data-visible');

    if (visibility === "false") {
        navigation.setAttribute('data-visible', 'true');
        navToggle.setAttribute('aria-expanded', true)
    } else {
        navigation.setAttribute('data-visible', 'false')
        navToggle.setAttribute('aria-expanded', false)
    }
})