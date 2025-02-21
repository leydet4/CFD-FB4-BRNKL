addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    let url = new URL(request.url);

    if (url.pathname.endsWith(".css")) {
        return new Response(await fetch(request), {
            headers: { "Content-Type": "text/css" }
        });
    }

    return fetch(request);
}
