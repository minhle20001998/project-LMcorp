async function fetchData(url, body) {
    const defaultParams = {
        method: "POST",
        headers: {


            "Content-Type": "application/json",
        },

    }
    defaultParams.body = JSON.stringify(body);
    const myResponse = await fetch(url, defaultParams);
    const myJson = await myResponse.json();

    return myJson;
}