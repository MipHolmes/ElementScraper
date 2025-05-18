(() => {
    const urls = new Set();
    const elements = document.querySelectorAll('*');

    elements.forEach(el => {
        ['src', 'href', 'action'].forEach(attr => {
            const val = el.getAttribute(attr);
            if (val &&val.trim()) urls.add(val.trim());
        });

        const inline = el.getAttribute('onclick');
        if (inline && inline.includes('http')) urls.add(inline.match(/https?:\/\/[^'"]+/)?.[0]);

        const style = window.getComputedStyle(el).backgroundImage;
        if (style && style.startsWith('url(')) {
            const bgUrl = style.match(/url\(["']?(.*?)["']?\)/);
            if (bgUrl && bgUrl[1]) urls.add(bgUrl[1]);
        }

   });

   console.log([...urls]);
})();
