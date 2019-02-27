var getSearchParmsObject = function() {
    var searchParams = new URLSearchParams(window.location.search);
    var object = {};
    //Iterate the search parameters.
    for (let p of searchParams) {
        object[p[0]] = p[1];
    }
    return object;
}
