export function router() {

    const path = window.location.hash;

    if (path.startsWith("#/product/")) {

        const productId = path.split("/")[2];

        return {
            page: "product",
            id: Number(productId)
        };
    }

    switch (path) {

        case "#/products":
            return {
                page: "products"
            };

        case "#/cart":
            return {
                page: "cart"
            };

        case "#/about":
            return {
                page: "about"
            };

        case "#/contact":
            return {
                page: "contact"
            };

        case "#/home":
        case "":
            return {
                page: "home"
            };

        default:
            return {
                page: "not-found"
            };
    }
}