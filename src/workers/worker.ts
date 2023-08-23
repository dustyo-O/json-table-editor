/* eslint-disable no-restricted-globals */

const workercode = () => {
    self.addEventListener('message', evt => {
        const [url, apiKey] = evt.data as string[];

        console.log('staring request');
        fetch(url, {
            headers: {
                Authorization: 'Bearer ' + apiKey,
            }
        })
            .then(response => {
                console.log('loaded, starting parse');

                return response;
            })
            .then(response => response.json())
            .then((data) => {
                console.log('success!');
                postMessage(data);
            });
    });
};

let code = workercode.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
export const worker = URL.createObjectURL(blob);
