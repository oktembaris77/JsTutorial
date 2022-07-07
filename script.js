$(document).ready(function(){
    $("#saveButton").click(function(){
        toDataURL("javascript_logo.png", "image/png");
    });
});


function toDataURL(src, outputFormat)
{
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function(){
        var canvas = document.createElement("canvas");
        var context = canvas.getContext('2d');

        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        
        context.drawImage(this, 0, 0);

        var base64String = canvas.toDataURL(outputFormat);
        console.log(base64String);

        

        const url = base64String;
        fetch(url)
            .then(res=> res.blob())
            .then(blob=> {
                const file = new File([blob],"js_logo.png", {type: "image/png"});

            saveFile(blob, file.name);
            });
    }

    img.src = src;
    if (img.complete || img.complete === undefined) {
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        img.src = src;
    }
}

function saveFile(blob, filename) {
    let URL_ = (window.URL || window.webkitURL);
    let fileURL = URL_.createObjectURL(blob);
    let a = document.createElement('a');
    a.setAttribute('href', fileURL);
    a.setAttribute('download', filename);
    a.click();
    a.remove();
    setTimeout(function() {
    URL_.revokeObjectURL(fileURL);
    }, 60000);
};