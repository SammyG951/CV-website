
const linkSubmitButton = document.getElementById('link-submit');
const linkTextBox = document.getElementById('markdown-link');

const uploadInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');

const contentElement = document.getElementById('content');

linkSubmitButton.addEventListener('click', () => {

    const link = linkTextBox.value;
    console.log(link);

    fetch(link)
        .then(response => response.text())
        .then(data => {
            console.log(data);

            const converter = new showdown.Converter();
            const html = converter.makeHtml(data);
            contentElement.innerHTML = html;

            linkTextBox.value = '';
        })
        .catch(error => {
            console.log(error);
        });
});

uploadButton.addEventListener('click', () => {

    const file = uploadInput.files[0];

    if(file) {
        console.log('Selected File: ', file);

        const allowedExtensions = ['.md', '.markdown'];
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

        if (allowedExtensions.includes(fileExtension)){

            const fileReader = new FileReader();
            fileReader.onload = function(e) {
                const fileContent = e.target.result;
                console.log('File Conent: \n', fileContent);

                const converter = new showdown.Converter();
                const html = converter.makeHtml(fileContent);
                contentElement.innerHTML = html;

                uploadInput.value = '';
            };
    
            fileReader.readAsText(file);

        } else {
            console.log('Invalid File Type. Only .md and .markdown files allowed')
        }

    } else {
        console.log('No File Selected.')
    }

});